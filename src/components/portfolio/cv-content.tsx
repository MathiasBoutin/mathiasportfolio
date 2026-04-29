import { cvData } from "@/lib/cv-data";

type CvContentProps = {
  mode?: "screen" | "print";
};

export function CvContent({ mode = "screen" }: CvContentProps) {
  const isPrint = mode === "print";

  return (
    <div className={isPrint ? "space-y-8" : "space-y-10 md:space-y-12"}>
      <div className="max-w-3xl space-y-4">
        <h1 className="cv-print-name text-[clamp(2.2rem,6vw,4.4rem)] leading-[1] font-semibold">
          {cvData.name}
        </h1>
        <p
          className={
            isPrint
              ? "text-foreground max-w-none text-sm leading-relaxed md:text-[0.98rem]"
              : "text-foreground/70 max-w-2xl text-sm leading-relaxed md:text-base"
          }
        >
          {cvData.about}
        </p>
      </div>

      <section aria-label="Timeline">
        <ol className={isPrint ? "space-y-6" : "space-y-8 md:space-y-9"}>
          {cvData.experience.map((entry) => (
            <li
              key={entry.company}
              className={
                isPrint
                  ? "grid grid-cols-[9rem_1fr] gap-2"
                  : "grid gap-2 md:grid-cols-[10rem_1fr] md:gap-8"
              }
            >
              <p className="text-muted-foreground text-[0.78rem] font-medium tracking-[0.01em] uppercase">
                {entry.tenure}
              </p>
              <article>
                <div
                  className={
                    isPrint
                      ? "flex items-baseline justify-between gap-4"
                      : "flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between md:gap-4"
                  }
                >
                  <p className="text-foreground/88 text-sm font-semibold md:text-base">
                    {entry.company}
                  </p>
                  <p
                    className={
                      isPrint
                        ? "text-foreground/70 text-sm"
                        : "text-foreground/55 text-sm md:text-right"
                    }
                  >
                    {entry.context}
                  </p>
                </div>
                <div>
                  <ul>
                    {entry.roles.map((role) => (
                      <li
                        key={role.title}
                        className="text-foreground/78 text-sm leading-relaxed md:text-base"
                      >
                        <span className="text-foreground/90 font-medium">
                          {role.title}
                        </span>
                        <span className="text-foreground/62">
                          {" "}
                          · {role.tenure}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <ul className="text-foreground/70 list-disc space-y-0.5 pl-4 text-sm leading-relaxed md:text-base">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
          {cvData.education.map((entry) => (
            <li
              key={entry.school}
              className={
                isPrint
                  ? "grid grid-cols-[9rem_1fr] gap-2"
                  : "grid gap-2 md:grid-cols-[10rem_1fr] md:gap-8"
              }
            >
              <p className="text-muted-foreground text-[0.78rem] font-medium tracking-[0.01em] uppercase">
                {entry.tenure}
              </p>
              <article>
                <p className="text-foreground/88 text-sm font-semibold md:text-base">
                  {entry.school}
                </p>
                <p className="text-foreground/78 text-sm leading-relaxed md:text-base">
                  {entry.credential}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-foreground/88 text-sm font-semibold md:text-base">
          Focus Areas
        </h2>
        <ul className="flex flex-wrap gap-2">
          {cvData.focusAreas.map((area) => (
            <li
              key={area}
              className="bg-foreground/8 text-foreground/78 rounded-[4px] px-2 py-[0.12em] text-sm md:text-base"
            >
              {area}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
