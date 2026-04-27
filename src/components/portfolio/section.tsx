import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
};

export function Section({ id, className, fullWidth = false, children }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className={cn("w-full", fullWidth ? "" : "mx-auto max-w-[61rem]")}>
        {children}
      </div>
    </section>
  );
}
