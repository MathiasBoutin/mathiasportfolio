import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { WorkDetailPageContent } from "@/components/portfolio/pages/work-detail-page-content";
import { OtherWorkDetailPageContent } from "@/components/portfolio/pages/other-work-detail-page-content";
import {
  getCaseStudies,
  getCaseStudyBySlug,
  getOtherWork,
  getOtherWorkBySlug,
} from "@/lib/content/work";
import { buildMetadata } from "@/lib/metadata/seo";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const [studies, otherWork] = await Promise.all([getCaseStudies(), getOtherWork()]);
  return [
    ...studies.map((study) => ({ slug: study.slug })),
    ...otherWork.map((entry) => ({ slug: entry.slug })),
  ];
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;

  const study = await getCaseStudyBySlug(slug);
  if (study) {
    return buildMetadata({
      title: study.data.title,
      description: study.data.summary,
      path: `/work/${study.slug}`,
    });
  }

  const entry = await getOtherWorkBySlug(slug);
  if (entry) {
    return buildMetadata({
      title: entry.name,
      description: entry.summary,
      path: `/work/${entry.slug}`,
    });
  }

  return {};
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;

  const caseStudy = await getCaseStudyBySlug(slug, "en");
  if (caseStudy) return <WorkDetailPageContent slug={slug} locale="en" />;

  const otherWork = await getOtherWorkBySlug(slug);
  if (otherWork) return <OtherWorkDetailPageContent slug={slug} />;

  notFound();
}
