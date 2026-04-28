import Link from "next/link";
import type { CaseStudyFrontmatter } from "@/lib/content/schema";
import { Badge } from "@/components/ui/badge";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

type CaseStudyCardProps = {
  slug: string;
  data: CaseStudyFrontmatter;
};

export function CaseStudyCard({ slug, data }: CaseStudyCardProps) {
  const theme = getActivePresentationTheme();

  return (
    <article className={theme.slots.card.root}>
      <Link href={`/work/${slug}`} className="group block">
        <div className={theme.slots.card.grid}>
          <div className={theme.slots.card.eyebrowWrap}>
            <p className={theme.slots.card.timeline}>{data.timeline}</p>
            <p>{String(data.order).padStart(2, "0")}</p>
          </div>
          <div>
            <h2 className={theme.slots.card.title}>
              {data.title}
            </h2>
            <p className={theme.slots.card.summary}>
              {data.summary}
            </p>
            <div className={theme.slots.card.table}>
              <p className={theme.slots.card.label}>
                Years
              </p>
              <p className={`${theme.slots.card.value} ${theme.slots.card.timeline}`}>
                {data.timeline}
              </p>
              <p className={theme.slots.card.label}>
                Role
              </p>
              <p className={theme.slots.card.value}>{data.role}</p>
              <p className={theme.slots.card.label}>
                Scope
              </p>
              <div className={theme.slots.card.toolsWrap}>
                {data.tools.map((tool) => (
                  <Badge key={tool} variant="secondary">
                    {tool}
                  </Badge>
                ))}
              </div>
              <p className="py-3 text-muted-foreground md:border-b-0">Team</p>
              <p className="py-3">{data.team}</p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
