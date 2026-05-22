import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/portfolio/fade-in";
import { LanguageGreetingPicker } from "@/components/portfolio/language-greeting-picker";
import { Section } from "@/components/portfolio/section";
import { DefinitionPopover } from "@/components/ui/definition-popover";
import { Badge } from "@/components/ui/badge";
import { type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { localizePath } from "@/lib/i18n/routing";
import { getFeaturedCaseStudies } from "@/lib/content/work";
import { definitionPopoverThemes } from "@/lib/definition-popover-themes";
import { getHomeContent } from "@/lib/content/home";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { type as typeStyle } from "@/lib/typography";
import { cn } from "@/lib/utils";

type HomePageContentProps = {
  locale: Locale;
};

export async function HomePageContent({ locale }: HomePageContentProps) {
  const featuredStudies = await getFeaturedCaseStudies(locale);
  const homeContent = getHomeContent(locale);
  const theme = getActivePresentationTheme();
  const messages = getMessages(locale);
  const homeMessages = messages.home;

  return (
    <Section className={`${theme.slots.home.heroSection} !min-h-0 !py-6 md:!py-8`}>
      <FadeIn>
        <div className="flex min-h-[calc(100svh-15rem)] w-full flex-col justify-center md:min-h-[calc(100svh-16rem)]">
          <Badge
            className={cn(
              "mb-5 inline-flex rounded-[4px] bg-foreground px-3 py-1 text-background",
              typeStyle("badgeProminent"),
            )}
          >
            {homeContent.heroBadge}
          </Badge>
          <LanguageGreetingPicker
            locale={locale}
            englishGreeting={homeMessages.languagePicker.englishGreeting}
            frenchGreeting={homeMessages.languagePicker.frenchGreeting}
            ariaLabel={homeMessages.languagePicker.switchLabel}
            className={`${theme.slots.home.heroTitle} mb-2`}
          />
          <h1 className={`${theme.slots.home.heroTitle} whitespace-pre-line`}>
            {homeContent.heroTitle}
          </h1>
          <div
            className={cn(
              "mt-10 space-y-8 text-foreground/70",
              typeStyle("bodyBase"),
            )}
          >
            <section className="space-y-1">
              <h2 className={cn(typeStyle("headingSm"), "text-foreground/88")}>
                {homeMessages.sections.workExperience}
              </h2>
              <p>
                {homeContent.workExperienceText.beforeFirstPopover}{" "}
                <DefinitionPopover
                  term={homeMessages.popovers.shopify.term}
                  pronunciation={homeMessages.popovers.shopify.pronunciation}
                  definition={homeMessages.popovers.shopify.definition}
                  learnMoreHref={homeMessages.popovers.shopify.learnMoreHref}
                  learnMoreLabel={homeMessages.popovers.shopify.learnMoreLabel}
                  theme={definitionPopoverThemes.shopify}
                />{" "}
                {homeContent.workExperienceText.betweenPopovers}{" "}
                <DefinitionPopover
                  term={homeMessages.popovers.patch.term}
                  pronunciation={homeMessages.popovers.patch.pronunciation}
                  definition={homeMessages.popovers.patch.definition}
                  learnMoreHref={homeMessages.popovers.patch.learnMoreHref}
                  learnMoreLabel={homeMessages.popovers.patch.learnMoreLabel}
                  theme={definitionPopoverThemes.patch}
                />{" "}
                {homeContent.workExperienceText.afterSecondPopover}
              </p>
            </section>

            <section className="space-y-1">
              <h2 className={cn(typeStyle("headingSm"), "text-foreground/88")}>
                {homeMessages.sections.strengths}
              </h2>
              <p>{homeContent.aboutLead}</p>
            </section>

            <section className="space-y-1">
              <h2 className={cn(typeStyle("headingSm"), "text-foreground/88")}>
                {homeMessages.sections.caseStudies}
              </h2>
              <ul className="page-rails-rule-list -mx-6 md:-mx-8">
                {featuredStudies.map((study) => (
                  <li key={study.slug} className="page-rails-rule-row">
                    <Link
                      href={localizePath(`/work/${study.slug}`, locale)}
                      className="group flex items-start justify-between gap-4 p-6 transition-colors duration-300 ease-out hover:bg-portfolio-surface-hover md:p-8"
                    >
                      <div className="min-w-0">
                        <h3 className={theme.slots.home.featureHeading}>{study.data.title}</h3>
                        <p className={cn(typeStyle("featureBody"), "mt-0.5 max-w-none text-muted-foreground/78")}>
                          {study.data.summary}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3 pt-0.5 md:gap-6">
                        <span className={theme.slots.home.featureTimeline}>{study.data.company}</span>
                        <span className={theme.slots.home.featureTimeline}>{study.data.timeline}</span>
                        <ArrowRight
                          size={14}
                          className="shrink-0 text-muted-foreground/55 transition-transform group-hover:translate-x-0.5"
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
