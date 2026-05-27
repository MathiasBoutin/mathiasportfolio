import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { defaultMessages } from "@/lib/i18n/messages";
import { type as typeStyle } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const theme = getActivePresentationTheme();

  return (
    <footer data-print-hide className={theme.slots.shell.footer}>
      <div className={theme.slots.shell.footerInner}>
        <p className="mx-auto normal-case text-center text-[18px] font-editorial font-light not-italic text-muted-foreground/78">
          vibecoded <em className="italic">avec amour</em> in montréal, québec, canada
        </p>
      </div>
    </footer>
  );
}
