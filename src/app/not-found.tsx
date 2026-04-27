import Link from "next/link";
import { Section } from "@/components/portfolio/section";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section className="pt-24">
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        The page you requested does not exist yet or may have moved.
      </p>
      <Link href="/" className={`${buttonVariants({ variant: "default" })} mt-6`}>
        Back to home
      </Link>
    </Section>
  );
}
