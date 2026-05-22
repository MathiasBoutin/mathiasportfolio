import { type, typeClasses } from "./typography";

export const DEFAULT_PRESENTATION_THEME = "default" as const;
export const ACTIVE_PRESENTATION_THEME = DEFAULT_PRESENTATION_THEME;
export const PRESENTATION_THEME_COOKIE = "presentation-theme";

export type PresentationThemeId = "default" | "dark" | "proof";

type PresentationThemeSlots = {
  shell: {
    html: string;
    body: string;
    skipLink: string;
    pageRails: string;
    header: string;
    headerInner: string;
    footer: string;
    footerInner: string;
  };
  section: {
    base: string;
    contained: string;
  };
  pageHeader: {
    root: string;
    eyebrow: string;
    title: string;
    description: string;
  };
  home: {
    heroSection: string;
    heroTitle: string;
    aboutSection: string;
    aboutGrid: string;
    aboutEyebrow: string;
    aboutLead: string;
    aboutBody: string;
    featureRoot: string;
    featureSection: string;
    featureEyebrow: string;
    featureRow: string;
    featureTimeline: string;
    featureHeading: string;
    featureDescription: string;
    featureLinkHeading: string;
    featureLinkDescription: string;
  };
  caseStudyLayout: {
    articleStack: string;
    readingColumn: string;
    textBlock: string;
    textH2: string;
    textP: string;
    textUl: string;
    textOl: string;
    bigTextBlock: string;
    growthBarBlock: string;
    growthBarBand: string;
    growthBarInner: string;
    growthBarMetric: string;
    growthBarMetricValue: string;
    growthBarMetricUnit: string;
    growthBarMetricLabel: string;
    growthBarLabel: string;
    growthBarValue: string;
    growthBarRowHeader: string;
    growthBarRows: string;
    growthBarTickFilled: string;
    growthBarTickEmpty: string;
    growthBarTicks: string;
    growthBarTick: string;
    mediaSame: string;
    mediaWider: string;
    mediaFull: string;
    mediaBlock: string;
    mediaCaption: string;
    desktopMockOuter: string;
    desktopMockBand: string;
    desktopMockInner: string;
    desktopMockScreen: string;
    desktopMockCaption: string;
  };
  caseStudyPage: {
    headerRoot: string;
    headerDescription: string;
    tldrLead: string;
    detailValue: string;
  };
  content: {
    mdxH2: string;
    mdxH3: string;
    mdxP: string;
    mdxUl: string;
    mdxOl: string;
    mdxBlockquote: string;
    workList: string;
    borderedArticle: string;
    detailArticle: string;
    detailGrid: string;
    detailLabel: string;
    detailValue: string;
  };
  card: {
    root: string;
    grid: string;
    eyebrowWrap: string;
    timeline: string;
    title: string;
    summary: string;
    table: string;
    label: string;
    value: string;
    toolsWrap: string;
  };
  motion: {
    fadeInInitialY: number;
    fadeInDuration: number;
    fadeInEase: "easeOut";
  };
};

export type PresentationTheme = {
  id: PresentationThemeId;
  slots: PresentationThemeSlots;
};

const basePresentationThemes: Record<"default" | "proof", PresentationTheme> = {
  default: {
    id: "default",
    slots: {
      shell: {
        html: "h-full antialiased",
        body: "flex min-h-full flex-col overflow-x-clip",
        skipLink:
          "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2",
        pageRails: "page-rails mx-auto flex w-full max-w-[61rem] flex-1 flex-col px-6 md:px-8",
        header: "sticky top-0 z-40 pt-4 md:pt-5",
        headerInner:
          `mx-auto flex w-full max-w-[61rem] items-center justify-between rounded-sm border border-border bg-background/90 px-5 py-4 backdrop-blur-sm md:px-6 ${type("shellMeta")} leading-none tracking-[-0.02em] text-muted-foreground/85`,
        footer: "py-8",
        footerInner:
          `flex w-full flex-col justify-between gap-4 ${type("shellMeta")} text-muted-foreground/85 md:flex-row`,
      },
      section: {
        base: "py-16 md:py-24",
        contained: "mx-auto max-w-[61rem]",
      },
      pageHeader: {
        root: "space-y-8 pt-28 md:pt-36",
        eyebrow: `${type("eyebrow")} text-muted-foreground`,
        title: `max-w-4xl ${type("displayPage")} text-foreground`,
        description: `max-w-2xl ${type("displayPageDescription")} text-foreground`,
      },
      home: {
        heroSection: "flex min-h-screen items-center pb-20 pt-24 md:pb-24 md:pt-32",
        heroTitle: `max-w-[30ch] ${type("displayHero")} text-foreground`,
        aboutSection: "pt-4",
        aboutGrid: "grid gap-8 border-t border-border pt-12 md:grid-cols-[1fr_2.2fr]",
        aboutEyebrow: `${type("eyebrow")} text-muted-foreground`,
        aboutLead: type("aboutLead"),
        aboutBody: `max-w-2xl ${type("aboutBody")} text-foreground/80`,
        featureRoot: "mt-8 grid w-full gap-8 md:mt-9 md:gap-8",
        featureSection: "grid gap-3 md:grid-cols-[6.2rem_1fr] md:gap-6",
        featureEyebrow: `${type("featureEyebrow")} text-muted-foreground/55`,
        featureRow: "grid gap-1 md:grid-cols-[6.2rem_1fr] md:gap-6",
        featureTimeline: `${type("featureTimeline")} text-muted-foreground/55`,
        featureHeading: `${type("featureHeading")} text-foreground/82`,
        featureDescription: `mt-0.5 max-w-xl ${type("featureBody")} text-muted-foreground/78`,
        featureLinkHeading: `${type("featureHeading")} text-foreground/82 transition-opacity group-hover:opacity-55`,
        featureLinkDescription: `mt-0.5 max-w-xl ${type("featureBody")} text-muted-foreground/78 transition-colors group-hover:text-foreground/65`,
      },
      caseStudyLayout: {
        articleStack: "mt-16 flex flex-col gap-10 md:gap-12",
        readingColumn:
          "w-full mx-auto md:max-w-[var(--case-study-reading-width)]",
        textBlock: "",
        textH2: `mb-1 mt-10 ${type("headingMd")} text-foreground/88 first:mt-0`,
        textP: `mt-3 ${type("articleBody")} text-foreground/80`,
        textUl: `mt-3 list-disc space-y-1 pl-5 ${type("articleBody")} text-foreground/80`,
        textOl: `mt-3 list-decimal space-y-1 pl-5 ${type("articleBody")} text-foreground/80`,
        bigTextBlock: `border-y border-border py-8 ${type("pullQuote")} text-foreground`,
        growthBarBlock: "w-full",
        growthBarBand:
          "relative w-full overflow-hidden rounded-[16px] bg-[var(--desktop-mock-bg)] p-6 md:p-16",
        growthBarInner: "relative z-10 w-full",
        growthBarMetric: "grid gap-1",
        growthBarMetricValue: `flex items-baseline gap-1 ${type("growthBarMetricValue")} text-[var(--primary-foreground)]`,
        growthBarMetricUnit: `-translate-y-1 ${type("growthBarMetricUnit")} text-[var(--desktop-mock-caption)]`,
        growthBarMetricLabel: `${type("growthBarMetricLabel")} text-[var(--desktop-mock-caption)]`,
        growthBarLabel: `${type("growthBarRowName")} text-[var(--desktop-mock-caption)]`,
        growthBarValue: `tabular-nums ${type("growthBarRowValue")} uppercase text-[var(--primary-foreground)]`,
        growthBarRowHeader: "flex items-baseline justify-between gap-4",
        growthBarRows: "mt-8 flex flex-col gap-8",
        growthBarTickFilled: "bg-[var(--primary-foreground)]/85",
        growthBarTickEmpty: "bg-[var(--primary-foreground)]/18",
        growthBarTicks: "flex w-full justify-between",
        growthBarTick: "relative h-[30px] w-[3px] shrink-0 overflow-hidden rounded-[2px] md:w-[6px]",
        mediaSame: "w-full",
        mediaWider:
          "mx-auto w-[var(--case-study-media-wider)] min-w-full max-w-none",
        mediaFull:
          "relative left-1/2 w-screen max-w-none -translate-x-1/2",
        mediaBlock: "overflow-hidden rounded-lg",
        mediaCaption: `mt-3 ${type("caption")} text-muted-foreground`,
        desktopMockOuter:
          "relative left-1/2 w-screen -translate-x-1/2 px-6 md:px-10",
        desktopMockBand:
          "relative w-full overflow-hidden rounded-[16px] bg-[var(--desktop-mock-bg)] py-16",
        desktopMockInner: "w-full px-6 md:px-10",
        desktopMockScreen:
          "mx-auto h-auto w-full max-w-[1440px] overflow-hidden rounded-[16px]",
        desktopMockCaption: `mt-10 ${type("desktopMockCaption")} text-[var(--desktop-mock-caption)]`,
      },
      caseStudyPage: {
        headerRoot: "space-y-8",
        headerDescription: `-mt-4 ${type("articleSubtitle")} text-foreground/80`,
        tldrLead: "font-semibold uppercase",
        detailValue: `mt-2 ${type("bodyMd")} text-foreground/80`,
      },
      content: {
        mdxH2: `mt-16 border-t border-border pt-8 ${type("mdxH2")}`,
        mdxH3: `mt-10 ${type("mdxH3")}`,
        mdxP: `mt-5 ${type("articleBody")} text-foreground/85`,
        mdxUl: `mt-6 list-disc space-y-2 pl-6 ${type("articleBody")} text-foreground/85`,
        mdxOl: `mt-6 list-decimal space-y-2 pl-6 ${type("articleBody")} text-foreground/85`,
        mdxBlockquote: `mt-10 border-l border-border pl-6 ${type("mdxQuote")} text-foreground/75`,
        workList: "mt-16",
        borderedArticle: "mt-16 max-w-3xl border-t border-border pt-10",
        detailArticle: "mt-16 max-w-3xl",
        detailGrid: "mt-16 flex flex-col gap-8 border-y border-border py-8",
        detailLabel: `${type("label")} text-muted-foreground`,
        detailValue: `mt-4 ${type("detailValueLarge")}`,
      },
      card: {
        root: "border-t border-border py-12 first:border-t-0 md:py-16",
        grid: "grid gap-8 md:grid-cols-[1fr_2.2fr]",
        eyebrowWrap: `space-y-2 ${type("eyebrow")} text-muted-foreground`,
        timeline: typeClasses({ font: "mono" }),
        title: `${type("displayCardTitle")} transition-opacity group-hover:opacity-55`,
        summary: `mt-5 max-w-3xl ${type("displayCardSummary")}`,
        table: `mt-8 grid border-t border-border ${typeClasses({ size: 14 })} md:grid-cols-[9rem_1fr]`,
        label: "border-b border-border py-3 text-muted-foreground md:border-b-0",
        value: "border-b border-border py-3 md:border-b-0",
        toolsWrap: "flex flex-wrap gap-x-3 gap-y-2 border-b border-border py-3 md:border-b-0",
      },
      motion: {
        fadeInInitialY: 12,
        fadeInDuration: 0.45,
        fadeInEase: "easeOut",
      },
    },
  },
  // Internal sanity-check theme for development validation only.
  proof: {
    id: "proof",
    slots: {
      shell: {
        html: "h-full antialiased",
        body: "flex min-h-full flex-col overflow-x-clip",
        skipLink:
          "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2",
        pageRails: "page-rails mx-auto flex w-full max-w-[70rem] flex-1 flex-col px-6 md:px-10",
        header: "sticky top-0 z-40 pt-4 md:pt-5",
        headerInner:
          `mx-auto flex w-full max-w-[70rem] items-center justify-between rounded-sm border border-border bg-background/90 px-5 py-4 backdrop-blur-sm md:px-6 ${type("shellMeta")} leading-none tracking-[0.01em]`,
        footer: "py-10",
        footerInner:
          `flex w-full flex-col justify-between gap-5 ${type("shellMeta")} text-muted-foreground md:flex-row`,
      },
      section: {
        base: "py-14 md:py-20",
        contained: "mx-auto max-w-[70rem]",
      },
      pageHeader: {
        root: "space-y-8 pt-24 md:pt-32",
        eyebrow: `${type("eyebrow")} text-muted-foreground`,
        title: `max-w-5xl ${type("displayPage")} text-foreground`,
        description: `max-w-3xl ${type("displayPageDescription")} text-foreground`,
      },
      home: {
        heroSection: "flex min-h-[84vh] items-center pb-16 pt-20 md:pb-20 md:pt-28",
        heroTitle: `max-w-[36ch] ${type("displayHero")} text-foreground`,
        aboutSection: "pt-6",
        aboutGrid: "grid gap-8 border-t border-border pt-10 md:grid-cols-[12rem_1fr]",
        aboutEyebrow: `${type("eyebrow")} text-muted-foreground`,
        aboutLead: type("aboutLead"),
        aboutBody: `max-w-3xl ${type("aboutBody")} text-foreground/80`,
        featureRoot: "mt-8 grid w-full gap-8",
        featureSection: "grid gap-4 md:grid-cols-[8.5rem_1fr] md:gap-5",
        featureEyebrow: `${type("featureEyebrow")} text-muted-foreground/70`,
        featureRow: "grid gap-2 md:grid-cols-[8.5rem_1fr] md:gap-5",
        featureTimeline: `${type("featureTimeline")} text-muted-foreground/70`,
        featureHeading: `${type("featureHeading")} text-foreground/85`,
        featureDescription: `mt-1 max-w-xl ${type("featureBody")} text-muted-foreground/82`,
        featureLinkHeading: `${type("featureHeading")} text-foreground/85 transition-opacity group-hover:opacity-55`,
        featureLinkDescription: `mt-1 max-w-xl ${type("featureBody")} text-muted-foreground/82 transition-colors group-hover:text-foreground/65`,
      },
      caseStudyLayout: {
        articleStack: "mt-14 flex flex-col gap-9 md:gap-11",
        readingColumn:
          "w-full mx-auto md:max-w-[var(--case-study-reading-width)]",
        textBlock: "",
        textH2: `mb-1 mt-9 ${type("headingMd")} text-foreground/88 first:mt-0`,
        textP: `mt-3 ${type("articleBody")} text-foreground/80`,
        textUl: `mt-3 list-disc space-y-1 pl-5 ${type("articleBody")} text-foreground/80`,
        textOl: `mt-3 list-decimal space-y-1 pl-5 ${type("articleBody")} text-foreground/80`,
        bigTextBlock: `border-y border-border py-7 ${type("pullQuote")} text-foreground`,
        growthBarBlock: "w-full",
        growthBarBand:
          "relative w-full overflow-hidden rounded-[16px] bg-[var(--desktop-mock-bg)] p-6 md:p-16",
        growthBarInner: "relative z-10 w-full",
        growthBarMetric: "grid gap-1",
        growthBarMetricValue: `flex items-baseline gap-1 ${type("growthBarMetricValue")} text-[var(--primary-foreground)]`,
        growthBarMetricUnit: `-translate-y-1 ${type("growthBarMetricUnit")} text-[var(--desktop-mock-caption)]`,
        growthBarMetricLabel: `${type("growthBarMetricLabel")} text-[var(--desktop-mock-caption)]`,
        growthBarLabel: `${type("growthBarRowName")} text-[var(--desktop-mock-caption)]`,
        growthBarValue: `tabular-nums ${type("growthBarRowValue")} uppercase text-[var(--primary-foreground)]`,
        growthBarRowHeader: "flex items-baseline justify-between gap-4",
        growthBarRows: "mt-8 flex flex-col gap-8",
        growthBarTickFilled: "bg-[var(--primary-foreground)]/85",
        growthBarTickEmpty: "bg-[var(--primary-foreground)]/18",
        growthBarTicks: "flex w-full justify-between",
        growthBarTick: "relative h-[30px] w-[3px] shrink-0 overflow-hidden rounded-[2px] md:w-[6px]",
        mediaSame: "w-full",
        mediaWider:
          "mx-auto w-[var(--case-study-media-wider)] min-w-full max-w-none",
        mediaFull:
          "relative left-1/2 w-screen max-w-none -translate-x-1/2",
        mediaBlock: "overflow-hidden rounded-md",
        mediaCaption: `mt-2 ${type("caption")} text-muted-foreground`,
        desktopMockOuter:
          "relative left-1/2 w-screen -translate-x-1/2 px-6 md:px-10",
        desktopMockBand:
          "relative w-full overflow-hidden rounded-[16px] bg-[var(--desktop-mock-bg)] py-16",
        desktopMockInner: "w-full px-6 md:px-10",
        desktopMockScreen:
          "mx-auto h-auto w-full max-w-[1440px] overflow-hidden rounded-[16px]",
        desktopMockCaption: `mt-10 ${type("desktopMockCaption")} text-[var(--desktop-mock-caption)]`,
      },
      caseStudyPage: {
        headerRoot: "space-y-8",
        headerDescription: `-mt-4 ${type("articleSubtitle")} text-foreground/80`,
        tldrLead: "font-semibold uppercase",
        detailValue: `mt-2 ${type("bodyMd")} text-foreground/82`,
      },
      content: {
        mdxH2: `mt-16 border-t border-border pt-8 ${type("mdxH2")}`,
        mdxH3: `mt-10 ${type("mdxH3")}`,
        mdxP: `mt-5 ${type("articleBody")} text-foreground/86`,
        mdxUl: `mt-6 list-disc space-y-2 pl-6 ${type("articleBody")} text-foreground/86`,
        mdxOl: `mt-6 list-decimal space-y-2 pl-6 ${type("articleBody")} text-foreground/86`,
        mdxBlockquote: `mt-10 border-l border-border pl-6 ${type("mdxQuote")} text-foreground/75`,
        workList: "mt-14",
        borderedArticle: "mt-14 max-w-4xl border-t border-border pt-8",
        detailArticle: "mt-14 max-w-4xl",
        detailGrid: "mt-14 flex flex-col gap-7 border-y border-border py-8",
        detailLabel: `${type("label")} text-muted-foreground`,
        detailValue: `mt-3 ${type("detailValueLarge")}`,
      },
      card: {
        root: "border-t border-border py-11 first:border-t-0 md:py-14",
        grid: "grid gap-8 md:grid-cols-[12rem_1fr]",
        eyebrowWrap: `space-y-2 ${type("eyebrow")} text-muted-foreground`,
        timeline: typeClasses({ font: "mono" }),
        title: `${type("displayCardTitle")} transition-opacity group-hover:opacity-55`,
        summary: `mt-4 max-w-3xl ${type("displayCardSummary")}`,
        table: `mt-7 grid border-t border-border ${typeClasses({ size: 14 })} md:grid-cols-[10rem_1fr]`,
        label: "border-b border-border py-3 text-muted-foreground md:border-b-0",
        value: "border-b border-border py-3 md:border-b-0",
        toolsWrap: "flex flex-wrap gap-x-3 gap-y-2 border-b border-border py-3 md:border-b-0",
      },
      motion: {
        fadeInInitialY: 8,
        fadeInDuration: 0.35,
        fadeInEase: "easeOut",
      },
    },
  },
};

export const presentationThemes: Record<PresentationThemeId, PresentationTheme> = {
  ...basePresentationThemes,
  dark: {
    id: "dark",
    slots: basePresentationThemes.default.slots,
  },
};

export function getPresentationTheme(themeId: PresentationThemeId = DEFAULT_PRESENTATION_THEME) {
  return presentationThemes[themeId];
}

export function getActivePresentationTheme() {
  return getPresentationTheme(ACTIVE_PRESENTATION_THEME);
}

export function resolvePresentationThemeId(themeId: string | undefined): PresentationThemeId {
  if (themeId === "dark") {
    return themeId;
  }

  return DEFAULT_PRESENTATION_THEME;
}
