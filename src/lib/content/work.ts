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
};

const patchSourcingProblemBlock = `## The problem

The Patch sourcing product had two audiences with opposite needs. Climate experts running diligence on every dimension of a project. Buyers watching that work, needing to trust the recommendation at the end. One surface, two mental models.

That held when supply was a curated catalog of about 200 [ICROA]-endorsed projects. By late 2024, buyers wanted to see the whole market to feel confident in what they were buying, and the data set grew past 25,000 projects across every endorsed [registry]. The old surface couldn't hold it.

A curated catalog and a queryable [VCM] are different products. The work of the next year was figuring out how to ship the second one without compromising either audience.`;

const patchSourcingBlocks: Record<Locale, CaseStudyBlock[]> = {
  en: [
    {
      type: "text",
      content: patchSourcingProblemBlock,
    },
    {
      type: "desktopMock",
      src: "/images/work/patch-sourcing-portfolio-details.png",
      alt: "Patch sourcing marketplace showing expert-built portfolios and a browsable project catalog",
    },
  ],
  fr: [
    {
      type: "text",
      content: patchSourcingProblemBlock,
    },
    {
      type: "desktopMock",
      src: "/images/work/patch-sourcing-portfolio-details.png",
      alt: "Marketplace Patch sourcing avec portfolios expert et catalogue de projets consultable",
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
        summary: "Placeholder",
        role: "Lead Product Designer",
        timeline: "2024–2025",
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
        summary: "Placeholder",
        role: "Lead Product Designer",
        timeline: "2024–2025",
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
