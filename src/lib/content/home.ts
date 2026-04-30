import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

const homeContentByLocale = {
  en: {
    heroBadge: "Staff product design @ Patch",
    heroTitle: "I'm Mathias, and I define, design & craft human experiences.",
    workExperienceText: {
      beforeFirstPopover: "I spent 2017-2021 at",
      betweenPopovers:
        "shaping Shop Pay and the Shop app across checkout and buyer experiences. In 2021, I joined",
      afterSecondPopover:
        "to design environmental impact infrastructure software for climate action.",
    },
    aboutEyebrow: "About",
    aboutLead:
      "I turn ambiguous product problems into clear interaction models, practical systems, and interfaces that feel resolved.",
    aboutBody:
      "My work sits between research, product strategy, interaction design, and design systems. I prefer simple ideas, careful details, and close collaboration with engineers.",
    experience: [
      {
        timeline: "Mar 2022 - Present",
        company: "Patch",
        role: "Staff Product Designer",
        summary: "Leading EAC purchasing and portfolio management.",
      },
      {
        timeline: "Jan 2018 - Mar 2022",
        company: "Shopify",
        role: "Senior Product Designer",
        summary: "Shaped Shop Pay, Shop App, and buyer-facing commerce experiences.",
      },
    ],
  },
  fr: {
    heroBadge: "Staff product design @ Patch",
    heroTitle:
      "Je suis Mathias, et je clarifie, conçois et crée des expériences humaines.",
    workExperienceText: {
      beforeFirstPopover: "De 2017 à 2021, j'étais chez",
      betweenPopovers:
        "où j'ai façonné Shop Pay et l'app Shop sur les parcours checkout et acheteur. En 2021, j'ai rejoint",
      afterSecondPopover:
        "pour concevoir des logiciels d'infrastructure d'impact environnemental au service de l'action climatique.",
    },
    aboutEyebrow: "À propos",
    aboutLead:
      "Je transforme des problèmes produits ambigus en modèles d'interaction clairs, systèmes pragmatiques et interfaces résolues.",
    aboutBody:
      "Mon travail se situe entre recherche, stratégie produit, design d'interaction et design system. Je privilégie les idées simples, le soin du détail et la collaboration étroite avec les ingénieurs.",
    experience: [
      {
        timeline: "Mars 2022 - Aujourd'hui",
        company: "Patch",
        role: "Staff Product Designer",
        summary: "Leadership sur l'achat EAC et la gestion de portefeuille.",
      },
      {
        timeline: "Jan 2018 - Mars 2022",
        company: "Shopify",
        role: "Senior Product Designer",
        summary: "Conception de Shop Pay, Shop App et parcours commerce côté acheteur.",
      },
    ],
  },
} as const satisfies Record<Locale, unknown>;

export type HomeContent = (typeof homeContentByLocale)[Locale];

export function getHomeContent(locale: Locale = DEFAULT_LOCALE): HomeContent {
  return homeContentByLocale[locale];
}
