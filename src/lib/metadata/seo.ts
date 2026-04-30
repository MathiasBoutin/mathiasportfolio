import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { localizeUrl } from "@/lib/i18n/routing";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  locale?: Locale;
};

export function buildMetadata({
  title,
  description,
  path = "",
  locale = DEFAULT_LOCALE,
}: BuildMetadataInput): Metadata {
  const url = localizeUrl(path, locale);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
