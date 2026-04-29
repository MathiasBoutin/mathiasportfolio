"use client";

import * as React from "react";
import { Popover } from "@base-ui/react/popover";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
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
};

function DefinitionPopover({
  term,
  definition,
  pronunciation,
  learnMoreHref,
  learnMoreLabel = "Dive deeper",
  children,
  className,
  popupClassName,
}: DefinitionPopoverProps) {
  const isExternalHref =
    typeof learnMoreHref === "string" && /^(https?:)?\/\//.test(learnMoreHref);

  return (
    <Popover.Root modal={false}>
      <Popover.Trigger
        type="button"
        openOnHover
        delay={80}
        closeDelay={220}
        className={cn(
          "text-foreground focus-visible:ring-ring/40 data-[popup-open]:bg-foreground/12 relative inline-flex items-center cursor-help appearance-none rounded-[4px] border-0 bg-foreground/8 px-2 py-[0.12em] text-left text-[0.92em] font-[inherit] leading-[inherit] tracking-[inherit] transition-[background-color,color,box-shadow,transform] duration-200 ease-out will-change-transform hover:-translate-y-[0.5px] hover:bg-foreground/12 focus-visible:ring-3 focus-visible:outline-none",
          className,
        )}
      >
        {children ?? term}
      </Popover.Trigger>

      <Popover.Portal>
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
          className="z-[60] outline-none"
        >
          <Popover.Popup
            initialFocus={(openType) => (openType === "keyboard" ? true : false)}
            finalFocus={false}
            className={cn(
              "border-border bg-popover text-popover-foreground w-[min(22rem,calc(100vw-2rem))] origin-[var(--transform-origin)] rounded-sm border p-3.5 shadow-[0_10px_24px_rgb(0_0_0/0.1)] transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[transform,opacity] outline-none data-[ending-style]:translate-y-1 data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[starting-style]:translate-y-1 data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0",
              popupClassName,
            )}
          >
            <div className="flex flex-col gap-3">
              <div className="space-y-1">
                <Popover.Title className="text-foreground text-[0.95rem] leading-tight font-medium tracking-[-0.02em]">
                  {term}
                </Popover.Title>
                {pronunciation ? (
                  <p className="text-muted-foreground text-[0.72rem] leading-none font-medium tracking-[0.01em]">
                    {pronunciation}
                  </p>
                ) : null}
              </div>

              <Popover.Description
                render={<div />}
                className="text-popover-foreground/84 text-[0.9rem] leading-snug tracking-[-0.01em] text-pretty"
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
                    )}
                  >
                    {learnMoreLabel}
                  </Link>
                )
              ) : null}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

export { DefinitionPopover };
