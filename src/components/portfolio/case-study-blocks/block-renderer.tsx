import { type CaseStudyBlock } from "@/lib/content/schema";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { TextBlock } from "./text-block";
import { BigTextBlock } from "./big-text-block";
import { MediaBlock } from "./media-block";

type BlockRendererProps = {
  blocks: CaseStudyBlock[];
};

export function BlockRenderer({ blocks }: BlockRendererProps) {
  const theme = getActivePresentationTheme();

  if (blocks.length === 0) return null;

  return (
    <div className={theme.slots.caseStudyLayout.articleStack}>
      {blocks.map((block, index) => {
        if (block.type === "text") {
          return (
            <div key={index} className={theme.slots.caseStudyLayout.readingColumn}>
              <TextBlock content={block.content} />
            </div>
          );
        }

        if (block.type === "bigText") {
          return (
            <div key={index} className={theme.slots.caseStudyLayout.readingColumn}>
              <BigTextBlock text={block.text} />
            </div>
          );
        }

        return (
          <MediaBlock
            key={index}
            media={block.media}
            width={block.width}
          />
        );
      })}
    </div>
  );
}
