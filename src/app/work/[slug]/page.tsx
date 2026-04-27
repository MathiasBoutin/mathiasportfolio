import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/portfolio/page-header";
import { Section } from "@/components/portfolio/section";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/content/work";
import { renderMdx } from "@/lib/content/render-mdx";

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

  return {
    title: study.data.title,
    description: study.data.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

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

      <div className="mt-16 grid gap-8 border-y border-border py-8 md:grid-cols-2">
        <div>
          <p className="text-[0.78rem] font-semibold uppercase text-muted-foreground">
            Problem
          </p>
          <p className="mt-4 text-[clamp(1.5rem,3vw,2.8rem)] font-medium leading-[1.02] tracking-[-0.065em]">
            {caseStudy.data.problem}
          </p>
        </div>
        <div>
          <p className="text-[0.78rem] font-semibold uppercase text-muted-foreground">
            Outcome
          </p>
          <p className="mt-4 text-[clamp(1.5rem,3vw,2.8rem)] font-medium leading-[1.02] tracking-[-0.065em]">
            {caseStudy.data.outcome}
          </p>
        </div>
      </div>

      <article className="mt-16 max-w-3xl">
        {content}
      </article>
    </Section>
  );
}
