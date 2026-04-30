import { cache } from "react";
import { caseStudySchema } from "@/lib/content/schema";
import { getMdxFilesFromSources } from "@/lib/content/mdx";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

const caseStudySourcesByLocale: Record<Locale, Record<string, string>> = {
  en: {
    "mobile-checkout-redesign": `---
title: "Mobile Checkout Redesign"
summary: "Improved completion rate by simplifying the checkout information architecture."
role: "Lead Product Designer"
timeline: "Q1 2025"
team: "Product trio + 2 engineers"
tools:
  - "Figma"
  - "Maze"
  - "Amplitude"
topics:
  - "Checkout UX"
  - "Mobile flows"
  - "Conversion"
coverImage: "/images/work/mobile-checkout-cover.jpg"
previewMedia:
  type: "image"
  src: "/images/work/case-study-preview-placeholder.png"
  alt: "Abstract aerial landscape placeholder for Mobile Checkout Redesign."
featured: true
problem: "Mobile users dropped during payment and address entry."
outcome: "Checkout completion improved by 18%."
order: 1
---

## Context

This project addressed the highest-friction mobile flow in the product. We focused on reducing cognitive load while preserving user confidence.

## Process

- Audited event funnels and session recordings to identify drop-off moments.
- Ran five moderated usability sessions on the existing flow.
- Prototyped and tested two checkout structures before shipping.

## Outcome

The released design reduced average checkout time and improved completion rate by 18% across the first month.

## Reflection

The largest impact came from content clarity and progressive disclosure, not from adding new interface elements.
`,
    "analytics-dashboard-unification": `---
title: "Analytics Dashboard Unification"
summary: "Consolidated fragmented reporting into one dashboard for product and operations teams."
role: "Senior Product Designer"
timeline: "Q3 2024"
team: "Design, PM, data analyst, 3 engineers"
tools:
  - "Figma"
  - "Looker"
  - "Hotjar"
topics:
  - "Analytics"
  - "Dashboards"
  - "Decision systems"
coverImage: "/images/work/analytics-dashboard-cover.jpg"
previewMedia:
  type: "image"
  src: "/images/work/case-study-preview-placeholder.png"
  alt: "Abstract aerial landscape placeholder for Analytics Dashboard Unification."
featured: true
problem: "Stakeholders relied on disconnected reports that were hard to trust."
outcome: "Weekly reporting prep dropped from 4 hours to 45 minutes."
order: 2
---

## Context

Multiple teams were stitching data from different sources, creating decision latency and inconsistency.

## Process

- Mapped stakeholder decisions to identify core metrics.
- Created a hierarchy model to separate overview health metrics from deep dives.
- Iterated quickly with engineering on feasible chart components.

## Outcome

The unified dashboard became the default source for weekly decision meetings and reduced reporting overhead significantly.

## Reflection

Shared metric definitions matter as much as visual consistency in analytics products.
`,
  },
  fr: {
    "mobile-checkout-redesign": `---
title: "Refonte du checkout mobile"
summary: "Hausse du taux de complétion grâce à une architecture d'information simplifiée."
role: "Lead Product Designer"
timeline: "T1 2025"
team: "Trio produit + 2 ingénieurs"
tools:
  - "Figma"
  - "Maze"
  - "Amplitude"
topics:
  - "UX checkout"
  - "Parcours mobile"
  - "Conversion"
coverImage: "/images/work/mobile-checkout-cover.jpg"
previewMedia:
  type: "image"
  src: "/images/work/case-study-preview-placeholder.png"
  alt: "Paysage aérien abstrait pour la refonte du checkout mobile."
featured: true
problem: "Les utilisateurs mobiles abandonnaient lors de la saisie paiement et adresse."
outcome: "Le taux de complétion checkout a augmenté de 18%."
order: 1
---

## Contexte

Ce projet traitait le parcours mobile le plus frictionnel du produit. Nous avons travaillé à réduire la charge cognitive tout en maintenant la confiance utilisateur.

## Démarche

- Audit des funnels events et enregistrements de session pour identifier les points de chute.
- Cinq tests utilisateurs modérés sur le flux existant.
- Prototypage et test de deux structures checkout avant la mise en production.

## Résultat

Le design mis en production a réduit le temps moyen de checkout et augmenté le taux de complétion de 18% sur le premier mois.

## Rétrospective

Le principal gain venait de la clarté du contenu et de la divulgation progressive, pas d'un ajout d'éléments d'interface.
`,
    "analytics-dashboard-unification": `---
title: "Unification du dashboard analytique"
summary: "Consolidation de rapports fragmentés dans un dashboard unique pour les équipes produit et opérations."
role: "Senior Product Designer"
timeline: "T3 2024"
team: "Design, PM, data analyst, 3 ingénieurs"
tools:
  - "Figma"
  - "Looker"
  - "Hotjar"
topics:
  - "Analytique"
  - "Dashboards"
  - "Systèmes de décision"
coverImage: "/images/work/analytics-dashboard-cover.jpg"
previewMedia:
  type: "image"
  src: "/images/work/case-study-preview-placeholder.png"
  alt: "Paysage aérien abstrait pour l'unification du dashboard analytique."
featured: true
problem: "Les parties prenantes s'appuyaient sur des rapports déconnectés difficiles à fiabiliser."
outcome: "La préparation du reporting hebdo est passée de 4h à 45min."
order: 2
---

## Contexte

Plusieurs équipes recoupaient des données de sources différents, ce qui créait de la latence décisionnelle et de l'incohérence.

## Démarche

- Cartographie des décisions stakeholders pour isoler les métriques clés.
- Création d'un modèle hiérarchique séparant métriques de santé globale et analyses détaillées.
- Itération rapide avec l'engineering sur des composants de visualisation réalistes.

## Résultat

Le dashboard unifié est devenu la source par défaut des revues hebdomadaires et a fortement réduit le temps de préparation.

## Rétrospective

Des définitions de métriques partagées comptent autant que la cohérence visuelle dans les produits analytiques.
`,
  },
};

export const getCaseStudies = cache(async (locale: Locale = DEFAULT_LOCALE) => {
  const projects = getMdxFilesFromSources({
    sources: caseStudySourcesByLocale[locale],
    parse: (input) => caseStudySchema.parse(input),
  });

  return projects.sort((a, b) => a.data.order - b.data.order);
});

export const getFeaturedCaseStudies = cache(async (locale: Locale = DEFAULT_LOCALE) => {
  const projects = await getCaseStudies(locale);
  return projects.filter((project) => project.data.featured);
});

export const getCaseStudyBySlug = cache(
  async (slug: string, locale: Locale = DEFAULT_LOCALE) => {
    const projects = await getCaseStudies(locale);
    return projects.find((project) => project.slug === slug);
  },
);
