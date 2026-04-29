import { FadeIn } from "@/components/portfolio/fade-in";
import { Section } from "@/components/portfolio/section";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DefinitionPopover } from "@/components/ui/definition-popover";
import { getFeaturedCaseStudies } from "@/lib/content/work";
import { homeContent } from "@/lib/content/home";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { siteConfig } from "@/lib/site-config";

export default async function Home() {
  const featuredStudies = await getFeaturedCaseStudies();
  const theme = getActivePresentationTheme();

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
                <h2 className="text-sm font-semibold text-foreground/88 md:text-base">My work experience</h2>
                <p>
                  I spent 2017-2021 at{" "}
                  <DefinitionPopover
                    term="Shopify"
                    pronunciation="shop-uh-fy"
                    definition="A commerce platform that helps businesses create online stores, accept payments, and sell across digital and physical channels."
                    learnMoreHref="https://www.shopify.com"
                    learnMoreLabel="Visit Shopify"
                  />{" "}
                  shaping Shop Pay and the Shop app across checkout and buyer
                  experiences. In 2021, I joined{" "}
                  <DefinitionPopover
                    term="Patch"
                    pronunciation="patch"
                    definition="A climate technology company that helps organizations buy, manage, and scale high-quality carbon removal."
                    learnMoreHref="https://www.patch.io"
                    learnMoreLabel="Visit Patch"
                  />{" "}
                  to design environmental impact infrastructure software for
                  climate action.
                </p>
              </section>

              <section className="space-y-1">
                <h2 className="text-sm font-semibold text-foreground/88 md:text-base">What I&apos;m good at</h2>
                <p>{homeContent.aboutLead}</p>
              </section>

              <section className="space-y-1">
                <h2 className="text-sm font-semibold text-foreground/88 md:text-base">Case Studies</h2>
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
                <h2 className="text-sm font-semibold text-foreground/88 md:text-base">Connect</h2>
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
