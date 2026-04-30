import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/portfolio/page-header";
import { Section } from "@/components/portfolio/section";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/content/work";
import { renderMdx } from "@/lib/content/render-mdx";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { buildMetadata } from "@/lib/metadata/seo";
import { defaultMessages } from "@/lib/i18n/messages";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return {};

  return buildMetadata({
    title: study.data.title,
    description: study.data.summary,
    path: `/work/${study.slug}`,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();
  const theme = getActivePresentationTheme();

  const content = await renderMdx(caseStudy.content);

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
            {defaultMessages.work.detailLabels.problem}
          </p>
          <p className={theme.slots.content.detailValue}>
            {caseStudy.data.problem}
          </p>
        </div>
        <div>
          <p className={theme.slots.content.detailLabel}>
            {defaultMessages.work.detailLabels.outcome}
          </p>
          <p className={theme.slots.content.detailValue}>
            {caseStudy.data.outcome}
          </p>
        </div>
      </div>

      <article className={theme.slots.content.detailArticle}>
        {content}
      </article>
    </Section>
  );
}
