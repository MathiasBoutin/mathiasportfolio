import Link from "next/link";
import { Section } from "@/components/portfolio/section";
import { buttonVariants } from "@/components/ui/button";
import { defaultMessages } from "@/lib/i18n/messages";
import { type, typeClasses } from "@/lib/typography";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <Section className="pt-24">
      <h1 className={typeClasses({ size: 32, weight: "semibold", leading: "tight" })}>
        {defaultMessages.notFound.title}
      </h1>
      <p className={cn("mt-4 max-w-xl text-muted-foreground", type("bodySm"))}>
        {defaultMessages.notFound.description}
      </p>
      <Link href="/" className={`${buttonVariants({ variant: "default" })} mt-6`}>
        {defaultMessages.notFound.backHome}
      </Link>
    </Section>
  );
}
