import { type CaseStudyBlock, type InlineDefinition } from "@/lib/content/schema";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { TextBlock } from "./text-block";
import { BigTextBlock } from "./big-text-block";
import { MediaBlock } from "./media-block";
import { DesktopMockBlock } from "./desktop-mock-block";
import {
  DesktopMockGalleryBlock,
  type DesktopMockGalleryLabels,
} from "./desktop-mock-gallery-block";
import { GrowthBarBlock } from "./growth-bar-block";

type BlockRendererProps = {
  blocks: CaseStudyBlock[];
  definitions?: Record<string, InlineDefinition>;
  galleryLabels: DesktopMockGalleryLabels;
};

export function BlockRenderer({ blocks, definitions, galleryLabels }: BlockRendererProps) {
  const theme = getActivePresentationTheme();

  if (blocks.length === 0) return null;

  return (
    <div className={theme.slots.caseStudyLayout.articleStack}>
      {blocks.map((block, index) => {
        if (block.type === "text") {
          return (
            <div key={index} className={theme.slots.caseStudyLayout.readingColumn}>
              <TextBlock content={block.content} definitions={definitions} />
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

        if (block.type === "growthBar") {
          return (
            <div key={index} className={theme.slots.caseStudyLayout.readingColumn}>
              <GrowthBarBlock rows={block.rows} metricLabel={block.metricLabel} metrics={block.metrics} />
            </div>
          );
        }

        if (block.type === "desktopMock") {
          return (
            <DesktopMockBlock
              key={index}
              src={block.src}
              alt={block.alt}
              caption={block.caption}
              width={block.width}
              height={block.height}
              variant={block.variant}
            />
          );
        }

        if (block.type === "desktopMockGallery") {
          return (
            <DesktopMockGalleryBlock
              key={index}
              images={block.images}
              labels={galleryLabels}
            />
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
