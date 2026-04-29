"use client";

import { buttonVariants } from "@/components/ui/button";

export function CvPrintButton() {
  return (
    <button
      data-print-hide
      type="button"
      className={buttonVariants({ variant: "secondary", size: "sm" })}
      onClick={() => window.print()}
    >
      Download PDF
    </button>
  );
}
