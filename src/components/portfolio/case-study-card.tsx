import Link from "next/link";
import type { CaseStudyFrontmatter } from "@/lib/content/schema";
import { Badge } from "@/components/ui/badge";

type CaseStudyCardProps = {
  slug: string;
  data: CaseStudyFrontmatter;
};

export function CaseStudyCard({ slug, data }: CaseStudyCardProps) {
  return (
    <article className="border-t border-border py-12 first:border-t-0 md:py-16">
      <Link href={`/work/${slug}`} className="group block">
        <div className="grid gap-8 md:grid-cols-[1fr_2.2fr]">
          <div className="space-y-2 text-[0.78rem] font-semibold uppercase text-muted-foreground">
            <p className="font-ibm-plex-mono">{data.timeline}</p>
            <p>{String(data.order).padStart(2, "0")}</p>
          </div>
          <div>
            <h2 className="text-[clamp(2rem,5vw,4.8rem)] font-medium leading-[0.9] tracking-[-0.085em] transition-opacity group-hover:opacity-55">
              {data.title}
            </h2>
            <p className="mt-5 max-w-3xl text-[clamp(1.55rem,3.2vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.07em]">
              {data.summary}
            </p>
            <div className="mt-8 grid border-t border-border text-sm md:grid-cols-[9rem_1fr]">
              <p className="border-b border-border py-3 text-muted-foreground md:border-b-0">
                Years
              </p>
              <p className="border-b border-border py-3 font-ibm-plex-mono md:border-b-0">
                {data.timeline}
              </p>
              <p className="border-b border-border py-3 text-muted-foreground md:border-b-0">
                Role
              </p>
              <p className="border-b border-border py-3 md:border-b-0">{data.role}</p>
              <p className="border-b border-border py-3 text-muted-foreground md:border-b-0">
                Scope
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-2 border-b border-border py-3 md:border-b-0">
                {data.tools.map((tool) => (
                  <Badge key={tool} variant="secondary">
                    {tool}
                  </Badge>
                ))}
              </div>
              <p className="py-3 text-muted-foreground">Team</p>
              <p className="py-3">{data.team}</p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
