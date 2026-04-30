import { FadeIn } from "@/components/portfolio/fade-in";
import { Section } from "@/components/portfolio/section";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DefinitionPopover } from "@/components/ui/definition-popover";
import { getFeaturedCaseStudies } from "@/lib/content/work";
import { getHomeContent } from "@/lib/content/home";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { siteConfig } from "@/lib/site-config";
import { defaultMessages } from "@/lib/i18n/messages";

export default async function Home() {
  const featuredStudies = await getFeaturedCaseStudies();
  const homeContent = getHomeContent();
  const theme = getActivePresentationTheme();
  const homeMessages = defaultMessages.home;

  return (
    <>
      <Section className={`${theme.slots.home.heroSection} !min-h-0 !py-6 md:!py-8`}>
        <FadeIn>
          <div className="flex min-h-[calc(100svh-15rem)] w-full flex-col justify-center md:min-h-[calc(100svh-16rem)]">
            <Badge className="mb-5 inline-flex rounded-[4px] bg-foreground px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-background">
              {homeContent.heroBadge}
            </Badge>
            <h1 className={`${theme.slots.home.heroTitle} whitespace-pre-line`}>
              {homeContent.heroTitle}
            </h1>
            <div className="mt-10 space-y-7 text-sm leading-relaxed text-foreground/70 md:mt-12 md:space-y-8 md:text-base">
              <section className="space-y-1">
                <h2 className="text-sm font-semibold text-foreground/88 md:text-base">
                  {homeMessages.sections.workExperience}
                </h2>
                <p>
                  I spent 2017-2021 at{" "}
                  <DefinitionPopover
                    term={homeMessages.popovers.shopify.term}
                    pronunciation={homeMessages.popovers.shopify.pronunciation}
                    definition={homeMessages.popovers.shopify.definition}
                    learnMoreHref={homeMessages.popovers.shopify.learnMoreHref}
                    learnMoreLabel={homeMessages.popovers.shopify.learnMoreLabel}
                  />{" "}
                  shaping Shop Pay and the Shop app across checkout and buyer
                  experiences. In 2021, I joined{" "}
                  <DefinitionPopover
                    term={homeMessages.popovers.patch.term}
                    pronunciation={homeMessages.popovers.patch.pronunciation}
                    definition={homeMessages.popovers.patch.definition}
                    learnMoreHref={homeMessages.popovers.patch.learnMoreHref}
                    learnMoreLabel={homeMessages.popovers.patch.learnMoreLabel}
                  />{" "}
                  to design environmental impact infrastructure software for
                  climate action.
                </p>
              </section>

              <section className="space-y-1">
                <h2 className="text-sm font-semibold text-foreground/88 md:text-base">
                  {homeMessages.sections.strengths}
                </h2>
                <p>{homeContent.aboutLead}</p>
              </section>

              <section className="space-y-1">
                <h2 className="text-sm font-semibold text-foreground/88 md:text-base">
                  {homeMessages.sections.caseStudies}
                </h2>
                <ul className="space-y-1">
                  {featuredStudies.map((study) => (
                    <li key={study.slug}>
                      <Link
                        href={`/work/${study.slug}`}
                        className="soft-link"
                      >
                        {study.data.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-1">
                <h2 className="text-sm font-semibold text-foreground/88 md:text-base">
                  {homeMessages.sections.connect}
                </h2>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="soft-link"
                    >
                      {siteConfig.contactEmail}
                    </Link>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
