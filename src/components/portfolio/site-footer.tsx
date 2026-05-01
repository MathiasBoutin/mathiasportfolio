import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { defaultMessages } from "@/lib/i18n/messages";

export function SiteFooter() {
  const theme = getActivePresentationTheme();

  return (
    <footer data-print-hide className={theme.slots.shell.footer}>
      <div className={theme.slots.shell.footerInner}>
        <p className="mx-auto text-center text-muted-foreground/78">
          {defaultMessages.shell.footerLocation}
        </p>
      </div>
    </footer>
  );
}
