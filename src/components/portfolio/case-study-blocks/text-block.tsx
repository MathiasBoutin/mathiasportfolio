import { cn } from "@/lib/utils";
import { renderMdx } from "@/lib/content/render-mdx";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

type TextBlockProps = {
  content: string;
  className?: string;
};

export async function TextBlock({ content, className }: TextBlockProps) {
  const theme = getActivePresentationTheme();
  const rendered = await renderMdx(content);

  return (
    <div className={cn(theme.slots.caseStudyLayout.textBlock, className)}>
      {rendered}
    </div>
  );
}
