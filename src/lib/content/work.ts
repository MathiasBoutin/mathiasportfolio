import { cache } from "react";
import {
  type CaseStudyBlock,
  type CaseStudyFrontmatter,
  type InlineDefinition,
} from "@/lib/content/schema";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

type CaseStudyEntry = {
  slug: string;
  data: CaseStudyFrontmatter;
};

// ---------------------------------------------------------------------------
// Block definitions per case study, per locale
// ---------------------------------------------------------------------------

const patchSourcingDefinitions: Record<string, InlineDefinition> = {
  ICROA: {
    term: "ICROA",
    definition:
      "International Carbon Reduction and Offset Alliance, the standards body whose endorsement defines registry credibility",
  },
  registry: {
    term: "Registry",
    definition:
      "In the VCM context, the organizations that certify and track carbon credits (Verra, Gold Standard, Puro, etc.). Not a generic database",
  },
  VCM: {
    term: "VCM",
    definition: "Voluntary carbon market",
  },
  "I built a mock": {
    term: "I built a mock",
    title: "The aligning power of design",
    theme: "default",
    definition:
      "I reach for mocks or prototypes early if the timeline is tight, before I consider them truly \"earned,\" because they turn a vague challenge or disagreement into something real. It's much easier to align people around ideas and concepts they can see and react to than something they have to imagine. Stronger alignment, more rapidly. The risk is that a mock can also paint you into a corner — people anchor on it. So I try to be explicit that an early mock is a question, not a proposal.",
  },
  "j'ai construit une maquette": {
    term: "j'ai construit une maquette",
    title: "Le pouvoir d'alignement du design",
    theme: "default",
    definition:
      "J'utilise des maquettes ou prototypes tôt si le calendrier est serré, avant de les considérer vraiment « mérités », parce qu'ils transforment un défi vague ou un désaccord en quelque chose de concret. C'est beaucoup plus facile d'aligner les gens autour d'idées qu'ils peuvent voir et auxquelles ils peuvent réagir plutôt que quelque chose qu'ils doivent imaginer. Un alignement plus fort, plus rapidement. Le risque est qu'une maquette peut aussi vous enfermer — les gens s'y ancrent. Alors j'essaie d'être explicite : une maquette précoce est une question, pas une proposition.",
  },
};

const patchSourcingFrameBlockEn = `## The Frame

Patch's sourcing product was originally built for about 200 carbon credit projects. In late 2024 we grew that to 25,000+.

We grew it as we moved upmarket into enterprise buyers. A curated set was the one thing our most serious buyers couldn't use. A carbon purchase is often a multi-year commitment worth millions, and they have to defend it to their own leadership, where "here's everything we considered" is a more defensible decision than "here's what a vendor showed us." Enterprise buyers want to know we had the full market in view, verify it themselves, and push back if there was a project we hadn't considered. A curated catalog gave them none of that. So we went and covered the market instead.

But a searchable market is a different product than a curated catalog. Rebuilding it meant designing for two audiences at once. Climate experts need depth on every dimension of a project. Buyers need a clear path to a decision they can stand behind. One massive surface for two mental models, and that tension ran through every decision that followed.`;

const patchSourcingFrameBlockFr = `## Le cadre

Le produit sourcing de Patch a d'abord été conçu pour environ 200 projets de crédits carbone. Fin 2024, nous l'avons porté à plus de 25 000.

Cette montée en charge a accompagné notre progression vers des acheteurs enterprise. Un catalogue curaté était ce que nos acheteurs les plus exigeants ne pouvaient pas utiliser. Un achat carbone est souvent un engagement pluriannuel de plusieurs millions, et ils doivent le défendre face à leur propre direction : « voici tout ce que nous avons considéré » est une décision plus défendable que « voici ce qu'un fournisseur nous a montré ». Les acheteurs enterprise veulent savoir que nous avions tout le marché en vue, le vérifier eux-mêmes, et revenir vers nous s'il manquait un projet. Un catalogue curaté ne leur offrait rien de cela. Nous sommes donc allés couvrir le marché.

Mais un marché consultable est un produit différent d'un catalogue curaté. Le reconstruire signifiait concevoir pour deux publics à la fois. Les experts climat ont besoin de profondeur sur chaque dimension d'un projet. Les acheteurs ont besoin d'un chemin clair vers une décision qu'ils peuvent assumer. Une seule surface massive pour deux modèles mentaux — et cette tension a traversé chaque décision qui a suivi.`;

const patchSourcingBlocks: Record<Locale, CaseStudyBlock[]> = {
  en: [
    {
      type: "growthBar",
      metricLabel: "Project growth",
      rows: [
        { label: "before", value: 200, displayValue: "~200" },
        { label: "after", value: 25000, displayValue: "25,000+" },
      ],
    },
    {
      type: "text",
      content: patchSourcingFrameBlockEn,
    },
    {
      type: "desktopMock",
      src: "/images/work/patch-sourcing-portfolio-details.png",
      alt: "Patch sourcing marketplace showing expert-built portfolios and a browsable project catalog",
    },
    {
      type: "text",
      content: `## The reshape and the lever

The brief was to redesign the UI for a much larger set of data. More filters, better sorting, a way to compare projects. It was a reasonable-sounding brief, and I was fairly sure it was wrong.

The problem wasn't the interface. It was the data underneath it. Our 25,000 projects came from dozens of registries that each described projects differently — different names for the same technology, different ways of reporting the same fact, different fields entirely. And the data was missing things buyers needed to make a decision: whether a project was still issuing credits, whether we had a real line on supply, what a project might actually cost. A better UI on top of that would have been a faster way to browse an unreliable market.

So before we committed engineering time, [I built a mock] of the new sourcing platform using the real, messy data, and put it in front of customers. It worked as an argument. The gaps were obvious the moment people tried to use it — buyers couldn't tell why one project ranked above another, couldn't find the facts they cared about, didn't trust what they were seeing. That made the case for me. Instead of designing the UI, we'd stop and rebuild the data model first.

It wasn't a small call. We had one or two engineers on this, and fixing the data meant delaying the visible work everyone was expecting. But the mock made the cost of not doing it concrete, and the room aligned quickly.`,
    },
  ],
  fr: [
    {
      type: "growthBar",
      metricLabel: "Croissance des projets",
      rows: [
        { label: "avant", value: 200, displayValue: "~200" },
        { label: "après", value: 25000, displayValue: "25 000+" },
      ],
    },
    {
      type: "text",
      content: patchSourcingFrameBlockFr,
    },
    {
      type: "desktopMock",
      src: "/images/work/patch-sourcing-portfolio-details.png",
      alt: "Marketplace Patch sourcing avec portfolios expert et catalogue de projets consultable",
    },
    {
      type: "text",
      content: `## Le levier et la refonte

Le brief était de refondre l'interface pour un ensemble de données beaucoup plus large. Plus de filtres, un meilleur tri, un moyen de comparer les projets. C'était un brief qui semblait raisonnable — et j'étais assez convaincu qu'il était faux.

Le problème n'était pas l'interface. C'étaient les données en dessous. Nos 25 000 projets provenaient de dizaines de registres qui décrivaient chacun les projets différemment — des noms différents pour la même technologie, des façons différentes de rapporter le même fait, des champs complètement différents. Et il manquait aux données des informations dont les acheteurs avaient besoin pour prendre une décision : si un projet émettait encore des crédits, si nous avions un accès réel à l'offre, ce qu'un projet pourrait réellement coûter. Une meilleure interface par-dessus aurait été un moyen plus rapide de parcourir un marché peu fiable.

Alors avant d'engager du temps d'ingénierie, [j'ai construit une maquette] de la nouvelle plateforme de sourcing avec les vraies données brutes, et je l'ai mise devant les clients. Ça a fonctionné comme argument. Les lacunes étaient évidentes dès que les gens essayaient de l'utiliser — les acheteurs ne pouvaient pas comprendre pourquoi un projet était classé au-dessus d'un autre, ne trouvaient pas les faits qui les intéressaient, ne faisaient pas confiance à ce qu'ils voyaient. Ça a plaidé pour moi. Au lieu de concevoir l'interface, on allait s'arrêter et reconstruire le modèle de données d'abord.

Ce n'était pas un petit choix. Nous avions un ou deux ingénieurs là-dessus, et corriger les données signifiait retarder le travail visible que tout le monde attendait. Mais la maquette a rendu le coût de ne pas le faire concret, et la salle s'est alignée rapidement.`,
    },
  ],
};

const analyticsDashboardBlocks: Record<Locale, CaseStudyBlock[]> = {
  en: [
    {
      type: "text",
      content:
        "## Context\n\nMultiple teams were stitching data from different sources, creating decision latency and inconsistency.",
    },
    {
      type: "media",
      width: "wider",
      media: {
        type: "image",
        src: "/images/work/case-study-preview-placeholder.png",
        alt: "Dashboard unification overview",
      },
    },
    {
      type: "bigText",
      text: "From 4 hours to 45 minutes of weekly reporting prep",
    },
    {
      type: "text",
      content:
        "## Process\n\n- Mapped stakeholder decisions to identify core metrics.\n- Created a hierarchy model to separate overview health metrics from deep dives.\n- Iterated quickly with engineering on feasible chart components.",
    },
    {
      type: "text",
      content:
        "## Outcome\n\nThe unified dashboard became the default source for weekly decision meetings and reduced reporting overhead significantly.",
    },
    {
      type: "text",
      content:
        "## Reflection\n\nShared metric definitions matter as much as visual consistency in analytics products.",
    },
    {
      type: "media",
      width: "same",
      media: {
        type: "image",
        src: "/images/work/case-study-preview-placeholder.png",
        alt: "Unified dashboard overview",
        caption: "The unified dashboard at reading-column width.",
      },
    },
  ],
  fr: [
    {
      type: "text",
      content:
        "## Contexte\n\nPlusieurs équipes recoupaient des données de sources différents, ce qui créait de la latence décisionnelle et de l'incohérence.",
    },
    {
      type: "media",
      width: "wider",
      media: {
        type: "image",
        src: "/images/work/case-study-preview-placeholder.png",
        alt: "Aperçu de l'unification du dashboard",
      },
    },
    {
      type: "bigText",
      text: "De 4 heures à 45 minutes de préparation du reporting hebdo",
    },
    {
      type: "text",
      content:
        "## Démarche\n\n- Cartographie des décisions stakeholders pour isoler les métriques clés.\n- Création d'un modèle hiérarchique séparant métriques de santé globale et analyses détaillées.\n- Itération rapide avec l'engineering sur des composants de visualisation réalistes.",
    },
    {
      type: "text",
      content:
        "## Résultat\n\nLe dashboard unifié est devenu la source par défaut des revues hebdomadaires et a fortement réduit le temps de préparation.",
    },
    {
      type: "text",
      content:
        "## Rétrospective\n\nDes définitions de métriques partagées comptent autant que la cohérence visuelle dans les produits analytiques.",
    },
    {
      type: "media",
      width: "same",
      media: {
        type: "image",
        src: "/images/work/case-study-preview-placeholder.png",
        alt: "Aperçu du dashboard unifié",
        caption: "Le dashboard unifié à la largeur de la colonne de lecture.",
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Case study data (pure TypeScript — no YAML serialization needed for blocks)
// ---------------------------------------------------------------------------

const caseStudiesByLocale: Record<Locale, CaseStudyEntry[]> = {
  en: [
    {
      slug: "patch-sourcing-marketplace",
      data: {
        title: "From a curated marketplace to a transparent market (temporary)",
        summary:
          "Patch grew its sourcing data from 200 to 25,000+ carbon projects. I led the redesign that turned an unusable pile of data into a market buyers and in-house experts could both navigate.",
        company: "Patch",
        role: "Lead Product Designer",
        timeline: "Q3 2025",
        team: "Placeholder",
        tools: ["Figma"],
        topics: ["Carbon markets", "Marketplace", "Sourcing"],
        coverImage: "/images/work/case-study-preview-placeholder.png",
        previewMedia: {
          type: "image",
          src: "/images/work/case-study-preview-placeholder.png",
          alt: "Placeholder preview for Patch sourcing marketplace case study.",
        },
        featured: true,
        problem: "Placeholder",
        outcome: "Placeholder",
        order: 1,
        definitions: patchSourcingDefinitions,
        blocks: patchSourcingBlocks.en,
      },
    },
    {
      slug: "analytics-dashboard-unification",
      data: {
        title: "Analytics Dashboard Unification",
        summary:
          "Consolidated fragmented reporting into one dashboard for product and operations teams.",
        company: "Patch",
        role: "Senior Product Designer",
        timeline: "Q3 2024",
        team: "Design, PM, data analyst, 3 engineers",
        tools: ["Figma", "Looker", "Hotjar"],
        topics: ["Analytics", "Dashboards", "Decision systems"],
        coverImage: "/images/work/analytics-dashboard-cover.jpg",
        previewMedia: {
          type: "image",
          src: "/images/work/case-study-preview-placeholder.png",
          alt: "Abstract aerial landscape placeholder for Analytics Dashboard Unification.",
        },
        featured: true,
        problem: "Stakeholders relied on disconnected reports that were hard to trust.",
        outcome: "Weekly reporting prep dropped from 4 hours to 45 minutes.",
        order: 2,
        blocks: analyticsDashboardBlocks.en,
      },
    },
  ],
  fr: [
    {
      slug: "patch-sourcing-marketplace",
      data: {
        title: "D'un marché curaté à un marché transparent (temporaire)",
        summary:
          "Patch est passé de 200 à plus de 25 000 projets carbone dans ses données sourcing. J'ai mené la refonte qui a transformé une masse de données inutilisable en un marché que les acheteurs et les experts internes pouvaient tous deux parcourir.",
        company: "Patch",
        role: "Lead Product Designer",
        timeline: "T3 2025",
        team: "Placeholder",
        tools: ["Figma"],
        topics: ["Marchés carbone", "Marketplace", "Sourcing"],
        coverImage: "/images/work/case-study-preview-placeholder.png",
        previewMedia: {
          type: "image",
          src: "/images/work/case-study-preview-placeholder.png",
          alt: "Aperçu placeholder pour l'étude de cas Patch sourcing marketplace.",
        },
        featured: true,
        problem: "Placeholder",
        outcome: "Placeholder",
        order: 1,
        definitions: patchSourcingDefinitions,
        blocks: patchSourcingBlocks.fr,
      },
    },
    {
      slug: "analytics-dashboard-unification",
      data: {
        title: "Unification du dashboard analytique",
        summary:
          "Consolidation de rapports fragmentés dans un dashboard unique pour les équipes produit et opérations.",
        company: "Patch",
        role: "Senior Product Designer",
        timeline: "T3 2024",
        team: "Design, PM, data analyst, 3 ingénieurs",
        tools: ["Figma", "Looker", "Hotjar"],
        topics: ["Analytique", "Dashboards", "Systèmes de décision"],
        coverImage: "/images/work/analytics-dashboard-cover.jpg",
        previewMedia: {
          type: "image",
          src: "/images/work/case-study-preview-placeholder.png",
          alt: "Paysage aérien abstrait pour l'unification du dashboard analytique.",
        },
        featured: true,
        problem:
          "Les parties prenantes s'appuyaient sur des rapports déconnectés difficiles à fiabiliser.",
        outcome: "La préparation du reporting hebdo est passée de 4h à 45min.",
        order: 2,
        blocks: analyticsDashboardBlocks.fr,
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Public API (same shape as before — cached async functions)
// ---------------------------------------------------------------------------

export const getCaseStudies = cache(async (locale: Locale = DEFAULT_LOCALE) => {
  return caseStudiesByLocale[locale].sort((a, b) => a.data.order - b.data.order);
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
