import Link from "next/link";
import type { CaseStudyFrontmatter } from "@/lib/content/schema";

type HeroFeatureProps = {
  studies: {
    slug: string;
    data: CaseStudyFrontmatter;
  }[];
};

const experience = [
  {
    timeline: "Mar 2022 - Present",
    company: "Patch",
    role: "Staff Product Designer",
    summary: "Leading EAC purchasing and portfolio management.",
  },
  {
    timeline: "Jan 2018 - Mar 2022",
    company: "Shopify",
    role: "Senior Product Designer",
    summary: "Shaped Shop Pay, Shop App, and buyer-facing commerce experiences.",
  },
];

export function HeroFeature({ studies }: HeroFeatureProps) {
  if (studies.length === 0 && experience.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 grid w-full gap-8 md:mt-9 md:gap-8">
      <section className="grid gap-3 md:grid-cols-[6.2rem_1fr] md:gap-6">
        <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground/55">
          Experience
        </h2>
        <div className="grid gap-4">
          {experience.map((role) => (
            <article
              key={`${role.company}-${role.timeline}`}
              className="grid gap-1 md:grid-cols-[6.2rem_1fr] md:gap-6"
            >
              <p className="font-ibm-plex-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground/55">
                {role.timeline}
              </p>
              <div>
                <h3 className="text-[clamp(1.05rem,1.45vw,1.4rem)] font-medium leading-none tracking-[-0.045em] text-foreground/82">
                  {role.company}
                </h3>
                <p className="mt-0.5 max-w-xl text-[0.9rem] font-normal leading-snug tracking-[-0.01em] text-muted-foreground/78">
                  {role.role} · {role.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="grid gap-3 md:grid-cols-[6.2rem_1fr] md:gap-6">
        <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground/55">
          Featured work
        </h2>
        <div className="grid gap-4">
          {studies.map((study) => (
            <Link key={study.slug} href={`/work/${study.slug}`} className="group block">
              <article className="grid gap-1 md:grid-cols-[6.2rem_1fr] md:gap-6">
                <p className="font-ibm-plex-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground/55">
                  {study.data.timeline}
                </p>
                <div>
                  <h3 className="text-[clamp(1.05rem,1.45vw,1.4rem)] font-medium leading-none tracking-[-0.045em] text-foreground/82 transition-opacity group-hover:opacity-55">
                    {study.data.title}
                  </h3>
                  <p className="mt-0.5 max-w-xl text-[0.9rem] font-normal leading-snug tracking-[-0.01em] text-muted-foreground/78 transition-colors group-hover:text-foreground/65">
                    {study.data.role} · {study.data.outcome}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
