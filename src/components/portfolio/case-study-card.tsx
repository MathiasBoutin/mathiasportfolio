import Link from "next/link";
import type { CaseStudyFrontmatter } from "@/lib/content/schema";
import { Badge } from "@/components/ui/badge";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { localizePath } from "@/lib/i18n/routing";

type CaseStudyCardProps = {
  slug: string;
  data: CaseStudyFrontmatter;
  locale?: Locale;
};

export function CaseStudyCard({ slug, data, locale = DEFAULT_LOCALE }: CaseStudyCardProps) {
  const theme = getActivePresentationTheme();
  const labels = getMessages(locale).work.cardLabels;

  return (
    <article className={theme.slots.card.root}>
      <Link href={localizePath(`/work/${slug}`, locale)} className="group block">
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
                {labels.years}
              </p>
              <p className={`${theme.slots.card.value} ${theme.slots.card.timeline}`}>
                {data.timeline}
              </p>
              <p className={theme.slots.card.label}>
                {labels.role}
              </p>
              <p className={theme.slots.card.value}>{data.role}</p>
              <p className={theme.slots.card.label}>
                {labels.scope}
              </p>
              <div className={theme.slots.card.toolsWrap}>
                {data.tools.map((tool) => (
                  <Badge key={tool} variant="secondary">
                    {tool}
                  </Badge>
                ))}
              </div>
              <p className="py-3 text-muted-foreground md:border-b-0">
                {labels.team}
              </p>
              <p className="py-3">{data.team}</p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
