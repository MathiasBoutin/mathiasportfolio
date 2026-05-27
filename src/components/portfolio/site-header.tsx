import { siteConfig } from "@/lib/site-config";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { type as typeStyle } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { SiteHeaderBrand } from "@/components/portfolio/site-header-brand";
import { SiteHeaderScrollFrame } from "@/components/portfolio/site-header-scroll-frame";
import { defaultMessages } from "@/lib/i18n/messages";

function ExternalLinkIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="inline-block shrink-0"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 13C12.5523 13 13 12.5523 13 12V3C13 2.44771 12.5523 2 12 2H3C2.44771 2 2 2.44771 2 3V6.5C2 6.77614 2.22386 7 2.5 7C2.77614 7 3 6.77614 3 6.5V3H12V12H8.5C8.22386 12 8 12.2239 8 12.5C8 12.7761 8.22386 13 8.5 13H12ZM9 6.5C9 6.5001 9 6.50021 9 6.50031V6.50035V9.5C9 9.77614 8.77614 10 8.5 10C8.22386 10 8 9.77614 8 9.5V7.70711L2.85355 12.8536C2.65829 13.0488 2.34171 13.0488 2.14645 12.8536C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L7.29289 7H5.5C5.22386 7 5 6.77614 5 6.5C5 6.22386 5.22386 6 5.5 6H8.5C8.56779 6 8.63244 6.01349 8.69139 6.03794C8.74949 6.06198 8.80398 6.09744 8.85143 6.14433C8.94251 6.23434 8.9992 6.35909 8.99999 6.49708L8.99999 6.49738"
        fill="currentColor"
      />
    </svg>
  );
}

export function SiteHeader() {
  const theme = getActivePresentationTheme();
  const navLabels = defaultMessages.site.nav;

  return (
    <SiteHeaderScrollFrame className={theme.slots.shell.header}>
      <div className={`${theme.slots.shell.headerInner} gap-6`}>
        <SiteHeaderBrand />
        <nav aria-label="Primary" className="ml-auto">
          <ul
            className={cn(
              "flex items-center gap-3 md:gap-5",
              theme.slots.shell.navText,
              typeStyle("navLink"),
            )}
          >

            <li>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
              >
                {navLabels.email}
                <ExternalLinkIcon />
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
              >
                {navLabels.connect}
                <ExternalLinkIcon />
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </SiteHeaderScrollFrame>
  );
}
