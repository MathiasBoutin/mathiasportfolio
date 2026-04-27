import { FadeIn } from "@/components/portfolio/fade-in";
import { HeroFeature } from "@/components/portfolio/hero-feature";
import { Section } from "@/components/portfolio/section";
import { getFeaturedCaseStudies } from "@/lib/content/work";

export default async function Home() {
  const featuredStudies = await getFeaturedCaseStudies();
  return (
    <>
      <Section className="flex min-h-screen items-center pb-20 pt-24 md:pb-24 md:pt-32">
        <FadeIn>
          <div className="w-full">
            <h1 className="max-w-[30ch] text-balance text-[clamp(2rem,3.6vw,3.15rem)] font-semibold leading-[1.04] tracking-[-0.06em] text-foreground">
              Product designer building useful digital experiences with purpose
              and care over details
            </h1>
            <HeroFeature studies={featuredStudies} />
          </div>
        </FadeIn>
      </Section>

      <Section id="about" className="pt-4" fullWidth>
        <div className="grid gap-8 border-t border-border pt-12 md:grid-cols-[1fr_2.2fr]">
          <p className="text-[0.78rem] font-semibold uppercase text-muted-foreground">
            About
          </p>
          <div className="space-y-8">
            <p className="text-[clamp(1.9rem,4vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.085em]">
              I turn ambiguous product problems into clear interaction models,
              practical systems, and interfaces that feel resolved.
            </p>
            <p className="max-w-2xl text-[clamp(1.25rem,2.2vw,2rem)] font-medium leading-[1.08] tracking-[-0.055em] text-foreground/80">
              My work sits between research, product strategy, interaction design,
              and design systems. I prefer simple ideas, careful details, and close
              collaboration with engineers.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
