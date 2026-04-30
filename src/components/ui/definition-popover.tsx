"use client";

import * as React from "react";
import { Popover } from "@base-ui/react/popover";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { defaultMessages } from "@/lib/i18n/messages";
import { cn } from "@/lib/utils";

type DefinitionPopoverProps = {
  term: string;
  definition: React.ReactNode;
  pronunciation?: string;
  learnMoreHref?: string;
  learnMoreLabel?: string;
  children?: React.ReactNode;
  className?: string;
  popupClassName?: string;
  theme?: DefinitionPopoverTheme;
};

export type DefinitionPopoverTheme = {
  trigger?: string;
  popup?: string;
  title?: string;
  pronunciation?: string;
  description?: string;
  link?: string;
};

type PopoverMotionSize = {
  triggerWidth: number;
  triggerHeight: number;
  popupWidth: number;
};

function DefinitionPopover({
  term,
  definition,
  pronunciation,
  learnMoreHref,
  learnMoreLabel = defaultMessages.definitionPopover.learnMoreLabel,
  children,
  className,
  popupClassName,
  theme,
}: DefinitionPopoverProps) {
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  const portalContainerRef = React.useRef<HTMLSpanElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const actionsRef = React.useRef<{ unmount: () => void; close: () => void } | null>(null);
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
    const maxPopupWidth = Number.isFinite(rootFontSize) ? rootFontSize * 22 : 352;
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
              boxShadow: "0 10px 24px rgba(0, 0, 0, 0.1)",
            },
          }
        : {
            closed: {
              opacity: 0,
              scaleX:
                motionSize.triggerWidth > 0 && motionSize.popupWidth > 0
                  ? motionSize.triggerWidth / motionSize.popupWidth
                  : 0.18,
              scaleY: 0.18,
              y: motionSize.triggerHeight > 0 ? -(motionSize.triggerHeight + 6) : -28,
              boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            },
            open: {
              opacity: 1,
              scaleX: 1,
              scaleY: 1,
              y: 0,
              boxShadow: "0 10px 24px rgba(0, 0, 0, 0.1)",
            },
          },
    [motionSize.popupWidth, motionSize.triggerHeight, motionSize.triggerWidth, prefersReducedMotion],
  );

  const popupTransition = React.useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0.14, ease: [0, 0, 1, 1] as const }
        : { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
    [prefersReducedMotion],
  );

  const triggerVariants = React.useMemo(
    () =>
      prefersReducedMotion
        ? {
            rest: {
              scale: 1,
              y: 0,
              boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
              transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
            },
            active: {
              scale: 1.01,
              y: -0.5,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
            },
            floating: {
              scale: 1.01,
              y: -0.5,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
            },
          }
        : {
            rest: {
              scale: 1,
              y: 0,
              boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
              transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
            },
            active: {
              scale: 1.018,
              y: -1,
              boxShadow: "0 6px 14px rgba(0, 0, 0, 0.11)",
              transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
            },
            floating: {
              scale: 1.018,
              y: [-1, -2, -1],
              boxShadow: "0 6px 14px rgba(0, 0, 0, 0.11)",
              transition: {
                y: {
                  duration: 2.8,
                  ease: [0.42, 0, 0.58, 1] as const,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror" as const,
                },
                scale: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
                boxShadow: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
              },
            },
          },
    [prefersReducedMotion],
  );

  const shouldFloatTrigger = open && !prefersReducedMotion;

  const contentVariants = React.useMemo(
    () =>
      prefersReducedMotion
        ? {
            closed: { opacity: 0 },
            open: { opacity: 1 },
          }
        : {
            closed: { opacity: 0, y: 2 },
            open: {
              opacity: 1,
              y: 0,
            },
          },
    [prefersReducedMotion],
  );

  const contentTransition = React.useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0.12, ease: [0, 0, 1, 1] as const }
        : { duration: 0.15, delay: 0.08, ease: [0.22, 1, 0.36, 1] as const },
    [prefersReducedMotion],
  );

  const isExternalHref =
    typeof learnMoreHref === "string" && /^(https?:)?\/\//.test(learnMoreHref);

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
          ref={triggerRef}
          type="button"
          openOnHover
          delay={80}
          closeDelay={220}
          onPointerEnter={measureTrigger}
          onPointerDown={measureTrigger}
          onFocus={measureTrigger}
          render={(props) => {
            const motionProps = { ...props } as Record<string, unknown>;
            delete motionProps.onDrag;
            delete motionProps.onDragStart;
            delete motionProps.onDragEnd;

            return (
              <motion.button
                {...motionProps}
                type="button"
                variants={triggerVariants}
                initial={false}
                animate={shouldFloatTrigger ? "floating" : "rest"}
                whileHover="active"
                whileFocus="active"
                whileTap="active"
                className={cn(
                  "text-foreground focus-visible:ring-ring/40 data-[popup-open]:bg-foreground/12 relative z-[70] inline-flex items-center cursor-help appearance-none rounded-[4px] border-0 bg-foreground/8 px-2 py-[0.12em] text-left text-[0.92em] font-[inherit] leading-[inherit] tracking-[inherit] transition-[background-color,color] duration-200 ease-out will-change-[transform,background-color,color] hover:bg-foreground/12 focus-visible:ring-3 focus-visible:outline-none",
                  theme?.trigger,
                  className,
                )}
              >
                {children ?? term}
              </motion.button>
            );
          }}
        />
      </span>

      <Popover.Portal container={portalContainerRef}>
        <Popover.Positioner
          side="bottom"
          align="start"
          sideOffset={6}
          collisionPadding={16}
          collisionAvoidance={{
            side: "flip",
            align: "shift",
            fallbackAxisSide: "none",
          }}
          className="z-[50] outline-none"
        >
          <Popover.Popup
            initialFocus={(openType) => (openType === "keyboard" ? true : false)}
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
                    "border-border bg-popover text-popover-foreground w-[min(22rem,calc(100vw-2rem))] origin-top-left overflow-hidden rounded-sm border p-3.5 font-normal shadow-[0_10px_24px_rgb(0_0_0/0.1)] will-change-[transform,opacity] outline-none",
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
              className="flex flex-col gap-3"
            >
              <div className="space-y-1">
                <Popover.Title
                  className={cn(
                    "text-foreground text-[0.95rem] leading-tight font-medium tracking-[-0.02em]",
                    theme?.title,
                  )}
                >
                  {term}
                </Popover.Title>
                {pronunciation ? (
                  <p
                    className={cn(
                      "text-muted-foreground text-[0.72rem] leading-none font-medium tracking-[0.01em]",
                      theme?.pronunciation,
                    )}
                  >
                    {pronunciation}
                  </p>
                ) : null}
              </div>

              <Popover.Description
                render={<div />}
                className={cn(
                  "text-popover-foreground/84 text-[0.9rem] leading-snug font-normal tracking-[-0.01em] text-pretty",
                  theme?.description,
                )}
              >
                {definition}
              </Popover.Description>

              {learnMoreHref ? (
                isExternalHref ? (
                  <a
                    href={learnMoreHref}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "xs" }),
                      "mt-1 w-fit",
                      theme?.link,
                    )}
                  >
                    {learnMoreLabel}
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                ) : (
                  <Link
                    href={learnMoreHref}
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "xs" }),
                      "mt-1 w-fit",
                      theme?.link,
                    )}
                  >
                    {learnMoreLabel}
                  </Link>
                )
              ) : null}
            </motion.div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

export { DefinitionPopover };
