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
        body: "flex min-h-full flex-col",
        skipLink:
          "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2",
        pageRails: "page-rails mx-auto flex w-full max-w-[61rem] flex-1 flex-col px-6 md:px-8",
        header: "sticky top-0 z-40",
        headerInner:
          "mx-auto flex w-full max-w-[61rem] items-center justify-between py-7 text-[0.78rem] font-semibold uppercase leading-none tracking-[-0.02em]",
        footer: "py-8",
        footerInner:
          "flex w-full flex-col justify-between gap-4 text-[0.78rem] font-semibold uppercase text-muted-foreground md:flex-row",
      },
      section: {
        base: "py-16 md:py-24",
        contained: "mx-auto max-w-[61rem]",
      },
      pageHeader: {
        root: "space-y-8 pt-28 md:pt-36",
        eyebrow: "font-ibm-plex-mono text-[0.78rem] font-semibold uppercase text-muted-foreground",
        title: "max-w-4xl text-balance text-[clamp(3.25rem,9vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.09em]",
        description:
          "max-w-2xl text-pretty text-[clamp(1.35rem,3vw,2.25rem)] font-medium leading-[1.05] tracking-[-0.055em] text-foreground",
      },
      home: {
        heroSection: "flex min-h-screen items-center pb-20 pt-24 md:pb-24 md:pt-32",
        heroTitle:
          "max-w-[30ch] text-balance text-[clamp(2rem,3.6vw,3.15rem)] font-semibold leading-[1.04] tracking-[-0.06em] text-foreground",
        aboutSection: "pt-4",
        aboutGrid: "grid gap-8 border-t border-border pt-12 md:grid-cols-[1fr_2.2fr]",
        aboutEyebrow: "text-[0.78rem] font-semibold uppercase text-muted-foreground",
        aboutLead: "text-[clamp(1.9rem,4vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.085em]",
        aboutBody:
          "max-w-2xl text-[clamp(1.25rem,2.2vw,2rem)] font-medium leading-[1.08] tracking-[-0.055em] text-foreground/80",
        featureRoot: "mt-8 grid w-full gap-8 md:mt-9 md:gap-8",
        featureSection: "grid gap-3 md:grid-cols-[6.2rem_1fr] md:gap-6",
        featureEyebrow: "text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground/55",
        featureRow: "grid gap-1 md:grid-cols-[6.2rem_1fr] md:gap-6",
        featureTimeline:
          "font-ibm-plex-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground/55",
        featureHeading:
          "text-[clamp(1.05rem,1.45vw,1.4rem)] font-medium leading-none tracking-[-0.045em] text-foreground/82",
        featureDescription:
          "mt-0.5 max-w-xl text-[0.9rem] font-normal leading-snug tracking-[-0.01em] text-muted-foreground/78",
        featureLinkHeading:
          "text-[clamp(1.05rem,1.45vw,1.4rem)] font-medium leading-none tracking-[-0.045em] text-foreground/82 transition-opacity group-hover:opacity-55",
        featureLinkDescription:
          "mt-0.5 max-w-xl text-[0.9rem] font-normal leading-snug tracking-[-0.01em] text-muted-foreground/78 transition-colors group-hover:text-foreground/65",
      },
      content: {
        mdxH2: "mt-16 border-t border-border pt-8 text-[clamp(1.8rem,3vw,3rem)] font-medium leading-none tracking-[-0.07em]",
        mdxH3: "mt-10 text-2xl font-medium tracking-[-0.055em]",
        mdxP: "mt-5 text-pretty text-[clamp(1.25rem,2vw,1.7rem)] font-medium leading-[1.16] tracking-[-0.045em] text-foreground/85",
        mdxUl: "mt-6 space-y-3 pl-6 text-[clamp(1.1rem,1.6vw,1.4rem)] font-medium leading-tight tracking-[-0.035em] [list-style-type:square]",
        mdxOl: "mt-6 list-decimal space-y-3 pl-6 text-[clamp(1.1rem,1.6vw,1.4rem)] font-medium leading-tight tracking-[-0.035em]",
        mdxBlockquote:
          "mt-10 border-l border-border pl-6 text-[clamp(1.4rem,2vw,2rem)] font-medium italic leading-tight tracking-[-0.05em] text-foreground/75",
        workList: "mt-16",
        borderedArticle: "mt-16 max-w-3xl border-t border-border pt-10",
        detailArticle: "mt-16 max-w-3xl",
        detailGrid: "mt-16 grid gap-8 border-y border-border py-8 md:grid-cols-2",
        detailLabel: "text-[0.78rem] font-semibold uppercase text-muted-foreground",
        detailValue: "mt-4 text-[clamp(1.5rem,3vw,2.8rem)] font-medium leading-[1.02] tracking-[-0.065em]",
      },
      card: {
        root: "border-t border-border py-12 first:border-t-0 md:py-16",
        grid: "grid gap-8 md:grid-cols-[1fr_2.2fr]",
        eyebrowWrap: "space-y-2 text-[0.78rem] font-semibold uppercase text-muted-foreground",
        timeline: "font-ibm-plex-mono",
        title:
          "text-[clamp(2rem,5vw,4.8rem)] font-medium leading-[0.9] tracking-[-0.085em] transition-opacity group-hover:opacity-55",
        summary: "mt-5 max-w-3xl text-[clamp(1.55rem,3.2vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.07em]",
        table: "mt-8 grid border-t border-border text-sm md:grid-cols-[9rem_1fr]",
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
        body: "flex min-h-full flex-col",
        skipLink:
          "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2",
        pageRails: "page-rails mx-auto flex w-full max-w-[70rem] flex-1 flex-col px-6 md:px-10",
        header: "sticky top-0 z-40 backdrop-blur-sm",
        headerInner:
          "mx-auto flex w-full max-w-[70rem] items-center justify-between py-6 text-[0.74rem] font-semibold uppercase leading-none tracking-[0.01em]",
        footer: "py-10",
        footerInner:
          "flex w-full flex-col justify-between gap-5 text-[0.74rem] font-semibold uppercase text-muted-foreground md:flex-row",
      },
      section: {
        base: "py-14 md:py-20",
        contained: "mx-auto max-w-[70rem]",
      },
      pageHeader: {
        root: "space-y-8 pt-24 md:pt-32",
        eyebrow: "font-ibm-plex-mono text-[0.78rem] font-semibold uppercase text-muted-foreground",
        title: "max-w-5xl text-balance text-[clamp(2.8rem,8vw,7.6rem)] font-medium leading-[0.92] tracking-[-0.07em]",
        description:
          "max-w-3xl text-pretty text-[clamp(1.2rem,2.6vw,2rem)] font-medium leading-[1.1] tracking-[-0.04em] text-foreground",
      },
      home: {
        heroSection: "flex min-h-[84vh] items-center pb-16 pt-20 md:pb-20 md:pt-28",
        heroTitle:
          "max-w-[36ch] text-balance text-[clamp(1.9rem,3.3vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-foreground",
        aboutSection: "pt-6",
        aboutGrid: "grid gap-8 border-t border-border pt-10 md:grid-cols-[12rem_1fr]",
        aboutEyebrow: "text-[0.72rem] font-semibold uppercase text-muted-foreground",
        aboutLead: "text-[clamp(1.7rem,3.4vw,3.8rem)] font-medium leading-[1.02] tracking-[-0.06em]",
        aboutBody:
          "max-w-3xl text-[clamp(1.15rem,2vw,1.65rem)] font-medium leading-[1.12] tracking-[-0.035em] text-foreground/80",
        featureRoot: "mt-8 grid w-full gap-8",
        featureSection: "grid gap-4 md:grid-cols-[8.5rem_1fr] md:gap-5",
        featureEyebrow: "text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70",
        featureRow: "grid gap-2 md:grid-cols-[8.5rem_1fr] md:gap-5",
        featureTimeline:
          "font-ibm-plex-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70",
        featureHeading:
          "text-[clamp(1.02rem,1.4vw,1.28rem)] font-medium leading-none tracking-[-0.03em] text-foreground/85",
        featureDescription:
          "mt-1 max-w-xl text-[0.9rem] font-normal leading-snug tracking-[-0.005em] text-muted-foreground/82",
        featureLinkHeading:
          "text-[clamp(1.02rem,1.4vw,1.28rem)] font-medium leading-none tracking-[-0.03em] text-foreground/85 transition-opacity group-hover:opacity-55",
        featureLinkDescription:
          "mt-1 max-w-xl text-[0.9rem] font-normal leading-snug tracking-[-0.005em] text-muted-foreground/82 transition-colors group-hover:text-foreground/65",
      },
      content: {
        mdxH2: "mt-16 border-t border-border pt-8 text-[clamp(1.6rem,2.7vw,2.8rem)] font-medium leading-none tracking-[-0.05em]",
        mdxH3: "mt-10 text-[1.4rem] font-medium tracking-[-0.04em]",
        mdxP: "mt-5 text-pretty text-[clamp(1.15rem,1.8vw,1.55rem)] font-medium leading-[1.2] tracking-[-0.03em] text-foreground/86",
        mdxUl: "mt-6 space-y-3 pl-6 text-[clamp(1.05rem,1.4vw,1.25rem)] font-medium leading-tight tracking-[-0.02em] [list-style-type:square]",
        mdxOl: "mt-6 list-decimal space-y-3 pl-6 text-[clamp(1.05rem,1.4vw,1.25rem)] font-medium leading-tight tracking-[-0.02em]",
        mdxBlockquote:
          "mt-10 border-l border-border pl-6 text-[clamp(1.2rem,1.8vw,1.6rem)] font-medium italic leading-tight tracking-[-0.03em] text-foreground/75",
        workList: "mt-14",
        borderedArticle: "mt-14 max-w-4xl border-t border-border pt-8",
        detailArticle: "mt-14 max-w-4xl",
        detailGrid: "mt-14 grid gap-7 border-y border-border py-8 md:grid-cols-2",
        detailLabel: "text-[0.74rem] font-semibold uppercase text-muted-foreground",
        detailValue: "mt-3 text-[clamp(1.3rem,2.5vw,2.35rem)] font-medium leading-[1.04] tracking-[-0.045em]",
      },
      card: {
        root: "border-t border-border py-11 first:border-t-0 md:py-14",
        grid: "grid gap-8 md:grid-cols-[12rem_1fr]",
        eyebrowWrap: "space-y-2 text-[0.74rem] font-semibold uppercase text-muted-foreground",
        timeline: "font-ibm-plex-mono",
        title:
          "text-[clamp(1.7rem,4.6vw,4.2rem)] font-medium leading-[0.92] tracking-[-0.06em] transition-opacity group-hover:opacity-55",
        summary: "mt-4 max-w-3xl text-[clamp(1.35rem,2.8vw,2.7rem)] font-medium leading-[1.03] tracking-[-0.055em]",
        table: "mt-7 grid border-t border-border text-sm md:grid-cols-[10rem_1fr]",
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
