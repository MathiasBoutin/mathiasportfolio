const enMessages = {
  site: {
    title: "Mathias Boutin - UX and Product Design",
    description:
      "UX and product design portfolio with case studies, process, and outcomes.",
    nav: {
      home: "Home",
      work: "Case Studies",
      about: "Bio",
      cv: "CV",
    },
  },
  shell: {
    skipToContent: "Skip to content",
    footerLocation: "Based in Montreal, Canada.",
  },
  home: {
    sections: {
      workExperience: "My work experience",
      strengths: "What I'm good at",
      caseStudies: "Case Studies",
      connect: "Connect",
    },
    popovers: {
      shopify: {
        term: "Shopify",
        pronunciation: "shop-uh-fy",
        definition:
          "A commerce platform that helps businesses create online stores, accept payments, and sell across digital and physical channels.",
        learnMoreHref: "https://www.shopify.com",
        learnMoreLabel: "Visit Shopify",
      },
      patch: {
        term: "Patch",
        pronunciation: "patch",
        definition:
          "A climate technology company that helps organizations buy, manage, and scale high-quality carbon removal.",
        learnMoreHref: "https://www.patch.io",
        learnMoreLabel: "Visit Patch",
      },
    },
    languagePicker: {
      switchLabel: "Choose language",
      englishGreeting: "hi!",
      frenchGreeting: "Bonjour",
    },
  },
  about: {
    metadataTitle: "Bio",
    metadataDescription: "Personal background, values, and design approach.",
    eyebrow: "Bio",
    title: "About me",
    description:
      "The context behind my product design practice, what I value, and how I collaborate.",
  },
  work: {
    metadataTitle: "Case Studies",
    metadataDescription: "Selected UX and product design projects.",
    eyebrow: "Case studies",
    title: "Selected product work",
    description:
      "A curated set of projects showing the problem, process, design decisions, and measurable results.",
    detailLabels: {
      problem: "Problem",
      outcome: "Outcome",
    },
    cardLabels: {
      years: "Years",
      role: "Role",
      scope: "Scope",
      team: "Team",
    },
  },
  cv: {
    metadataTitle: "CV",
    metadataDescription: "Professional experience, skills, and education.",
    printButtonLabel: "Download PDF",
    timelineAriaLabel: "Timeline",
    focusAreasHeading: "Focus Areas",
  },
  notFound: {
    title: "Page not found",
    description: "The page you requested does not exist yet or may have moved.",
    backHome: "Back to home",
  },
  themeToggle: {
    defaultLabel: "Default",
    darkLabel: "Dark",
    ariaLabel: {
      switchToDefault: "Switch to default theme",
      switchToDark: "Switch to dark theme",
    },
  },
  definitionPopover: {
    learnMoreLabel: "Dive deeper",
  },
} as const;

export default enMessages;
