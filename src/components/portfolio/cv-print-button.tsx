"use client";

import { buttonVariants } from "@/components/ui/button";
import { defaultMessages } from "@/lib/i18n/messages";

export function CvPrintButton() {
  return (
    <button
      data-print-hide
      type="button"
      className={buttonVariants({ variant: "secondary", size: "sm" })}
      onClick={() => window.print()}
    >
      {defaultMessages.cv.printButtonLabel}
    </button>
  );
}
