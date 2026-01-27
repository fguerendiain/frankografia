import { useEffect, useMemo, useRef, useState } from "react";
import type { Photo } from "../lib/loadPhotos";

type Props = {
  photos: Photo[];
};

export default function Gallery({ photos }: Props) {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<Photo | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(
    () => Array.from(new Set(photos.map((p) => p.category))),
    [photos]
  );

  const filtered =
    filter === "all"
      ? photos
      : photos.filter((p) => p.category === filter);

  /* ───────── Reveal animation (ONE observer) ───────── */
  useEffect(() => {
    if (!gridRef.current) return;

    const items = Array.from(
      gridRef.current.querySelectorAll(".photo")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filtered]);

  /* ───────── Keyboard navigation + body lock ───────── */
  useEffect(() => {
    if (!active) return;

    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      const i = photos.findIndex((p) => p.src === active?.src);

      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight")
        setActive(photos[(i + 1) % photos.length]);
      if (e.key === "ArrowLeft")
        setActive(photos[(i - 1 + photos.length) % photos.length]);
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, photos]);

  /* ───────── Swipe mobile ───────── */
  const touchStart = useRef<number | null>(null);

  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStart.current === null || !active) return;

    const diff = touchStart.current - e.changedTouches[0].clientX;
    const i = photos.findIndex((p) => p.src === active.src);

    if (diff > 50)
      setActive(photos[(i + 1) % photos.length]);
    if (diff < -50)
      setActive(photos[(i - 1 + photos.length) % photos.length]);

    touchStart.current = null;
  }

  return (
    <section className="gallery">
      <div className="filters">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          all
        </button>

        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={filter === c ? "active" : ""}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid" ref={gridRef}>
        {filtered.map((photo, i) => (
          <figure
            key={photo.src}
            className={`photo ${
              i % 8 === 0 ? "span-2" : "span-1"
            }`}
            role="button"
            tabIndex={0}
            onClick={() => setActive(photo)}
            onKeyDown={(e) =>
              e.key === "Enter" && setActive(photo)
            }
          >
            <img
              src={photo.src}
              srcSet={photo.srcSet}
              sizes={photo.sizes}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </figure>
        ))}
      </div>

      {active && (
        <div
          className="modal"
          onClick={() => setActive(null)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <img
            src={active.src}
            srcSet={active.srcSet}
            sizes="100vw"
            decoding="async"
          />
        </div>
      )}
    </section>
  );
}
