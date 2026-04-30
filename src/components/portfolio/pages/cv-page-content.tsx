import { Section } from "@/components/portfolio/section";
import { CvContent } from "@/components/portfolio/cv-content";
import { CvPrintButton } from "@/components/portfolio/cv-print-button";
import { type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

type CvPageContentProps = {
  locale: Locale;
};

export function CvPageContent({ locale }: CvPageContentProps) {
  const cvMessages = getMessages(locale).cv;

  return (
    <Section className="pt-18 md:pt-22">
      <div className="cv-print-shell">
        <div className="mb-8">
          <CvPrintButton label={cvMessages.printButtonLabel} />
        </div>
        <CvContent mode="screen" locale={locale} />
        <style>{`
          @media print {
            *,
            *::before,
            *::after {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            [data-print-hide] {
              display: none !important;
            }

            body::before,
            body::after {
              display: none !important;
            }

            .page-rails::before,
            .page-rails::after {
              display: none !important;
            }

            :root {
              --foreground: oklch(0.24 0.012 72);
              --muted-foreground: oklch(0.58 0.01 78);
              --background: oklch(0.982 0.008 84);
              --border: oklch(0.86 0.01 80);
            }

            .cv-print-name {
              font-size: 2.4rem !important;
            }

            .cv-print-shell {
              min-height: 100vh;
              padding-inline: 18mm !important;
              background: var(--background);
            }

            main {
              padding: 0 !important;
            }

            @page {
              size: A4;
              margin: 0;
            }
          }
        `}</style>
      </div>
    </Section>
  );
}
