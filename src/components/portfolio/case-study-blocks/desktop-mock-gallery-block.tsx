"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type DesktopMockGalleryBlock } from "@/lib/content/schema";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { cn } from "@/lib/utils";
import { DesktopMockGridOverlay } from "./desktop-mock-grid-overlay";

const PEEK_OFFSET = 20;
const SIDE_CARD_SCALE = 0.8;
const HIDDEN_CARD_SCALE = 0.74;
const SWIPE_THRESHOLD = 50;

const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.75,
} as const;

export type DesktopMockGalleryLabels = {
  gallery: string;
  previousImage: string;
  nextImage: string;
  goToImage: string;
  image: string;
  of: string;
};

type DesktopMockGalleryBlockProps = {
  images: DesktopMockGalleryBlock["images"];
  labels: DesktopMockGalleryLabels;
  className?: string;
};

function getImageSizes() {
  return "(max-width: 768px) calc(100vw - 6rem), calc(100vw - 10rem)";
}

function clampIndex(value: number, total: number) {
  return Math.min(Math.max(value, 0), total - 1);
}

function getCardTranslateX(stageWidth: number, offset: number) {
  if (offset === 0) {
    return 0;
  }

  const direction = offset > 0 ? 1 : -1;
  const scaleGap = ((1 - SIDE_CARD_SCALE) / 2) * stageWidth;

  if (Math.abs(offset) === 1) {
    return direction * (scaleGap + PEEK_OFFSET);
  }

  return direction * (scaleGap + PEEK_OFFSET * 2);
}

export function DesktopMockGalleryBlock({
  images,
  labels,
  className,
}: DesktopMockGalleryBlockProps) {
  const theme = getActivePresentationTheme();
  const layout = theme.slots.caseStudyLayout;
  const prefersReducedMotion = useReducedMotion();
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const carouselId = React.useId();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [stageWidth, setStageWidth] = React.useState<number | null>(null);

  React.useEffect(() => {
    const element = stageRef.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) {
        return;
      }

      setStageWidth(Math.round(entry.contentRect.width));
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < images.length - 1;
  const activeImage = images[activeIndex];

  function goToIndex(index: number) {
    setActiveIndex((current) => {
      const nextIndex = clampIndex(index, images.length);
      return current === nextIndex ? current : nextIndex;
    });
  }

  function goToPrevious() {
    if (canGoPrevious) {
      goToIndex(activeIndex - 1);
    }
  }

  function goToNext() {
    if (canGoNext) {
      goToIndex(activeIndex + 1);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNext();
    }
  }

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (info.offset.x <= -SWIPE_THRESHOLD) {
      goToNext();
      return;
    }

    if (info.offset.x >= SWIPE_THRESHOLD) {
      goToPrevious();
    }
  }

  return (
    <div className={cn(layout.desktopMockOuter, className)}>
      <div className={layout.desktopMockBand}>
        <DesktopMockGridOverlay className="pointer-events-none" />
        <div className={cn(layout.desktopMockInner, "relative z-10")}>
          <figure>
            <div className={layout.desktopMockGalleryControls}>
              <button
                type="button"
                onClick={goToPrevious}
                disabled={!canGoPrevious}
                className={layout.desktopMockGalleryArrow}
                aria-label={labels.previousImage}
              >
                <ChevronLeft className="size-4" aria-hidden />
              </button>

              <div
                className={layout.desktopMockGalleryDots}
                role="tablist"
                aria-label={labels.gallery}
              >
                {images.map((image, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={image.src}
                      id={`${carouselId}-tab-${index}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`${carouselId}-panel-${index}`}
                      aria-label={`${labels.goToImage} ${index + 1}`}
                      tabIndex={isActive ? 0 : -1}
                      className={cn(
                        layout.desktopMockGalleryDot,
                        isActive && layout.desktopMockGalleryDotActive,
                      )}
                      onClick={() => goToIndex(index)}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={goToNext}
                disabled={!canGoNext}
                className={layout.desktopMockGalleryArrow}
                aria-label={labels.nextImage}
              >
                <ChevronRight className="size-4" aria-hidden />
              </button>
            </div>

            <div
              ref={stageRef}
              className={layout.desktopMockGalleryStage}
              role="group"
              aria-roledescription="carousel"
              aria-label={labels.gallery}
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <div className="absolute inset-0">
                {stageWidth !== null
                  ? images.map((image, index) => {
                      const offset = index - activeIndex;
                      const isActive = offset === 0;
                      const isNeighbor = Math.abs(offset) === 1;
                      const isVisible = isActive || isNeighbor;

                      return (
                        <motion.div
                          key={image.src}
                          initial={false}
                          className={cn(
                            "absolute inset-0",
                            isActive ? "pointer-events-auto" : "pointer-events-none",
                          )}
                          role="tabpanel"
                          id={`${carouselId}-panel-${index}`}
                          aria-labelledby={`${carouselId}-tab-${index}`}
                          aria-roledescription="slide"
                          aria-label={image.alt || `${labels.image} ${index + 1} ${labels.of} ${images.length}`}
                          aria-hidden={!isActive}
                          tabIndex={isActive ? 0 : -1}
                          animate={{
                            x: getCardTranslateX(stageWidth, offset),
                            scale: isActive ? 1 : isNeighbor ? SIDE_CARD_SCALE : HIDDEN_CARD_SCALE,
                            opacity: isVisible ? 1 : 0,
                            zIndex: isActive ? 2 : isNeighbor ? 1 : 0,
                          }}
                          transition={prefersReducedMotion ? { duration: 0 } : springTransition}
                          drag={isActive && images.length > 1 ? "x" : false}
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={0.08}
                          onDragEnd={handleDragEnd}
                          style={{
                            boxShadow: isActive
                              ? "0 24px 80px -30px var(--desktop-mock-gallery-shadow), 0 0 44px 0 var(--desktop-mock-gallery-shadow)"
                              : "none",
                          }}
                        >
                          <div className={cn(layout.desktopMockScreen, "relative h-full max-w-none")}>
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              sizes={getImageSizes()}
                              className="size-full object-contain select-none"
                              draggable={false}
                              priority={index === 0}
                            />
                          </div>
                        </motion.div>
                      );
                    })
                  : null}
              </div>
            </div>

            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {`${labels.image} ${activeIndex + 1} ${labels.of} ${images.length}`}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {activeImage.alt ? (
                <motion.figcaption
                  key={activeImage.src}
                  className={layout.desktopMockCaption}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }}
                >
                  {activeImage.alt}
                </motion.figcaption>
              ) : null}
            </AnimatePresence>
          </figure>
        </div>
      </div>
    </div>
  );
}
