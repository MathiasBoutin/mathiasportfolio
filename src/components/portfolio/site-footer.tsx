import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { defaultMessages } from "@/lib/i18n/messages";
import { type as typeStyle } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const theme = getActivePresentationTheme();

  return (
    <footer data-print-hide className={theme.slots.shell.footer}>
      <div className={theme.slots.shell.footerInner}>
        <p className={cn("mx-auto text-center text-muted-foreground/78", typeStyle("shellMeta"))}>
          {defaultMessages.shell.footerLocation}
        </p>
      </div>
    </footer>
  );
}
