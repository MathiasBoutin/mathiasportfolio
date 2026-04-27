import { cache } from "react";
import { caseStudySchema } from "@/lib/content/schema";
import { getMdxFilesFromDirectory } from "@/lib/content/mdx";

export const getCaseStudies = cache(async () => {
  const projects = await getMdxFilesFromDirectory({
    directory: "content/work",
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
