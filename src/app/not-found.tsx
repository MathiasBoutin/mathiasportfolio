import Link from "next/link";
import { Section } from "@/components/portfolio/section";
import { buttonVariants } from "@/components/ui/button";
import { defaultMessages } from "@/lib/i18n/messages";

export default function NotFound() {
  return (
    <Section className="pt-24">
      <h1 className="text-4xl font-semibold tracking-tight">
        {defaultMessages.notFound.title}
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        {defaultMessages.notFound.description}
      </p>
      <Link href="/" className={`${buttonVariants({ variant: "default" })} mt-6`}>
        {defaultMessages.notFound.backHome}
      </Link>
    </Section>
  );
}
