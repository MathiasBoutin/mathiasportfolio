import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/portfolio/page-header";
import { Section } from "@/components/portfolio/section";
import { getProfileDocument } from "@/lib/content/profile";
import { renderMdx } from "@/lib/content/render-mdx";
import { buildMetadata } from "@/lib/metadata/seo";
import { buttonVariants } from "@/components/ui/button";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

export const metadata: Metadata = buildMetadata({
  title: "CV",
  description: "Professional experience, skills, and education.",
  path: "/cv",
});

export default async function CvPage() {
  const cvDoc = await getProfileDocument("cv");
  const content = cvDoc ? await renderMdx(cvDoc.content) : null;
  const theme = getActivePresentationTheme();

  return (
    <Section className="pt-20 md:pt-24">
      <PageHeader
        eyebrow="Curriculum vitae"
        title="Experience and background"
        description="A practical overview of my experience, methods, and product outcomes."
      />
      <div className="mt-8">
        <Link
          href="/cv.pdf"
          target="_blank"
          className={buttonVariants({ variant: "secondary" })}
        >
          Download PDF version
        </Link>
      </div>
      <article className={theme.slots.content.borderedArticle}>
        {content}
      </article>
    </Section>
  );
}
