import { CaseStudyCard } from "@/components/portfolio/case-study-card";
import { PageHeader } from "@/components/portfolio/page-header";
import { Section } from "@/components/portfolio/section";
import { type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { getCaseStudies } from "@/lib/content/work";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

type WorkPageContentProps = {
  locale: Locale;
};

export async function WorkPageContent({ locale }: WorkPageContentProps) {
  const caseStudies = await getCaseStudies(locale);
  const theme = getActivePresentationTheme();
  const workMessages = getMessages(locale).work;

  return (
    <Section className="pt-20 md:pt-24">
      <PageHeader
        eyebrow={workMessages.eyebrow}
        title={workMessages.title}
        description={workMessages.description}
      />
      <div className={theme.slots.content.workList}>
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.slug} slug={study.slug} data={study.data} locale={locale} />
        ))}
      </div>
    </Section>
  );
}
