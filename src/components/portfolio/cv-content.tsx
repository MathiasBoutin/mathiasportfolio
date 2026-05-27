import { getCvData } from "@/lib/cv-data";
import { DefinitionPopover } from "@/components/ui/definition-popover";
import { definitionPopoverThemes } from "@/lib/definition-popover-themes";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { type as typeStyle, typeClasses } from "@/lib/typography";
import { cn } from "@/lib/utils";

type CvContentProps = {
  mode?: "screen" | "print";
  locale?: Locale;
};

export function CvContent({ mode = "screen", locale = DEFAULT_LOCALE }: CvContentProps) {
  const isPrint = mode === "print";
  const cvData = getCvData(locale);
  const messages = getMessages(locale);
  const cvMessages = messages.cv;
  const homeMessages = messages.home;

  const renderCompany = (company: string) => {
    if (isPrint) {
      return company;
    }

    const normalizedCompany = company.toLowerCase();

    if (normalizedCompany === "patch") {
      return (
        <DefinitionPopover
          term={homeMessages.popovers.patch.term}
          pronunciation={homeMessages.popovers.patch.pronunciation}
          definition={homeMessages.popovers.patch.definition}
          learnMoreHref={homeMessages.popovers.patch.learnMoreHref}
          learnMoreLabel={homeMessages.popovers.patch.learnMoreLabel}
          theme={definitionPopoverThemes.patch}
        />
      );
    }

    if (normalizedCompany === "shopify") {
      return (
        <DefinitionPopover
          term={homeMessages.popovers.shopify.term}
          pronunciation={homeMessages.popovers.shopify.pronunciation}
          definition={homeMessages.popovers.shopify.definition}
          learnMoreHref={homeMessages.popovers.shopify.learnMoreHref}
          learnMoreLabel={homeMessages.popovers.shopify.learnMoreLabel}
          theme={definitionPopoverThemes.shopify}
        />
      );
    }

    return company;
  };

  return (
    <div className={isPrint ? "space-y-8" : "space-y-10 md:space-y-12"}>
      <div className="max-w-3xl">
        <h1 className={cn("cv-print-name", typeStyle("cvName"))}>{cvData.name}</h1>
      </div>

      <section aria-label={cvMessages.timelineAriaLabel}>
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
              <p className={cn("text-muted-foreground", typeStyle("label"))}>
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
                  <p className={cn(typeClasses({ size: "16to20", weight: "semibold", tracking: "tight", traits: ["textPretty"] }), "text-foreground/88")}>
                    {renderCompany(entry.company)}
                  </p>
                  <p
                    className={cn(
                      isPrint ? "text-foreground/70" : "text-foreground/55 md:text-right",
                      typeClasses({ size: 16, tracking: "tight" }),
                    )}
                  >
                    {entry.context}
                  </p>
                </div>
                <div>
                  <ul>
                    {entry.roles.map((role) => (
                      <li
                        key={role.title}
                        className={cn(typeClasses({ size: 16, leading: "body", tracking: "tight", traits: ["textPretty"] }), "text-foreground/78")}
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
                  <ul
                    className={cn(
                      typeClasses({ size: 16, leading: "body", tracking: "tight", traits: ["textPretty"] }),
                      "text-foreground/70 list-disc space-y-0.5 pl-4",
                    )}
                  >
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
              <p className={cn("text-muted-foreground", typeStyle("label"))}>
                {entry.tenure}
              </p>
              <article>
                <p className={cn(typeClasses({ size: "16to20", weight: "semibold", tracking: "tight", traits: ["textPretty"] }), "text-foreground/88")}>
                  {entry.school}
                </p>
                <p className={cn(typeClasses({ size: 16, leading: "body", tracking: "tight", traits: ["textPretty"] }), "text-foreground/78")}>
                  {entry.credential}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </section>

    </div>
  );
}
