import { cache } from "react";
import { caseStudySchema } from "@/lib/content/schema";
import { getMdxFilesFromSources } from "@/lib/content/mdx";

const caseStudySources = {
  "mobile-checkout-redesign": `---
title: "Mobile Checkout Redesign"
summary: "Improved completion rate by simplifying the checkout information architecture."
role: "Lead Product Designer"
timeline: "Q1 2025"
team: "Product trio + 2 engineers"
tools:
  - "Figma"
  - "Maze"
  - "Amplitude"
coverImage: "/images/work/mobile-checkout-cover.jpg"
featured: true
problem: "Mobile users dropped during payment and address entry."
outcome: "Checkout completion improved by 18%."
order: 1
---

## Context

This project addressed the highest-friction mobile flow in the product. We focused on reducing cognitive load while preserving user confidence.

## Process

- Audited event funnels and session recordings to identify drop-off moments.
- Ran five moderated usability sessions on the existing flow.
- Prototyped and tested two checkout structures before shipping.

## Outcome

The released design reduced average checkout time and improved completion rate by 18% across the first month.

## Reflection

The largest impact came from content clarity and progressive disclosure, not from adding new interface elements.
`,
  "analytics-dashboard-unification": `---
title: "Analytics Dashboard Unification"
summary: "Consolidated fragmented reporting into one dashboard for product and operations teams."
role: "Senior Product Designer"
timeline: "Q3 2024"
team: "Design, PM, data analyst, 3 engineers"
tools:
  - "Figma"
  - "Looker"
  - "Hotjar"
coverImage: "/images/work/analytics-dashboard-cover.jpg"
featured: true
problem: "Stakeholders relied on disconnected reports that were hard to trust."
outcome: "Weekly reporting prep dropped from 4 hours to 45 minutes."
order: 2
---

## Context

Multiple teams were stitching data from different sources, creating decision latency and inconsistency.

## Process

- Mapped stakeholder decisions to identify core metrics.
- Created a hierarchy model to separate overview health metrics from deep dives.
- Iterated quickly with engineering on feasible chart components.

## Outcome

The unified dashboard became the default source for weekly decision meetings and reduced reporting overhead significantly.

## Reflection

Shared metric definitions matter as much as visual consistency in analytics products.
`,
} as const;

export const getCaseStudies = cache(async () => {
  const projects = getMdxFilesFromSources({
    sources: caseStudySources,
    parse: (input) => caseStudySchema.parse(input),
  });

  return projects.sort((a, b) => a.data.order - b.data.order);
});

export const getFeaturedCaseStudies = cache(async () => {
  const projects = await getCaseStudies();
  return projects.filter((project) => project.data.featured);
});

export const getCaseStudyBySlug = cache(async (slug: string) => {
  const projects = await getCaseStudies();
  return projects.find((project) => project.slug === slug);
});
