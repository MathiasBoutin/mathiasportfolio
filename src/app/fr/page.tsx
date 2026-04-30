import { HomePageContent } from "@/components/portfolio/pages/home-page-content";
import type { Metadata } from "next";
import { getMessages } from "@/lib/i18n/messages";
import { buildMetadata } from "@/lib/metadata/seo";

const siteMessages = getMessages("fr").site;

export const metadata: Metadata = buildMetadata({
  title: siteMessages.title,
  description: siteMessages.description,
  path: "/",
  locale: "fr",
});

export default async function FrenchHomePage() {
  return <HomePageContent locale="fr" />;
}
