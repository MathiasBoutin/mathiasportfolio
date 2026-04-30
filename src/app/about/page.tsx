import type { Metadata } from "next";
import { PageHeader } from "@/components/portfolio/page-header";
import { Section } from "@/components/portfolio/section";
import { getProfileDocument } from "@/lib/content/profile";
import { renderMdx } from "@/lib/content/render-mdx";
import { buildMetadata } from "@/lib/metadata/seo";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { defaultMessages } from "@/lib/i18n/messages";

const aboutMessages = defaultMessages.about;

export const metadata: Metadata = buildMetadata({
  title: aboutMessages.metadataTitle,
  description: aboutMessages.metadataDescription,
  path: "/about",
});

export default async function AboutPage() {
  const aboutDoc = await getProfileDocument("about");
  const content = aboutDoc ? await renderMdx(aboutDoc.content) : null;
  const theme = getActivePresentationTheme();

  return (
    <Section className="pt-20 md:pt-24">
      <PageHeader
        eyebrow={aboutMessages.eyebrow}
        title={aboutMessages.title}
        description={aboutMessages.description}
      />
      <article className={theme.slots.content.borderedArticle}>
        {content}
      </article>
    </Section>
  );
}
