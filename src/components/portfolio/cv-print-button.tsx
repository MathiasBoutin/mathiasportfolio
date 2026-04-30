"use client";

import { buttonVariants } from "@/components/ui/button";

type CvPrintButtonProps = {
  label: string;
};

export function CvPrintButton({ label }: CvPrintButtonProps) {
  return (
    <button
      data-print-hide
      type="button"
      className={buttonVariants({ variant: "secondary", size: "sm" })}
      onClick={() => window.print()}
    >
      {label}
    </button>
  );
}
