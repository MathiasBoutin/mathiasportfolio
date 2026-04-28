import type { Metadata } from "next";
import { PageHeader } from "@/components/portfolio/page-header";
import { Section } from "@/components/portfolio/section";
import { getProfileDocument } from "@/lib/content/profile";
import { renderMdx } from "@/lib/content/render-mdx";
import { buildMetadata } from "@/lib/metadata/seo";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

export const metadata: Metadata = buildMetadata({
  title: "Bio",
  description: "Personal background, values, and design approach.",
  path: "/about",
});

export default async function AboutPage() {
  const aboutDoc = await getProfileDocument("about");
  const content = aboutDoc ? await renderMdx(aboutDoc.content) : null;
  const theme = getActivePresentationTheme();

  return (
    <Section className="pt-20 md:pt-24">
      <PageHeader
        eyebrow="Bio"
        title="About me"
        description="The context behind my product design practice, what I value, and how I collaborate."
      />
      <article className={theme.slots.content.borderedArticle}>
        {content}
      </article>
    </Section>
  );
}
