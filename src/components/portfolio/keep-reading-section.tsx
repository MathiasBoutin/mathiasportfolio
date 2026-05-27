import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCaseStudies } from "@/lib/content/work";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { localizePath } from "@/lib/i18n/routing";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { type as typeStyle } from "@/lib/typography";
import { cn } from "@/lib/utils";

type KeepReadingSectionProps = {
  slug: string;
  locale?: Locale;
};

export async function KeepReadingSection({
  slug,
  locale = DEFAULT_LOCALE,
}: KeepReadingSectionProps) {
  const caseStudies = await getCaseStudies(locale);
  const others = caseStudies.filter((study) => study.slug !== slug);

  if (others.length === 0) {
    return null;
  }

  const theme = getActivePresentationTheme();
  const keepReadingLabel = getMessages(locale).work.keepReading;

  return (
    <div className={theme.slots.caseStudyLayout.readingColumn}>
      <h2 className={theme.slots.caseStudyLayout.textH2}>{keepReadingLabel}</h2>
      <ul className="page-rails-rule-list -mx-6 md:-mx-8">
        {others.map((study) => (
          <li key={study.slug} className="page-rails-rule-row">
            <Link
              href={localizePath(`/work/${study.slug}`, locale)}
              className="group flex items-start justify-between gap-4 p-6 transition-colors duration-300 ease-out hover:bg-portfolio-surface-hover md:p-8"
            >
              <div className="min-w-0">
                <h3 className={theme.slots.home.featureHeading}>
                  {study.data.title}
                </h3>
                <p
                  className={cn(
                    typeStyle("featureBody"),
                    "mt-0.5 max-w-none text-muted-foreground/78",
                  )}
                >
                  {study.data.summary}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3 pt-0.5 md:gap-6">
                <span className={theme.slots.home.featureTimeline}>
                  {study.data.company}
                </span>
                <span className={theme.slots.home.featureTimeline}>
                  {study.data.timeline}
                </span>
                <ArrowRight
                  size={14}
                  className="shrink-0 text-muted-foreground/55 transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
