import Image from "next/image";
import { cn } from "@/lib/utils";
import { type MediaItem, type MediaWidth } from "@/lib/content/schema";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { MediaBreakout } from "./media-breakout";

type MediaBlockProps = {
  media: MediaItem;
  width?: MediaWidth;
  className?: string;
};

function getImageSizes(width: MediaWidth) {
  if (width === "full") {
    return "100vw";
  }

  if (width === "wider") {
    return "(max-width: 768px) 100vw, 80vw";
  }

  return "(max-width: 768px) 100vw, 40rem";
}

export function MediaBlock({ media, width = "same", className }: MediaBlockProps) {
  const theme = getActivePresentationTheme();

  return (
    <MediaBreakout width={width} className={className}>
      <figure
        className={cn(
          theme.slots.caseStudyLayout.mediaBlock,
          width === "full" && "rounded-none",
        )}
      >
        {media.type === "image" && (
          <Image
            src={media.src}
            alt={media.alt}
            width={1200}
            height={800}
            className="h-auto w-full object-cover"
            sizes={getImageSizes(width)}
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
    </MediaBreakout>
  );
}
