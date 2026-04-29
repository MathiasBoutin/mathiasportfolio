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

export const cvData: CvData = {
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
};
