"use client";

import * as React from "react";
import { Popover } from "@base-ui/react/popover";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type PreviewMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
};

export type CaseStudyLinkPreviewPopoverTheme = {
  trigger?: string;
  popup?: string;
  tag?: string;
  mediaFrame?: string;
  title?: string;
  timeline?: string;
};

type CaseStudyLinkPreviewPopoverProps = {
  href: string;
  title: string;
  timeline: string;
  topics: string[];
  previewMedia: PreviewMedia;
  children?: React.ReactNode;
  className?: string;
  popupClassName?: string;
  theme?: CaseStudyLinkPreviewPopoverTheme;
};

type PopoverMotionSize = {
  triggerWidth: number;
  triggerHeight: number;
  popupWidth: number;
};

const MotionLink = motion.create(Link);

function PreviewMediaFrame({
  media,
  open,
  className,
}: {
  media: PreviewMedia;
  open: boolean;
  className?: string;
}) {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setHasError(false);
  }, [media.src]);

  return (
    <div
      className={cn(
        "relative mx-auto flex aspect-[1.12/1] w-[68%] items-center justify-center overflow-hidden rounded-[1.1rem] bg-white/14 shadow-[0_22px_50px_rgb(0_0_0/0.22)]",
        className,
      )}
    >
      {hasError ? (
        <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_25%,rgb(255_255_255/0.28),transparent_34%),linear-gradient(135deg,rgb(255_255_255/0.18),rgb(255_255_255/0.06))] text-center text-[0.58rem] leading-tight font-semibold tracking-[0.08em] text-white/74 uppercase">
          Preview
        </div>
      ) : media.type === "video" ? (
        <video
          src={media.src}
          aria-label={media.alt}
          autoPlay={open}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(min-width: 768px) 220px, 68vw"
          onError={() => setHasError(true)}
          className="object-cover"
        />
      )}
    </div>
  );
}

function CaseStudyLinkPreviewPopover({
  href,
  title,
  timeline,
  topics,
  previewMedia,
  children,
  className,
  popupClassName,
  theme,
}: CaseStudyLinkPreviewPopoverProps) {
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  const portalContainerRef = React.useRef<HTMLSpanElement | null>(null);
  const triggerRef = React.useRef<HTMLAnchorElement | null>(null);
  const actionsRef = React.useRef<{ unmount: () => void; close: () => void } | null>(null);
  const closeTimerRef = React.useRef<number | null>(null);
  const [motionSize, setMotionSize] = React.useState<PopoverMotionSize>({
    triggerWidth: 0,
    triggerHeight: 0,
    popupWidth: 0,
  });

  const measureTrigger = React.useCallback(() => {
    const element = triggerRef.current;

    if (!element) {
      return;
    }

    const nextWidth = Math.round(element.offsetWidth);
    const nextHeight = Math.round(element.offsetHeight);
    const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
    const maxPopupWidth = Number.isFinite(rootFontSize) ? rootFontSize * 20 : 320;
    const nextPopupWidth = Math.round(Math.min(maxPopupWidth, window.innerWidth - 32));

    if (nextWidth === 0 || nextHeight === 0 || nextPopupWidth <= 0) {
      return;
    }

    setMotionSize((previous) => {
      if (
        previous.triggerWidth === nextWidth &&
        previous.triggerHeight === nextHeight &&
        previous.popupWidth === nextPopupWidth
      ) {
        return previous;
      }

      return {
        triggerWidth: nextWidth,
        triggerHeight: nextHeight,
        popupWidth: nextPopupWidth,
      };
    });
  }, []);

  const clearCloseTimer = React.useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openPreview = React.useCallback(() => {
    clearCloseTimer();
    measureTrigger();
    setOpen(true);
  }, [clearCloseTimer, measureTrigger]);

  const closePreview = React.useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, 180);
  }, [clearCloseTimer]);

  const popupVariants = React.useMemo(
    () =>
      prefersReducedMotion
        ? {
            closed: {
              opacity: 0,
              boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            },
            open: {
              opacity: 1,
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.18)",
            },
          }
        : {
            closed: {
              opacity: 0,
              scaleX:
                motionSize.triggerWidth > 0 && motionSize.popupWidth > 0
                  ? motionSize.triggerWidth / motionSize.popupWidth
                  : 0.18,
              scaleY: 0.12,
              y: motionSize.triggerHeight > 0 ? -(motionSize.triggerHeight + 8) : -30,
              boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            },
            open: {
              opacity: 1,
              scaleX: 1,
              scaleY: 1,
              y: 0,
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.18)",
            },
          },
    [motionSize.popupWidth, motionSize.triggerHeight, motionSize.triggerWidth, prefersReducedMotion],
  );

  const popupTransition = React.useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0.14, ease: [0, 0, 1, 1] as const }
        : { duration: 0.34, ease: [0.22, 1, 0.36, 1] as const },
    [prefersReducedMotion],
  );

  const contentVariants = React.useMemo(
    () =>
      prefersReducedMotion
        ? {
            closed: { opacity: 0 },
            open: { opacity: 1 },
          }
        : {
            closed: { opacity: 0, y: 3 },
            open: { opacity: 1, y: 0 },
          },
    [prefersReducedMotion],
  );

  const contentTransition = React.useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0.12, ease: [0, 0, 1, 1] as const }
        : { duration: 0.16, delay: 0.09, ease: [0.22, 1, 0.36, 1] as const },
    [prefersReducedMotion],
  );

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const handleResize = () => {
      measureTrigger();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [measureTrigger, open]);

  React.useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  return (
    <Popover.Root
      modal={false}
      open={open}
      actionsRef={actionsRef}
      onOpenChange={(nextOpen, details) => {
        if (!nextOpen) {
          details.preventUnmountOnClose();
        } else {
          measureTrigger();
        }

        setOpen(nextOpen);
      }}
    >
      <span ref={portalContainerRef} className="relative inline-flex">
        <Popover.Trigger
          ref={triggerRef as unknown as React.Ref<HTMLButtonElement>}
          nativeButton={false}
          openOnHover
          delay={80}
          closeDelay={180}
          onPointerEnter={measureTrigger}
          onPointerDown={measureTrigger}
          onFocus={measureTrigger}
          render={(props) => {
            const motionProps = { ...props } as Record<string, unknown>;
            const basePointerEnter = motionProps.onPointerEnter as
              | React.PointerEventHandler<HTMLAnchorElement>
              | undefined;
            const basePointerLeave = motionProps.onPointerLeave as
              | React.PointerEventHandler<HTMLAnchorElement>
              | undefined;
            const baseFocus = motionProps.onFocus as
              | React.FocusEventHandler<HTMLAnchorElement>
              | undefined;
            const baseBlur = motionProps.onBlur as
              | React.FocusEventHandler<HTMLAnchorElement>
              | undefined;

            delete motionProps.onDrag;
            delete motionProps.onDragStart;
            delete motionProps.onDragEnd;
            delete motionProps.onPointerEnter;
            delete motionProps.onPointerLeave;
            delete motionProps.onFocus;
            delete motionProps.onBlur;
            delete motionProps.role;
            delete motionProps.type;
            delete motionProps.disabled;

            return (
              <MotionLink
                {...motionProps}
                href={href}
                onPointerEnter={(event) => {
                  basePointerEnter?.(event);
                  openPreview();
                }}
                onPointerLeave={(event) => {
                  basePointerLeave?.(event);
                  closePreview();
                }}
                onFocus={(event) => {
                  baseFocus?.(event);
                  openPreview();
                }}
                onBlur={(event) => {
                  baseBlur?.(event);
                  closePreview();
                }}
                className={cn("soft-link", theme?.trigger, className)}
              >
                {children ?? title}
              </MotionLink>
            );
          }}
        />
      </span>

      <Popover.Portal container={portalContainerRef}>
        <Popover.Positioner
          side="bottom"
          align="center"
          sideOffset={8}
          collisionPadding={16}
          collisionAvoidance={{
            side: "flip",
            align: "shift",
            fallbackAxisSide: "none",
          }}
          className="z-[90] outline-none"
        >
          <Popover.Popup
            initialFocus={false}
            finalFocus={false}
            render={(props) => {
              const motionProps = { ...props } as Record<string, unknown>;
              delete motionProps.onDrag;
              delete motionProps.onDragStart;
              delete motionProps.onDragEnd;

              return (
                <motion.div
                  {...motionProps}
                  initial="closed"
                  variants={popupVariants}
                  animate={open ? "open" : "closed"}
                  transition={popupTransition}
                  onAnimationComplete={(definition) => {
                    if (definition === "closed" && !open) {
                      actionsRef.current?.unmount();
                    }
                  }}
                  className={cn(
                    "w-[min(20rem,calc(100vw-2rem))] origin-top overflow-hidden rounded-[1.45rem] bg-[#153f36] text-[#68ff89] shadow-[0_24px_60px_rgb(0_0_0/0.18)] will-change-[transform,opacity] outline-none",
                    theme?.popup,
                    popupClassName,
                  )}
                />
              );
            }}
          >
            <motion.div
              variants={contentVariants}
              initial="closed"
              animate={open ? "open" : "closed"}
              transition={contentTransition}
              className="relative flex aspect-[0.78/1] min-h-[24rem] flex-col justify-between overflow-hidden p-5"
            >
              <div className="pointer-events-none absolute inset-x-[-18%] top-[34%] text-center text-[5.6rem] leading-none font-black tracking-[-0.14em] text-[#68ff89]/80 select-none">
                Preview
              </div>

              <div className="relative z-10 flex flex-wrap justify-center gap-1.5">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className={cn(
                      "rounded-full bg-[#68ff89]/12 px-2 py-1 text-[0.58rem] leading-none font-bold tracking-[0.08em] text-[#d8ffe0]/86 uppercase",
                      theme?.tag,
                    )}
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="relative z-10 flex flex-1 items-center">
                <PreviewMediaFrame
                  media={previewMedia}
                  open={open}
                  className={theme?.mediaFrame}
                />
              </div>

              <div className="relative z-10 flex items-end justify-between gap-5 text-[0.72rem] leading-none font-semibold tracking-[0.08em] uppercase">
                <p className={cn("max-w-[12rem] text-white", theme?.title)}>{title}</p>
                <p className={cn("font-mono text-[#d8ffe0]/48", theme?.timeline)}>{timeline}</p>
              </div>
            </motion.div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

export { CaseStudyLinkPreviewPopover };
