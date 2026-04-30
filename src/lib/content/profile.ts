import { cache } from "react";
import { getMdxFilesFromSources } from "@/lib/content/mdx";
import { profileSchema } from "@/lib/content/schema";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

const profileSourcesByLocale: Record<Locale, Record<string, string>> = {
  en: {
    about: `---
title: "About"
summary: "Background, values, and how I work."
updatedAt: "2026-04-27"
---

I am a UX and product designer focused on helping teams make complex products easier to understand and use.

My practice combines user research, information architecture, and pragmatic prototyping. I care about outcomes that are both measurable and meaningful to users.

I enjoy working in close collaboration with product managers and engineers, with frequent checkpoints to reduce rework and keep decisions traceable.
`,
    cv: `---
title: "Curriculum Vitae"
summary: "Experience, education, and skills."
updatedAt: "2026-04-27"
---

## Experience

### Senior Product Designer, Acme (2022-present)

- Led end-to-end redesigns for checkout and reporting products.
- Partnered with engineering to launch tested UX improvements.
- Established reusable product design patterns.

### Product Designer, North Studio (2019-2022)

- Delivered responsive web and mobile product experiences.
- Improved navigation architecture and conversion journeys.

## Education

- Bachelor in Design

## Core Skills

- UX research
- Product strategy
- Interaction design
- Information architecture
- Design systems
`,
  },
};

export const getProfileDocument = cache(async (slug: string, locale: Locale = DEFAULT_LOCALE) => {
  const docs = getMdxFilesFromSources({
    sources: profileSourcesByLocale[locale],
    parse: (input) => profileSchema.parse(input),
  });

  return docs.find((doc) => doc.slug === slug);
});
