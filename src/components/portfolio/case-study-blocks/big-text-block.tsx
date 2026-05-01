import { cn } from "@/lib/utils";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

type BigTextBlockProps = {
  text: string;
  className?: string;
};

export function BigTextBlock({ text, className }: BigTextBlockProps) {
  const theme = getActivePresentationTheme();

  return (
    <p className={cn(theme.slots.caseStudyLayout.bigTextBlock, className)}>
      {text}
    </p>
  );
}
