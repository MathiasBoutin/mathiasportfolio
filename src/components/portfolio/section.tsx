import { cn } from "@/lib/utils";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

type SectionProps = {
  id?: string;
  className?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
};

export function Section({ id, className, fullWidth = false, children }: SectionProps) {
  const theme = getActivePresentationTheme();

  return (
    <section id={id} className={cn(theme.slots.section.base, className)}>
      <div className={cn("w-full", fullWidth ? "" : theme.slots.section.contained)}>
        {children}
      </div>
    </section>
  );
}
