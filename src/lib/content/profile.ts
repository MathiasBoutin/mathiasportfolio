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
  fr: {
    about: `---
title: "À propos"
summary: "Parcours, valeurs et façon de travailler."
updatedAt: "2026-04-30"
---

Je suis designer UX et produit, et j'aide les équipes à rendre des produits complexes plus clairs et plus simples à utiliser.

Ma pratique combine recherche utilisateur, architecture de l'information et prototypage pragmatique. Je privilégie des résultats mesurables et significatifs pour les utilisateurs.

J'aime collaborer de près avec les product managers et les ingénieurs, avec des points de synchronisation fréquents pour limiter le rework et garder des décisions traçables.
`,
    cv: `---
title: "Curriculum Vitae"
summary: "Expérience, formation et compétences."
updatedAt: "2026-04-30"
---

## Experience

### Senior Product Designer, Acme (2022-aujourd'hui)

- Pilotage de redesigns complets sur des produits checkout et reporting.
- Collaboration avec l'engineering pour livrer des améliorations UX testées.
- Mise en place de patterns de design réutilisables.

### Product Designer, North Studio (2019-2022)

- Livraison d'expériences produit web et mobile responsive.
- Amélioration de l'architecture de navigation et des parcours de conversion.

## Formation

- Baccalauréat en design

## Compétences clés

- Recherche UX
- Stratégie produit
- Design d'interaction
- Architecture de l'information
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
