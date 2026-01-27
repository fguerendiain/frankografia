import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import { GALLERY_SIZES } from "./imageSizes";

export type Photo = {
  src: string;
  srcSet: string;
  sizes: string;
  category: string;
  index: number;
};

export async function loadPhotos(): Promise<Photo[]> {
  const images = import.meta.glob(
    "../assets/images/*/*.{jpg,jpeg,png,webp}",
    { eager: true }
  ) as Record<string, { default: ImageMetadata }>;

  const entries = Object.entries(images).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  return Promise.all(
    entries.map(async ([path, mod], index) => {
      const parts = path.split("/");
      const category = parts[parts.length - 2];

      const image = await getImage({
        src: mod.default,
        widths: [400, 800, 1200],
        formats: ["webp"],
        sizes: GALLERY_SIZES,
      });

      return {
        src: image.src,
        srcSet: image.srcSet.attribute,
        sizes: GALLERY_SIZES,
        category,
        index,
      };
    })
  );
}
