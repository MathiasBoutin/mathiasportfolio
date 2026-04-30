const frMessages = {
  site: {
    title: "Mathias Boutin - UX et design produit",
    description:
      "Portfolio UX et design produit avec études de cas, processus et résultats.",
    nav: {
      home: "Accueil",
      work: "Études de cas",
      about: "Bio",
      cv: "CV",
    },
  },
  shell: {
    skipToContent: "Aller au contenu",
    footerLocation: "Basé à Montréal, Canada.",
  },
  home: {
    sections: {
      workExperience: "Mon expérience de travail",
      strengths: "Ce que je fais bien",
      caseStudies: "Études de cas",
      connect: "Contact",
    },
    popovers: {
      shopify: {
        term: "Shopify",
        pronunciation: "shop-uh-fy",
        definition:
          "Une plateforme de commerce qui aide les entreprises à créer des boutiques en ligne, accepter des paiements et vendre sur des canaux numériques et physiques.",
        learnMoreHref: "https://www.shopify.com",
        learnMoreLabel: "Visiter Shopify",
      },
      patch: {
        term: "Patch",
        pronunciation: "patch",
        definition:
          "Une entreprise technologique climat qui aide les organisations à acheter, gérer et déployer des solutions de retrait carbone de haute qualité.",
        learnMoreHref: "https://www.patch.io",
        learnMoreLabel: "Visiter Patch",
      },
    },
    languagePicker: {
      switchLabel: "Choisir la langue",
      englishGreeting: "hi!",
      frenchGreeting: "Bonjour",
    },
  },
  about: {
    metadataTitle: "Bio",
    metadataDescription: "Parcours personnel, valeurs et approche du design.",
    eyebrow: "Bio",
    title: "À propos de moi",
    description:
      "Le contexte derrière ma pratique en design produit, ce que je valorise et ma façon de collaborer.",
  },
  work: {
    metadataTitle: "Études de cas",
    metadataDescription: "Sélection de projets UX et design produit.",
    eyebrow: "Études de cas",
    title: "Travaux produits sélectionnés",
    description:
      "Une sélection de projets qui montre le problème, la démarche, les décisions de design et les résultats mesurables.",
    detailLabels: {
      problem: "Problème",
      outcome: "Résultat",
    },
    cardLabels: {
      years: "Période",
      role: "Rôle",
      scope: "Portée",
      team: "Équipe",
    },
  },
  cv: {
    metadataTitle: "CV",
    metadataDescription: "Expérience professionnelle, compétences et formation.",
    printButtonLabel: "Télécharger le PDF",
    timelineAriaLabel: "Chronologie",
    focusAreasHeading: "Domaines de focus",
  },
  notFound: {
    title: "Page introuvable",
    description: "La page demandée n'existe pas encore ou a été déplacée.",
    backHome: "Retour à l'accueil",
  },
  themeToggle: {
    defaultLabel: "Défaut",
    darkLabel: "Sombre",
    ariaLabel: {
      switchToDefault: "Basculer vers le thème par défaut",
      switchToDark: "Basculer vers le thème sombre",
    },
  },
  definitionPopover: {
    learnMoreLabel: "En savoir plus",
  },
} as const;

export default frMessages;
