import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/portfolio/section";
import { buildMetadata } from "@/lib/metadata/seo";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "CV",
  description: "Professional experience, skills, and education.",
  path: "/cv",
});

const about =
  "I design products across high-complexity environments, from consumer checkout experiences to environmental impact infrastructure. My work sits at the intersection of product strategy, interaction design, and systems thinking, with a focus on helping teams ship practical value while preserving long-term coherence.";

const experience = [
  {
    company: "Patch",
    context: "Montreal, remote",
    tenure: "2022 - Present",
    roles: [
      {
        title: "Staff Product Designer",
        tenure: "2025 - Present",
      },
    ],
    highlights: [
      "Promoted from Senior Product Designer (2022-2025).",
      "Led product design for environmental impact infrastructure, including EAC purchasing and portfolio management workflows.",
      "Shaped end-to-end platform experiences with design systems and product strategy alignment across teams.",
    ],
  },
  {
    company: "Shopify",
    context: "Montreal, hybrid",
    tenure: "2018 - 2022",
    roles: [
      {
        title: "Senior Product Designer",
        tenure: "2020 - 2022",
      },
    ],
    highlights: [
      "Promoted from Product Designer midway through tenure.",
      "Shaped Shop Pay and Shop app experiences across checkout and buyer-facing commerce flows.",
      "Delivered consumer-facing product improvements at scale in close partnership with product and engineering.",
    ],
  },
] as const;

const education = [
  {
    school: "HEC Montreal",
    credential: "Master's degree, User Experience in a Business Context",
    tenure: "2017 - 2018",
  },
  {
    school: "Universite de Montreal",
    credential: "Bachelor's degree, International/Global Studies",
    tenure: "2014 - 2017",
  },
] as const;

const focusAreas = [
  "Product strategy",
  "Interaction design",
  "Systems thinking",
  "Design systems",
  "AI/product workflows",
  "Climate and environmental impact infrastructure",
] as const;

export default async function CvPage() {
  return (
    <Section className="pt-18 md:pt-22">
      <div className="space-y-10 md:space-y-12">
        <header className="max-w-3xl space-y-4">
          <h1 className="text-[clamp(2.2rem,6vw,4.4rem)] font-semibold leading-[1]">
            Mathias Boutin
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-foreground/70 md:text-base">{about}</p>
          <div>
            <Link href="/cv.pdf" target="_blank" className={buttonVariants({ variant: "secondary", size: "sm" })}>
              Download PDF
              <span className="sr-only"> (opens in new tab)</span>
            </Link>
          </div>
        </header>

        <section aria-label="Timeline">
          <ol className="space-y-8 md:space-y-9">
            {experience.map((entry) => (
              <li key={entry.company} className="grid gap-2 md:grid-cols-[10rem_1fr] md:gap-8">
                <p className="text-[0.78rem] font-medium uppercase tracking-[0.01em] text-muted-foreground">
                  {entry.tenure}
                </p>
                <article>
                  <div className="flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between md:gap-4">
                    <p className="text-sm font-semibold text-foreground/88 md:text-base">{entry.company}</p>
                    <p className="text-sm text-foreground/55 md:text-right">{entry.context}</p>
                  </div>
                  <div>
                    <ul>
                      {entry.roles.map((role) => (
                        <li key={role.title} className="text-sm leading-relaxed text-foreground/78 md:text-base">
                          <span className="font-medium text-foreground/90">{role.title}</span>
                          <span className="text-foreground/62"> · {role.tenure}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="list-disc space-y-0.5 pl-4 text-sm leading-relaxed text-foreground/70 md:text-base">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            ))}
            {education.map((entry) => (
              <li key={entry.school} className="grid gap-2 md:grid-cols-[10rem_1fr] md:gap-8">
                <p className="text-[0.78rem] font-medium uppercase tracking-[0.01em] text-muted-foreground">
                  {entry.tenure}
                </p>
                <article>
                  <p className="text-sm font-semibold text-foreground/88 md:text-base">{entry.school}</p>
                  <p className="text-sm leading-relaxed text-foreground/78 md:text-base">{entry.credential}</p>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground/88 md:text-base">Focus Areas</h2>
          <ul className="flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <li key={area} className="rounded-[4px] bg-foreground/8 px-2 py-[0.12em] text-sm text-foreground/78 md:text-base">
                {area}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Section>
  );
}
