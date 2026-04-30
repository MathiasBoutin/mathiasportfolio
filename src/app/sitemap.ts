import type { MetadataRoute } from "next";
import { getCaseStudies } from "@/lib/content/work";
import { localizeUrl } from "@/lib/i18n/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const studiesEn = await getCaseStudies("en");
  const studiesFr = await getCaseStudies("fr");

  const baseRoutes: MetadataRoute.Sitemap = ["", "/work", "/about", "/cv"].map(
    (route) => ({
      url: localizeUrl(route),
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.8,
    }),
  );

  const studyRoutesEn: MetadataRoute.Sitemap = studiesEn.map((study) => ({
    url: localizeUrl(`/work/${study.slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const baseRoutesFr: MetadataRoute.Sitemap = ["", "/work", "/about", "/cv"].map(
    (route) => ({
      url: localizeUrl(route, "fr"),
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.8,
    }),
  );

  const studyRoutesFr: MetadataRoute.Sitemap = studiesFr.map((study) => ({
    url: localizeUrl(`/work/${study.slug}`, "fr"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...baseRoutes, ...studyRoutesEn, ...baseRoutesFr, ...studyRoutesFr];
}
