import { cn } from "@/lib/utils";
import { type MediaWidth } from "@/lib/content/schema";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

type MediaBreakoutProps = {
  width: MediaWidth;
  children: React.ReactNode;
  className?: string;
};

export function MediaBreakout({ width, children, className }: MediaBreakoutProps) {
  const theme = getActivePresentationTheme();

  const widthClass =
    width === "full"
      ? theme.slots.caseStudyLayout.mediaFull
      : width === "wider"
        ? theme.slots.caseStudyLayout.mediaWider
        : theme.slots.caseStudyLayout.mediaSame;

  if (width === "same") {
    return (
      <div className={cn(theme.slots.caseStudyLayout.readingColumn, widthClass, className)}>
        {children}
      </div>
    );
  }

  return <div className={cn(widthClass, className)}>{children}</div>;
}
