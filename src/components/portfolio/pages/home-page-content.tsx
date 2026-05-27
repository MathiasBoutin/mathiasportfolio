import Link from "next/link";
import { FadeIn } from "@/components/portfolio/fade-in";
import { LanguageGreetingPicker } from "@/components/portfolio/language-greeting-picker";
import { Section } from "@/components/portfolio/section";
import { DefinitionPopover } from "@/components/ui/definition-popover";
import { Badge } from "@/components/ui/badge";
import { type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { localizePath } from "@/lib/i18n/routing";
import { getFeaturedCaseStudies, getOtherWork } from "@/lib/content/work";
import { definitionPopoverThemes } from "@/lib/definition-popover-themes";
import { getHomeContent } from "@/lib/content/home";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { type as typeStyle, typeClasses } from "@/lib/typography";
import { cn } from "@/lib/utils";

type HomePageContentProps = {
  locale: Locale;
};

export async function HomePageContent({ locale }: HomePageContentProps) {
  const featuredStudies = await getFeaturedCaseStudies(locale);
  const otherWork = await getOtherWork();
  const homeContent = getHomeContent(locale);
  const theme = getActivePresentationTheme();
  const messages = getMessages(locale);
  const homeMessages = messages.home;

  return (
    <Section className={`${theme.slots.home.heroSection} !min-h-0 !py-6 md:!py-8`}>
      <FadeIn>
        <div className="flex min-h-[calc(100svh-15rem)] w-full flex-col justify-center pt-16 md:min-h-[calc(100svh-16rem)] md:pt-20">
          <Badge
            className={cn(
              "mb-5 inline-flex rounded-[4px] bg-foreground px-3 py-1 text-background",
              typeStyle("badgeProminent"),
            )}
          >
            {homeContent.heroBadge}
          </Badge>
          <h1 className={`${theme.slots.home.heroTitle} text-balance`}>
            <LanguageGreetingPicker
              locale={locale}
              englishGreeting={homeMessages.languagePicker.englishGreeting}
              frenchGreeting={homeMessages.languagePicker.frenchGreeting}
              ariaLabel={homeMessages.languagePicker.switchLabel}
              className="block"
            />
            {homeContent.heroTitle}
          </h1>
          <div
            className={cn(
              "mt-10 space-y-8 text-foreground/70",
              typeClasses({ size: 16, leading: "body", tracking: "tight", traits: ["textPretty"] }),
            )}
          >
            <section className="space-y-2">
              <h2 className={cn(typeClasses({ size: "16to20", weight: "semibold", tracking: "tight", traits: ["textPretty"] }), "text-foreground/88")}>
                {homeMessages.sections.workExperience}
              </h2>
              <p>
                {homeContent.workExperienceText.beforeShopify}{" "}
                <DefinitionPopover
                  term={homeMessages.popovers.shopify.term}
                  pronunciation={homeMessages.popovers.shopify.pronunciation}
                  definition={homeMessages.popovers.shopify.definition}
                  learnMoreHref={homeMessages.popovers.shopify.learnMoreHref}
                  learnMoreLabel={homeMessages.popovers.shopify.learnMoreLabel}
                  theme={definitionPopoverThemes.shopify}
                />{" "}
                {homeContent.workExperienceText.beforePatch}{" "}
                <DefinitionPopover
                  term={homeMessages.popovers.patch.term}
                  pronunciation={homeMessages.popovers.patch.pronunciation}
                  definition={homeMessages.popovers.patch.definition}
                  learnMoreHref={homeMessages.popovers.patch.learnMoreHref}
                  learnMoreLabel={homeMessages.popovers.patch.learnMoreLabel}
                  theme={definitionPopoverThemes.patch}
                />
                {homeContent.workExperienceText.beforeShopPay}{" "}
                <DefinitionPopover
                  term={homeMessages.popovers.shopPay.term}
                  pronunciation={homeMessages.popovers.shopPay.pronunciation}
                  definition={homeMessages.popovers.shopPay.definition}
                  learnMoreHref={homeMessages.popovers.shopPay.learnMoreHref}
                  learnMoreLabel={homeMessages.popovers.shopPay.learnMoreLabel}
                  theme={definitionPopoverThemes.shop}
                />{" "}
                {homeContent.workExperienceText.beforeShopApp}{" "}
                <DefinitionPopover
                  term={homeMessages.popovers.shopApp.term}
                  pronunciation={homeMessages.popovers.shopApp.pronunciation}
                  definition={homeMessages.popovers.shopApp.definition}
                  learnMoreHref={homeMessages.popovers.shopApp.learnMoreHref}
                  learnMoreLabel={homeMessages.popovers.shopApp.learnMoreLabel}
                  theme={definitionPopoverThemes.shop}
                />{" "}
                {homeContent.workExperienceText.beforeAIServices}{" "}
                <DefinitionPopover
                  term={homeMessages.popovers.aiServices.term}
                  pronunciation={homeMessages.popovers.aiServices.pronunciation}
                  definition={homeMessages.popovers.aiServices.definition}
                  learnMoreHref={homeMessages.popovers.aiServices.learnMoreHref}
                  learnMoreLabel={homeMessages.popovers.aiServices.learnMoreLabel}
                  theme={definitionPopoverThemes.patch}
                />
                {homeContent.workExperienceText.afterAIServices}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className={cn(typeClasses({ size: "16to20", weight: "semibold", tracking: "tight", traits: ["textPretty"] }), "text-foreground/88")}>
                {homeMessages.sections.whoIAm}
              </h2>
              <p>{homeContent.aboutLead}</p>
            </section>

            <section className="space-y-2">
              <h2 className={cn(typeClasses({ size: "16to20", weight: "semibold", tracking: "tight", traits: ["textPretty"] }), "text-foreground/88")}>
                {homeMessages.sections.caseStudies}
              </h2>
              <ul className="space-y-1">
                {featuredStudies.map((study) => (
                  <li key={study.slug}>
                    {study.data.comingSoon ? (
                      <span className="cursor-default text-foreground/40">
                        {study.data.title}{" "}
                        <span className="text-muted-foreground/40">
                          (Coming soon...)
                        </span>
                      </span>
                    ) : (
                      <Link
                        href={localizePath(`/work/${study.slug}`, locale)}
                        className="soft-link"
                      >
                        {study.data.title}{" "}
                        <span className="text-muted-foreground/60">
                          ({study.data.company}, {study.data.timeline})
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className={cn(typeClasses({ size: "16to20", weight: "semibold", tracking: "tight", traits: ["textPretty"] }), "text-foreground/88")}>
                Other work
              </h2>
              <ul className="space-y-1">
                {otherWork.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/work/${item.slug}`} className="soft-link">
                      {item.name}{" "}
                      <span className="text-muted-foreground/60">
                        ({item.company}, {item.timeframe})
                      </span>
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
