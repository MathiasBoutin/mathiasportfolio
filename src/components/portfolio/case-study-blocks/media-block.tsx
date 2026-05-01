import Image from "next/image";
import { cn } from "@/lib/utils";
import { type MediaItem } from "@/lib/content/schema";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

type MediaBlockProps = {
  media: MediaItem;
  className?: string;
};

export function MediaBlock({ media, className }: MediaBlockProps) {
  const theme = getActivePresentationTheme();

  return (
    <figure className={cn(theme.slots.caseStudyLayout.mediaBlock, className)}>
      {media.type === "image" && (
        <Image
          src={media.src}
          alt={media.alt}
          width={1200}
          height={800}
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
      {media.type === "video" && (
        <video
          src={media.src}
          autoPlay
          muted
          loop
          playsInline
          className="h-auto w-full object-cover"
          aria-label={media.alt}
        />
      )}
      {media.type === "svg" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.src}
          alt={media.alt}
          className="h-auto w-full"
        />
      )}
      {media.caption && (
        <figcaption className={theme.slots.caseStudyLayout.mediaCaption}>
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
}
