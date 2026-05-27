import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

const homeContentByLocale = {
  en: {
    heroBadge: "Staff product design",
    heroTitle:
      "I'm Mathias, and I design products, systems, and the path to get them right.",
    workExperienceText: {
      beforeShopify:
        "My experience spans both B2C and B2B, from large-scale consumer products at",
      beforePatch: "to climate infrastructure software at",
      beforeShopPay: ". From 2017–2021, I worked on",
      beforeShopApp: "and the",
      beforeAIServices:
        "across checkout and buyer experiences; in 2021, I joined Patch to design environmental impact infrastructure software as the company grew from startup to scale-up and evolved toward",
      afterAIServices: ".",
    },
    aboutEyebrow: "About",
    aboutLead:
      "I'm a designer who thrives in 0-to-1 work, ambiguous challenges, and steep learning curves. I adapt quickly to the realities of each project, work in a structured and intentional way, and embrace new tools and technologies, including AI, to help teams move faster and make better decisions.",
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
    heroBadge: "Staff product design",
    heroTitle:
      "Je suis Mathias, et je conçois des produits, des systèmes et le chemin pour les faire bien.",
    workExperienceText: {
      beforeShopify:
        "Mon parcours couvre le B2C et le B2B, des produits grand public à grande échelle chez",
      beforePatch: "aux logiciels d'infrastructure climatique chez",
      beforeShopPay: ". De 2017 à 2021, j'ai travaillé sur",
      beforeShopApp: "et l'",
      beforeAIServices:
        "sur les parcours checkout et acheteur ; en 2021, j'ai rejoint Patch pour concevoir des logiciels d'infrastructure d'impact environnemental, alors que l'entreprise passait du stade de startup à celui de scale-up et évoluait vers des",
      afterAIServices: ".",
    },
    aboutEyebrow: "À propos",
    aboutLead:
      "Je suis un designer qui s'épanouit dans le travail 0-to-1, les défis ambigus et les courbes d'apprentissage abruptes. Je m'adapte rapidement aux réalités de chaque projet, travaille de façon structurée et intentionnelle, et adopte de nouveaux outils et technologies, dont l'IA, pour aider les équipes à avancer plus vite et prendre de meilleures décisions.",
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
