import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getCaseStudies } from "@/lib/content/work";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const studies = await getCaseStudies();

  const baseRoutes: MetadataRoute.Sitemap = ["", "/work", "/about", "/cv"].map(
    (route) => ({
      url: `${siteConfig.url}${route}`,
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.8,
    }),
  );

  const studyRoutes: MetadataRoute.Sitemap = studies.map((study) => ({
    url: `${siteConfig.url}/work/${study.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...baseRoutes, ...studyRoutes];
}
