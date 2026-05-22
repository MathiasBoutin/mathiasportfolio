import Image from "next/image";
import { cn } from "@/lib/utils";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { DesktopMockGridOverlay } from "./desktop-mock-grid-overlay";

/** Layout size (1x). Source assets are expected at 2x (2880×2048). */
const DESKTOP_MOCK_WIDTH = 1440;
const DESKTOP_MOCK_HEIGHT = 1024;

type DesktopMockBlockProps = {
  src?: string;
  alt?: string;
  className?: string;
};

function getImageSizes() {
  // Outer gutters (24/40px) + inner dark padding (24/40px) on each side.
  return `(max-width: 768px) calc(100vw - 6rem), min(${DESKTOP_MOCK_WIDTH}px, calc(100vw - 10rem))`;
}

export function DesktopMockBlock({
  src,
  alt = "",
  className,
}: DesktopMockBlockProps) {
  const theme = getActivePresentationTheme();
  const layout = theme.slots.caseStudyLayout;

  return (
    <div className={cn(layout.desktopMockOuter, className)}>
      <div className={layout.desktopMockBand}>
        <DesktopMockGridOverlay />
        <div className={cn(layout.desktopMockInner, "pointer-events-none relative z-10")}>
          <figure>
            {src ? (
              <>
                <Image
                  src={src}
                  alt={alt}
                  width={DESKTOP_MOCK_WIDTH}
                  height={DESKTOP_MOCK_HEIGHT}
                  className={layout.desktopMockScreen}
                  sizes={getImageSizes()}
                />
                {alt ? (
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
