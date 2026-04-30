"use client";

import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Popover } from "@base-ui/react/popover";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PreviewMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
};

export type CaseStudyLinkPreviewPopoverTheme = {
  popup?: string;
  dialog?: string;
  backgroundWord?: string;
  tag?: string;
  mediaFrame?: string;
  title?: string;
  timeline?: string;
  cta?: string;
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
const MotionDialogBackdrop = motion.create(Dialog.Backdrop);
const MotionDialogPopup = motion.create(Dialog.Popup);

function TopicPills({
  topics,
  theme,
  className,
}: {
  topics: string[];
  theme?: CaseStudyLinkPreviewPopoverTheme;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-1.5", className)}>
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
  );
}

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

function CaseStudyPreviewCard({
  title,
  timeline,
  topics,
  previewMedia,
  open,
  theme,
}: {
  title: string;
  timeline: string;
  topics: string[];
  previewMedia: PreviewMedia;
  open: boolean;
  theme?: CaseStudyLinkPreviewPopoverTheme;
}) {
  return (
    <div className="relative flex aspect-[0.78/1] min-h-[24rem] flex-col justify-between overflow-hidden p-5">
      <div
        className={cn(
          "pointer-events-none absolute inset-x-[-18%] top-[34%] text-center text-[5.6rem] leading-none font-black tracking-[0em] text-[#68ff89]/40 select-none",
          theme?.backgroundWord,
        )}
      >
        Patch
      </div>

      <TopicPills topics={topics} theme={theme} className="relative z-10" />

      <div className="relative z-10 flex flex-1 items-center">
        <PreviewMediaFrame media={previewMedia} open={open} className={theme?.mediaFrame} />
      </div>

      <div className="relative z-10 flex items-end justify-between gap-5 text-[0.72rem] leading-none font-semibold tracking-[0.08em] uppercase">
        <p className={cn("max-w-[12rem] text-white", theme?.title)}>{title}</p>
        <p className={cn("font-mono text-[#d8ffe0]/48", theme?.timeline)}>{timeline}</p>
      </div>
    </div>
  );
}

function CaseStudyDialogContent({
  href,
  title,
  timeline,
  topics,
  previewMedia,
  open,
  theme,
}: {
  href: string;
  title: string;
  timeline: string;
  topics: string[];
  previewMedia: PreviewMedia;
  open: boolean;
  theme?: CaseStudyLinkPreviewPopoverTheme;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.45rem] bg-[#153f36] text-[#68ff89] shadow-[0_32px_90px_rgb(0_0_0/0.28)]",
        theme?.dialog,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-[-18%] top-[30%] text-center text-[clamp(5.8rem,18vw,9rem)] leading-none font-black tracking-[0em] text-[#68ff89]/16 select-none",
          theme?.backgroundWord,
        )}
      >
        Patch
      </div>

      <div className="relative z-10 flex h-[min(39rem,calc(100svh-3rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-y-auto px-5 pt-10 pb-5">
        <TopicPills topics={topics} theme={theme} className="relative z-10" />

        <div className="relative z-10 flex flex-1 items-center justify-center py-7">
          <div className="flex w-full max-w-[18rem] flex-col items-center gap-4 text-center">
            <PreviewMediaFrame
              media={previewMedia}
              open={open}
              className={cn("w-[82%]", theme?.mediaFrame)}
            />
            <Dialog.Title
              className={cn(
                "max-w-[18rem] text-[clamp(1.62rem,4.1vw,2.2rem)] leading-[1.03] font-bold tracking-[-0.02em] text-white",
                theme?.title,
              )}
            >
              {title}
            </Dialog.Title>
            <p className={cn("font-mono text-[0.7rem] tracking-[0.08em] text-[#d8ffe0]/56", theme?.timeline)}>
              {timeline}
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-7">
          <Link
            href={href}
            className={cn(
              buttonVariants({ variant: "secondary", size: "xs" }),
              "mt-1 flex h-11 w-full justify-center bg-[#68ff89] text-[#153f36] hover:bg-[#68ff89] hover:text-[#153f36]",
              theme?.cta,
            )}
          >
            View case study
          </Link>
        </div>
      </div>
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
  const [dialogOpen, setDialogOpen] = React.useState(false);
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

  const closePreview = React.useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, 180);
  }, [clearCloseTimer]);

  const openDialog = React.useCallback(() => {
    clearCloseTimer();
    setOpen(false);
    setDialogOpen(true);
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

  const dialogTransition = React.useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0.14, ease: [0, 0, 1, 1] as const }
        : { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
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
    <Dialog.Root
      open={dialogOpen}
      onOpenChange={(nextOpen) => {
        setDialogOpen(nextOpen);
        if (nextOpen) {
          clearCloseTimer();
          setOpen(false);
        } else {
          clearCloseTimer();
          setOpen(false);
        }
      }}
    >
      <Popover.Root
        modal={false}
        open={open && !dialogOpen}
        actionsRef={actionsRef}
        onOpenChange={(nextOpen, details) => {
          if (!nextOpen) {
            details.preventUnmountOnClose();
          } else {
            measureTrigger();
          }

          setOpen(nextOpen && !dialogOpen);
        }}
      >
        <span ref={portalContainerRef} className="relative inline-flex">
          <Popover.Trigger
            ref={triggerRef as unknown as React.Ref<HTMLButtonElement>}
            nativeButton={false}
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
              const basePointerDown = motionProps.onPointerDown as
                | React.PointerEventHandler<HTMLAnchorElement>
                | undefined;
              const baseBlur = motionProps.onBlur as
                | React.FocusEventHandler<HTMLAnchorElement>
                | undefined;

              delete motionProps.onDrag;
              delete motionProps.onDragStart;
              delete motionProps.onDragEnd;
              delete motionProps.onClick;
              delete motionProps.onPointerEnter;
              delete motionProps.onPointerLeave;
              delete motionProps.onPointerDown;
              delete motionProps.onFocus;
              delete motionProps.onBlur;
              delete motionProps.role;
              delete motionProps.type;
              delete motionProps.disabled;

              return (
                <MotionLink
                  {...motionProps}
                  href={href}
                  onClick={(event) => {
                    event.preventDefault();
                    openDialog();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === " ") {
                      event.preventDefault();
                      openDialog();
                    }
                  }}
                  onPointerEnter={(event) => {
                    basePointerEnter?.(event);
                    clearCloseTimer();
                    measureTrigger();
                  }}
                  onPointerDown={(event) => {
                    basePointerDown?.(event);
                    clearCloseTimer();
                    setOpen(false);
                    measureTrigger();
                  }}
                  onPointerLeave={(event) => {
                    basePointerLeave?.(event);
                  }}
                  onFocus={(event) => {
                    (
                      event as React.FocusEvent<HTMLAnchorElement> & {
                        preventBaseUIHandler?: () => void;
                      }
                    ).preventBaseUIHandler?.();
                    clearCloseTimer();
                    measureTrigger();
                    setOpen(false);
                  }}
                  onBlur={(event) => {
                    baseBlur?.(event);
                    closePreview();
                  }}
                  className={cn("soft-link", className)}
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
                    animate={open && !dialogOpen ? "open" : "closed"}
                    transition={popupTransition}
                    onAnimationComplete={(definition) => {
                      if (definition === "closed" && (!open || dialogOpen)) {
                        actionsRef.current?.unmount();
                      }
                    }}
                    className={cn(
                      "w-[min(20rem,calc(100vw-2rem))] origin-top overflow-hidden rounded-[1.45rem] bg-[#2B261C] text-[#F48C60] shadow-[0_24px_60px_rgb(0_0_0/0.18)] will-change-[transform,opacity] outline-none",
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
                animate={open && !dialogOpen ? "open" : "closed"}
                transition={contentTransition}
              >
                <CaseStudyPreviewCard
                  title={title}
                  timeline={timeline}
                  topics={topics}
                  previewMedia={previewMedia}
                  open={open && !dialogOpen}
                  theme={theme}
                />
              </motion.div>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>

      <Dialog.Portal>
        <MotionDialogBackdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: dialogOpen ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={dialogTransition}
          className="fixed inset-0 z-[100] bg-background/72 backdrop-blur-sm"
        />
        <Dialog.Viewport className="fixed inset-0 z-[101] flex items-center justify-center overflow-y-auto p-4">
          <MotionDialogPopup
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: "100vh" }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={dialogTransition}
            finalFocus={triggerRef}
            className={cn("overflow-hidden rounded-[1.45rem] transform-gpu outline-none")}
          >
            <CaseStudyDialogContent
              href={href}
              title={title}
              timeline={timeline}
              topics={topics}
              previewMedia={previewMedia}
              open={dialogOpen}
              theme={theme}
            />
          </MotionDialogPopup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { CaseStudyLinkPreviewPopover };
