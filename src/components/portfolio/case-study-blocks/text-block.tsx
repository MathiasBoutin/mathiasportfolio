import { cn } from "@/lib/utils";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { MarkdownContent } from "@/components/portfolio/markdown-content";

type TextBlockProps = {
  content: string;
  className?: string;
};

export function TextBlock({ content, className }: TextBlockProps) {
  const theme = getActivePresentationTheme();

  return (
    <MarkdownContent
      source={content}
      className={cn(theme.slots.caseStudyLayout.textBlock, className)}
    />
  );
}
