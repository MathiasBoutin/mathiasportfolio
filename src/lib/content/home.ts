import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

const homeContentByLocale = {
  en: {
  heroBadge: "Staff product design @ Patch",
  heroTitle: "Bonjour/hi! I'm Mathias, and I define, design & craft human experiences.",
  workExperienceBlurb:
    "I was at Shopify from 2017 to 2021, building Shop Pay and the Shop app, before moving to Patch in 2021 to design EAC infrastructure software to fight climate chanage",
  aboutEyebrow: "About",
  aboutLead: "I turn ambiguous product problems into clear interaction models, practical systems, and interfaces that feel resolved.",
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
} as const satisfies Record<Locale, unknown>;

export type HomeContent = (typeof homeContentByLocale)[Locale];

export function getHomeContent(locale: Locale = DEFAULT_LOCALE): HomeContent {
  return homeContentByLocale[locale];
}
