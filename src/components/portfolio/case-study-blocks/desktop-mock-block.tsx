import Image from "next/image";
import { cn } from "@/lib/utils";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { DesktopMockGridOverlay } from "./desktop-mock-grid-overlay";

/** Default layout size (1x). Source assets are expected at 2x (2880×2048). */
const DESKTOP_MOCK_WIDTH = 1440;
const DESKTOP_MOCK_HEIGHT = 1024;

type DesktopMockBlockProps = {
  src?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  variant?: "full" | "content";
  className?: string;
};

function isVideo(src: string) {
  return /\.(mp4|webm|ogg)$/i.test(src);
}

function getFullImageSizes() {
  // Outer gutters (24/40px) + inner dark padding (24/40px) on each side.
  return `(max-width: 768px) calc(100vw - 6rem), min(${DESKTOP_MOCK_WIDTH}px, calc(100vw - 10rem))`;
}

function getContentImageSizes() {
  // Constrained to reading column width (40rem = 640px) with page gutters on mobile.
  return `(max-width: 768px) calc(100vw - 3rem), 40rem`;
}

function MockMedia({
  src,
  alt,
  screenClass,
  sizes,
  width = DESKTOP_MOCK_WIDTH,
  height = DESKTOP_MOCK_HEIGHT,
}: {
  src: string;
  alt: string;
  screenClass: string;
  sizes?: string;
  width?: number;
  height?: number;
}) {
  if (isVideo(src)) {
    return (
      <video
        src={src}
        className={cn(screenClass, "w-full")}
        autoPlay
        loop
        muted
        playsInline
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={screenClass}
      sizes={sizes}
    />
  );
}

export function DesktopMockBlock({
  src,
  alt = "",
  caption,
  width,
  height,
  variant = "full",
  className,
}: DesktopMockBlockProps) {
  const theme = getActivePresentationTheme();
  const layout = theme.slots.caseStudyLayout;

  if (variant === "content") {
    return (
      <div className={cn(layout.desktopMockContentOuter, className)}>
        <figure>
          {src ? (
            <>
              <div className="relative">
                <MockMedia
                  src={src}
                  alt={alt}
                  screenClass={layout.desktopMockContentScreen}
                  sizes={getContentImageSizes()}
                  width={width}
                  height={height}
                />
                <div className="pointer-events-none absolute inset-0 rounded-[12px] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.15)]" />
              </div>
              {caption ? (
                <figcaption className={layout.desktopMockContentCaption}>{caption}</figcaption>
              ) : alt ? (
                <figcaption className={layout.desktopMockContentCaption}>{alt}</figcaption>
              ) : null}
            </>
          ) : (
            <div className="relative">
              <div
                className={cn(layout.desktopMockContentScreen, "aspect-[1440/1024]")}
                aria-hidden={alt ? undefined : true}
                aria-label={alt || undefined}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[12px] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.15)]" />
            </div>
          )}
        </figure>
      </div>
    );
  }

  return (
    <div className={cn(layout.desktopMockOuter, className)}>
      <div className={layout.desktopMockBand}>
        <DesktopMockGridOverlay />
        <div className={cn(layout.desktopMockInner, "pointer-events-none relative z-10")}>
          <figure>
            {src ? (
              <>
                <MockMedia
                  src={src}
                  alt={alt}
                  screenClass={layout.desktopMockScreen}
                  sizes={getFullImageSizes()}
                  width={width}
                  height={height}
                />
                {caption ? (
                  <figcaption className={layout.desktopMockCaption}>{caption}</figcaption>
                ) : alt ? (
                  <figcaption className={layout.desktopMockCaption}>{alt}</figcaption>
                ) : null}
              </>
            ) : (
              <div
                className={cn(layout.desktopMockScreen, "aspect-[1440/1024]")}
                aria-hidden={alt ? undefined : true}
                aria-label={alt || undefined}
              />
            )}
          </figure>
        </div>
      </div>
    </div>
  );
}
