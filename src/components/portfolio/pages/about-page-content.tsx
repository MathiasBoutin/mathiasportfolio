import { PageHeader } from "@/components/portfolio/page-header";
import { Section } from "@/components/portfolio/section";
import { type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { getProfileDocument } from "@/lib/content/profile";
import { renderMdx } from "@/lib/content/render-mdx";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

type AboutPageContentProps = {
  locale: Locale;
};

export async function AboutPageContent({ locale }: AboutPageContentProps) {
  const aboutDoc = await getProfileDocument("about", locale);
  const content = aboutDoc ? await renderMdx(aboutDoc.content) : null;
  const theme = getActivePresentationTheme();
  const aboutMessages = getMessages(locale).about;

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
