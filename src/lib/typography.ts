function join(...parts: (string | undefined | false)[]): string {
  return parts.filter(Boolean).join(" ");
}

/** Fixed type scale in px. Responsive pairs: `14to16`, `16to20`. */
export const typeSize = {
  10: "text-[10px]",
  12: "text-[12px]",
  14: "text-[14px]",
  16: "text-[16px]",
  20: "text-[20px]",
  24: "text-[24px]",
  32: "text-[32px]",
  40: "text-[40px]",
  56: "text-[56px]",
  "14to16": "text-[14px] md:text-[16px]",
  "16to20": "text-[16px] md:text-[20px]",
} as const;

export const typeWeight = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

export const typeLeading = {
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  relaxed: "leading-relaxed",
  displayTight: "leading-[0.9]",
  displaySnug: "leading-[0.98]",
  displayCompact: "leading-[1.02]",
  displayMedium: "leading-[1.05]",
  displayBody: "leading-[1.08]",
  displayCopy: "leading-[1.16]",
  displayQuote: "leading-[1.2]",
} as const;

export const typeTracking = {
  tightXl: "tracking-[-0.09em]",
  tightLg: "tracking-[-0.07em]",
  tightMd: "tracking-[-0.06em]",
  tightSm: "tracking-[-0.045em]",
  tight: "tracking-[-0.02em]",
  wide: "tracking-[0.01em]",
  wideMd: "tracking-[0.08em]",
  wideLg: "tracking-[0.18em]",
  wideXl: "tracking-[0.2em]",
} as const;

export const typeFont = {
  sans: "",
  editorial: "font-editorial",
  mono: "font-ibm-plex-mono",
} as const;

export const typeTrait = {
  uppercase: "uppercase",
  italic: "italic",
  textBalance: "text-balance",
  textPretty: "text-pretty",
  textCenter: "text-center",
} as const;

export type TypeSize = keyof typeof typeSize;
export type TypeWeight = keyof typeof typeWeight;
export type TypeLeading = keyof typeof typeLeading;
export type TypeTracking = keyof typeof typeTracking;
export type TypeFont = keyof typeof typeFont;
export type TypeTrait = keyof typeof typeTrait;

export type TypeClassesOptions = {
  size?: TypeSize;
  weight?: TypeWeight;
  leading?: TypeLeading;
  tracking?: TypeTracking;
  font?: TypeFont;
  traits?: TypeTrait[];
};

export function typeClasses({
  size,
  weight,
  leading,
  tracking,
  font = "sans",
  traits = [],
}: TypeClassesOptions): string {
  return join(
    size !== undefined ? typeSize[size] : undefined,
    weight ? typeWeight[weight] : undefined,
    leading ? typeLeading[leading] : undefined,
    tracking ? typeTracking[tracking] : undefined,
    font !== "sans" ? typeFont[font] : undefined,
    ...traits.map((trait) => typeTrait[trait]),
  );
}

const typographyRoles = {
  eyebrow: typeClasses({
    size: 12,
    weight: "semibold",
    font: "mono",
    traits: ["uppercase"],
  }),
  label: typeClasses({ size: 12, weight: "semibold", traits: ["uppercase"] }),
  badge: typeClasses({ size: 12, weight: "semibold", traits: ["uppercase"] }),
  badgeProminent: typeClasses({
    size: 10,
    weight: "bold",
    tracking: "wideMd",
    traits: ["uppercase"],
  }),
  navBrand: typeClasses({ size: 12, weight: "semibold", tracking: "tight" }),
  navLink: typeClasses({ size: 12, weight: "medium", tracking: "wide" }),
  shellMeta: typeClasses({
    size: 12,
    weight: "medium",
    traits: ["uppercase"],
  }),
  bodySm: typeClasses({ size: "14to16", leading: "relaxed" }),
  headingSm: typeClasses({ size: "14to16", weight: "semibold" }),
  bodyMd: typeClasses({
    size: "16to20",
    leading: "relaxed",
    tracking: "tight",
  }),
  displayHero: typeClasses({
    size: 56,
    weight: "normal",
    leading: "none",
    tracking: "tightMd",
    traits: ["textBalance"],
  }),
  displayPage: typeClasses({
    size: 56,
    weight: "medium",
    leading: "displayTight",
    tracking: "tightXl",
    traits: ["textBalance"],
  }),
  displayPageDescription: typeClasses({
    size: 20,
    weight: "medium",
    leading: "displayMedium",
    tracking: "tightSm",
    traits: ["textPretty"],
  }),
  displayCardTitle: typeClasses({
    size: 40,
    weight: "medium",
    leading: "displayTight",
    tracking: "tightLg",
  }),
  displayCardSummary: typeClasses({
    size: 20,
    weight: "medium",
    leading: "displayCompact",
    tracking: "tightLg",
  }),
  aboutLead: typeClasses({
    size: 40,
    weight: "medium",
    leading: "displaySnug",
    tracking: "tightLg",
  }),
  aboutBody: typeClasses({
    size: 20,
    weight: "medium",
    leading: "displayBody",
    tracking: "tightSm",
  }),
  pullQuote: typeClasses({
    size: 20,
    font: "editorial",
    leading: "displayQuote",
    tracking: "tight",
    traits: ["italic"],
  }),
  caption: typeClasses({ size: 12, weight: "medium" }),
  desktopMockCaption: typeClasses({
    size: 16,
    weight: "normal",
    leading: "snug",
    traits: ["textCenter"],
  }),
  featureEyebrow: typeClasses({
    size: 10,
    weight: "semibold",
    tracking: "wideXl",
    traits: ["uppercase"],
  }),
  featureTimeline: typeClasses({
    size: 10,
    weight: "semibold",
    font: "mono",
    tracking: "wideLg",
    traits: ["uppercase"],
  }),
  featureHeading: typeClasses({
    size: 16,
    weight: "medium",
    leading: "none",
    tracking: "tightSm",
  }),
  featureBody: typeClasses({
    size: 14,
    weight: "normal",
    leading: "snug",
    tracking: "tight",
  }),
  mdxH2: typeClasses({
    size: 32,
    weight: "medium",
    leading: "none",
    tracking: "tightLg",
  }),
  mdxH3: typeClasses({
    size: 24,
    weight: "medium",
    tracking: "tightSm",
  }),
  mdxBody: typeClasses({
    size: 20,
    weight: "medium",
    leading: "displayCopy",
    tracking: "tightSm",
    traits: ["textPretty"],
  }),
  mdxList: typeClasses({
    size: 16,
    weight: "medium",
    leading: "tight",
    tracking: "tightSm",
  }),
  mdxQuote: typeClasses({
    size: 20,
    weight: "medium",
    leading: "tight",
    tracking: "tight",
    traits: ["italic"],
  }),
  detailValueLarge: typeClasses({
    size: 32,
    weight: "medium",
    leading: "displayCompact",
    tracking: "tightLg",
  }),
  cvName: typeClasses({
    size: 40,
    weight: "semibold",
    leading: "none",
  }),
  popoverTitle: typeClasses({
    size: 14,
    weight: "medium",
    leading: "tight",
    tracking: "tight",
  }),
  popoverMeta: typeClasses({
    size: 12,
    weight: "medium",
    tracking: "wide",
  }),
  popoverBody: typeClasses({
    size: 14,
    weight: "normal",
    leading: "snug",
    tracking: "tight",
  }),
  buttonLabel: typeClasses({
    size: 12,
    weight: "semibold",
    traits: ["uppercase"],
  }),
  toggleLabel: typeClasses({
    size: 10,
    weight: "semibold",
    tracking: "wideMd",
    traits: ["uppercase"],
  }),
} as const;

export type TypographyRole = keyof typeof typographyRoles;

export function type(role: TypographyRole): string {
  return typographyRoles[role];
}
