import { notFound } from "next/navigation";
import { PageHeader } from "@/components/portfolio/page-header";
import { Section } from "@/components/portfolio/section";
import { BlockRenderer } from "@/components/portfolio/case-study-blocks/block-renderer";
import { type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { getCaseStudyBySlug } from "@/lib/content/work";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

type WorkDetailPageContentProps = {
  slug: string;
  locale: Locale;
};

export async function WorkDetailPageContent({ slug, locale }: WorkDetailPageContentProps) {
  const caseStudy = await getCaseStudyBySlug(slug, locale);
  if (!caseStudy) notFound();
  const theme = getActivePresentationTheme();
  const workMessages = getMessages(locale).work;

  return (
    <div data-case-study-page>
      <Section className="pt-20 md:pt-24">
        <div className={theme.slots.caseStudyLayout.readingColumn}>
          <PageHeader
            eyebrow={caseStudy.data.timeline}
            title={caseStudy.data.title}
            headerClassName={theme.slots.caseStudyPage.headerRoot}
            titleClassName={theme.slots.home.heroTitle}
            descriptionClassName={theme.slots.caseStudyPage.headerDescription}
            description={
              <>
                <span className={theme.slots.caseStudyPage.tldrLead}>
                  {workMessages.tldrLabel}
                </span>{" "}
                {caseStudy.data.summary}
              </>
            }
          />
        </div>

        <BlockRenderer
          blocks={caseStudy.data.blocks}
          definitions={caseStudy.data.definitions}
          galleryLabels={workMessages.gallery}
        />
      </Section>
    </div>
  );
}
