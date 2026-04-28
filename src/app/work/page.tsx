import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/portfolio/case-study-card";
import { PageHeader } from "@/components/portfolio/page-header";
import { Section } from "@/components/portfolio/section";
import { getCaseStudies } from "@/lib/content/work";
import { buildMetadata } from "@/lib/metadata/seo";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies",
  description: "Selected UX and product design projects.",
  path: "/work",
});

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();
  const theme = getActivePresentationTheme();

  return (
    <Section className="pt-20 md:pt-24">
      <PageHeader
        eyebrow="Case studies"
        title="Selected product work"
        description="A curated set of projects showing the problem, process, design decisions, and measurable results."
      />
      <div className={theme.slots.content.workList}>
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.slug} slug={study.slug} data={study.data} />
        ))}
      </div>
    </Section>
  );
}
