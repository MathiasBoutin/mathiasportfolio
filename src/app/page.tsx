import { FadeIn } from "@/components/portfolio/fade-in";
import { Section } from "@/components/portfolio/section";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
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
              <section className="space-y-2">
                <h2 className="text-base font-medium text-foreground/88 md:text-lg">My work experience</h2>
                <p>{homeContent.workExperienceBlurb}</p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-medium text-foreground/88 md:text-lg">What I&apos;m good at</h2>
                <p>{homeContent.aboutLead}</p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-medium text-foreground/88 md:text-lg">Case Studies</h2>
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

              <section className="space-y-2">
                <h2 className="text-base font-medium text-foreground/88 md:text-lg">Connect</h2>
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
