import { cn } from "@/lib/utils";
import { type CaseStudyBlock } from "@/lib/content/schema";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { TextBlock } from "./text-block";
import { BigTextBlock } from "./big-text-block";
import { MediaBlock } from "./media-block";

type BlockRendererProps = {
  blocks: CaseStudyBlock[];
};

export async function BlockRenderer({ blocks }: BlockRendererProps) {
  const theme = getActivePresentationTheme();

  if (blocks.length === 0) return null;

  return (
    <div className={theme.slots.caseStudyLayout.grid}>
      {blocks.map((block, index) => {
        const spanClass =
          block.span === "full"
            ? theme.slots.caseStudyLayout.blockFull
            : theme.slots.caseStudyLayout.blockHalf;

        return (
          <div key={index} className={cn(spanClass)}>
            {block.type === "text" && <TextBlock content={block.content} />}
            {block.type === "bigText" && <BigTextBlock text={block.text} />}
            {block.type === "media" && <MediaBlock media={block.media} />}
          </div>
        );
      })}
    </div>
  );
}
