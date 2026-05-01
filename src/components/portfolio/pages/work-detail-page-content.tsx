import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
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
    <Section className="pt-20 md:pt-24">
      <PageHeader
        eyebrow={caseStudy.data.timeline}
        title={caseStudy.data.title}
        description={caseStudy.data.summary}
      />

      <div className="mt-8 flex flex-wrap gap-2">
        <Badge>{caseStudy.data.role}</Badge>
        <Badge variant="secondary">{caseStudy.data.team}</Badge>
        {caseStudy.data.tools.map((tool) => (
          <Badge key={tool} variant="outline">
            {tool}
          </Badge>
        ))}
      </div>

      <div className={theme.slots.content.detailGrid}>
        <div>
          <p className={theme.slots.content.detailLabel}>
            {workMessages.detailLabels.problem}
          </p>
          <p className={theme.slots.content.detailValue}>
            {caseStudy.data.problem}
          </p>
        </div>
        <div>
          <p className={theme.slots.content.detailLabel}>
            {workMessages.detailLabels.outcome}
          </p>
          <p className={theme.slots.content.detailValue}>
            {caseStudy.data.outcome}
          </p>
        </div>
      </div>

      <BlockRenderer blocks={caseStudy.data.blocks} />
    </Section>
  );
}
