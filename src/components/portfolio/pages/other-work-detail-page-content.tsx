import { notFound } from "next/navigation";
import { PageHeader } from "@/components/portfolio/page-header";
import { Section } from "@/components/portfolio/section";
import { MarkdownContent } from "@/components/portfolio/markdown-content";
import { DesktopMockGalleryBlock } from "@/components/portfolio/case-study-blocks/desktop-mock-gallery-block";
import { getOtherWorkBySlug } from "@/lib/content/work";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { getMessages } from "@/lib/i18n/messages";

type OtherWorkDetailPageContentProps = {
  slug: string;
};

export async function OtherWorkDetailPageContent({
  slug,
}: OtherWorkDetailPageContentProps) {
  const entry = await getOtherWorkBySlug(slug);
  if (!entry) notFound();

  const theme = getActivePresentationTheme();
  const galleryLabels = getMessages("en").work.gallery;

  return (
    <div data-case-study-page>
      <Section className="pt-20 md:pt-24">
        <div className={theme.slots.caseStudyLayout.readingColumn}>
          <PageHeader
            eyebrow={entry.timeframe}
            title={entry.name}
            headerClassName={theme.slots.caseStudyPage.headerRoot}
            titleClassName={theme.slots.home.heroTitle}
            descriptionClassName={theme.slots.caseStudyPage.headerDescription}
            description={entry.summary}
          />
        </div>

        {entry.images.length > 0 && (
          <DesktopMockGalleryBlock
            images={entry.images}
            labels={galleryLabels}
            className="mt-16"
          />
        )}

        <div className={theme.slots.caseStudyLayout.readingColumn}>
          <MarkdownContent
            source={entry.content}
            typography="editorial"
            className="mt-16"
          />
        </div>
      </Section>
    </div>
  );
}
