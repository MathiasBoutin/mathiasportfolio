import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

export type CvRole = {
  title: string;
  tenure: string;
};

export type CvExperienceEntry = {
  company: string;
  context: string;
  tenure: string;
  roles: CvRole[];
  highlights: string[];
};

export type CvEducationEntry = {
  school: string;
  credential: string;
  tenure: string;
};

export type CvData = {
  name: string;
  about: string;
  experience: CvExperienceEntry[];
  education: CvEducationEntry[];
  focusAreas: string[];
};

const cvDataByLocale: Record<Locale, CvData> = {
  en: {
    name: "Mathias Boutin",
    about:
      "I design products across high-complexity environments, from consumer checkout experiences to environmental impact infrastructure. My work sits at the intersection of product strategy, interaction design, and systems thinking, with a focus on helping teams ship practical value while preserving long-term coherence.",
    experience: [
      {
        company: "Patch",
        context: "Montreal, remote",
        tenure: "2022 - Present",
        roles: [
          {
            title: "Staff Product Designer",
            tenure: "2025 - Present",
          },
        ],
        highlights: [
          "Promoted from Senior Product Designer (2022-2025).",
          "Led product design for environmental impact infrastructure, including EAC purchasing and portfolio management workflows.",
          "Shaped end-to-end platform experiences with design systems and product strategy alignment across teams.",
        ],
      },
      {
        company: "Shopify",
        context: "Montreal, hybrid",
        tenure: "2018 - 2022",
        roles: [
          {
            title: "Senior Product Designer",
            tenure: "2020 - 2022",
          },
        ],
        highlights: [
          "Promoted from Product Designer midway through tenure.",
          "Shaped Shop Pay and Shop app experiences across checkout and buyer-facing commerce flows.",
          "Delivered consumer-facing product improvements at scale in close partnership with product and engineering.",
        ],
      },
    ],
    education: [
      {
        school: "HEC Montreal",
        credential: "Master's degree, User Experience in a Business Context",
        tenure: "2017 - 2018",
      },
      {
        school: "Universite de Montreal",
        credential: "Bachelor's degree, International/Global Studies",
        tenure: "2014 - 2017",
      },
    ],
    focusAreas: [
      "Product strategy",
      "Interaction design",
      "Systems thinking",
      "Design systems",
      "AI/product workflows",
      "Climate and environmental impact infrastructure",
    ],
  },
  fr: {
    name: "Mathias Boutin",
    about:
      "Je conçois des produits dans des environnements de forte complexité, des parcours checkout grand public aux infrastructures d'impact environnemental. Mon travail se situe au croisement de la stratégie produit, du design d'interaction et de la pensée systémique, avec un focus sur la valeur livrée sans perdre la cohérence long terme.",
    experience: [
      {
        company: "Patch",
        context: "Montreal, remote",
        tenure: "2022 - Aujourd'hui",
        roles: [
          {
            title: "Staff Product Designer",
            tenure: "2025 - Aujourd'hui",
          },
        ],
        highlights: [
          "Promotion depuis Senior Product Designer (2022-2025).",
          "Pilotage du design produit pour l'infrastructure d'impact environnemental, incluant achats EAC et gestion de portefeuille.",
          "Conception d'expériences plateforme de bout en bout avec alignement design system et stratégie produit entre équipes.",
        ],
      },
      {
        company: "Shopify",
        context: "Montréal, hybride",
        tenure: "2018 - 2022",
        roles: [
          {
            title: "Senior Product Designer",
            tenure: "2020 - 2022",
          },
        ],
        highlights: [
          "Promotion depuis Product Designer en cours de mandat.",
          "Conception de parcours Shop Pay et Shop app sur les expériences commerce côté acheteur.",
          "Livraison d'améliorations produit grand public à grande échelle en partenariat étroit avec produit et engineering.",
        ],
      },
    ],
    education: [
      {
        school: "HEC Montréal",
        credential: "Maîtrise, UX en contexte d'affaires",
        tenure: "2017 - 2018",
      },
      {
        school: "Université de Montréal",
        credential: "Baccalauréat, Études internationales",
        tenure: "2014 - 2017",
      },
    ],
    focusAreas: [
      "Stratégie produit",
      "Design d'interaction",
      "Pensée systémique",
      "Design systems",
      "Workflows IA / produit",
      "Infrastructure climat et impact environnemental",
    ],
  },
};

export function getCvData(locale: Locale = DEFAULT_LOCALE): CvData {
  return cvDataByLocale[locale];
}
