import type { MetadataRoute } from "next";
import { getCaseStudies } from "@/lib/content/work";
import { localizeUrl } from "@/lib/i18n/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const studies = await getCaseStudies();

  const baseRoutes: MetadataRoute.Sitemap = ["", "/work", "/about", "/cv"].map(
    (route) => ({
      url: localizeUrl(route),
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.8,
    }),
  );

  const studyRoutes: MetadataRoute.Sitemap = studies.map((study) => ({
    url: localizeUrl(`/work/${study.slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...baseRoutes, ...studyRoutes];
}
