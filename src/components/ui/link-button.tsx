import Link from "next/link";
import { type VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LinkButtonProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof buttonVariants>;

function LinkButton({
  href,
  variant = "secondary",
  size = "xs",
  className,
  children,
}: LinkButtonProps) {
  const isExternal = /^(https?:)?\/\//.test(href);
  const classes = cn(
    buttonVariants({ variant, size }),
    "transform-gpu transition-all duration-200 ease-out hover:-translate-y-px hover:brightness-110 hover:shadow-md",
    className,
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export { LinkButton };
