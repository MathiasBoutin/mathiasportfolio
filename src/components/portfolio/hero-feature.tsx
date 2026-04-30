import Link from "next/link";
import type { CaseStudyFrontmatter } from "@/lib/content/schema";
import { getHomeContent } from "@/lib/content/home";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

type HeroFeatureProps = {
  studies: {
    slug: string;
    data: CaseStudyFrontmatter;
  }[];
};

export function HeroFeature({ studies }: HeroFeatureProps) {
  const theme = getActivePresentationTheme();
  const homeContent = getHomeContent();
  const { experience } = homeContent;

  return (
    <div className={theme.slots.home.featureRoot}>
      <section className={theme.slots.home.featureSection}>
        <h2 className={theme.slots.home.featureEyebrow}>
          Experience
        </h2>
        <div className="grid gap-4">
          {experience.map((role) => (
            <article
              key={`${role.company}-${role.timeline}`}
              className={theme.slots.home.featureRow}
            >
              <p className={theme.slots.home.featureTimeline}>
                {role.timeline}
              </p>
              <div>
                <h3 className={theme.slots.home.featureHeading}>
                  {role.company}
                </h3>
                <p className={theme.slots.home.featureDescription}>
                  {role.role} · {role.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className={theme.slots.home.featureSection}>
        <h2 className={theme.slots.home.featureEyebrow}>
          Featured work
        </h2>
        <div className="grid gap-4">
          {studies.map((study) => (
            <Link key={study.slug} href={`/work/${study.slug}`} className="group block">
              <article className={theme.slots.home.featureRow}>
                <p className={theme.slots.home.featureTimeline}>
                  {study.data.timeline}
                </p>
                <div>
                  <h3 className={theme.slots.home.featureLinkHeading}>
                    {study.data.title}
                  </h3>
                  <p className={theme.slots.home.featureLinkDescription}>
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
