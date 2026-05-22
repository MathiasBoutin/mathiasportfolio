import { cn } from "@/lib/utils";
import { type InlineDefinition } from "@/lib/content/schema";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { MarkdownContent } from "@/components/portfolio/markdown-content";

type TextBlockProps = {
  content: string;
  className?: string;
  definitions?: Record<string, InlineDefinition>;
};

export function TextBlock({ content, className, definitions }: TextBlockProps) {
  const theme = getActivePresentationTheme();

  return (
    <MarkdownContent
      source={content}
      typography="editorial"
      definitions={definitions}
      className={cn(theme.slots.caseStudyLayout.textBlock, className)}
    />
  );
}
