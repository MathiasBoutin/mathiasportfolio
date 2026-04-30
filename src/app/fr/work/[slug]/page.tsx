import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { WorkDetailPageContent } from "@/components/portfolio/pages/work-detail-page-content";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/content/work";
import { buildMetadata } from "@/lib/metadata/seo";

type FrenchCaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const studies = await getCaseStudies("fr");
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: FrenchCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug, "fr");
  if (!study) return {};

  return buildMetadata({
    title: study.data.title,
    description: study.data.summary,
    path: `/work/${study.slug}`,
    locale: "fr",
  });
}

export default async function FrenchCaseStudyPage({ params }: FrenchCaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug, "fr");
  if (!caseStudy) notFound();
  return <WorkDetailPageContent slug={slug} locale="fr" />;
}
