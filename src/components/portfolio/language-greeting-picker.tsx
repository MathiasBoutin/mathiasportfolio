import { cn } from "@/lib/utils";

type LanguageGreetingPickerProps = {
  locale?: string;
  englishGreeting: string;
  frenchGreeting: string;
  ariaLabel?: string;
  className?: string;
};

export function LanguageGreetingPicker({
  englishGreeting,
  frenchGreeting,
  className,
}: LanguageGreetingPickerProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span>{frenchGreeting}</span>
      <span aria-hidden>/</span>
      <span>{englishGreeting}</span>
    </span>
  );
}
