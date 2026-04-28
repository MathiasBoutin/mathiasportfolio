import { FadeIn } from "@/components/portfolio/fade-in";
import { HeroFeature } from "@/components/portfolio/hero-feature";
import { Section } from "@/components/portfolio/section";
import { getFeaturedCaseStudies } from "@/lib/content/work";
import { homeContent } from "@/lib/content/home";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

export default async function Home() {
  const featuredStudies = await getFeaturedCaseStudies();
  const theme = getActivePresentationTheme();

  return (
    <>
      <Section className={theme.slots.home.heroSection}>
        <FadeIn>
          <div className="w-full">
            <h1 className={theme.slots.home.heroTitle}>
              {homeContent.heroTitle}
            </h1>
            <HeroFeature studies={featuredStudies} />
          </div>
        </FadeIn>
      </Section>

      <Section id="about" className={theme.slots.home.aboutSection} fullWidth>
        <div className={theme.slots.home.aboutGrid}>
          <p className={theme.slots.home.aboutEyebrow}>{homeContent.aboutEyebrow}</p>
          <div className="space-y-8">
            <p className={theme.slots.home.aboutLead}>
              {homeContent.aboutLead}
            </p>
            <p className={theme.slots.home.aboutBody}>
              {homeContent.aboutBody}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
