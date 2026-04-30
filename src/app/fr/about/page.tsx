import type { Metadata } from "next";
import { AboutPageContent } from "@/components/portfolio/pages/about-page-content";
import { getMessages } from "@/lib/i18n/messages";
import { buildMetadata } from "@/lib/metadata/seo";

const aboutMessages = getMessages("fr").about;

export const metadata: Metadata = buildMetadata({
  title: aboutMessages.metadataTitle,
  description: aboutMessages.metadataDescription,
  path: "/about",
  locale: "fr",
});

export default async function FrenchAboutPage() {
  return <AboutPageContent locale="fr" />;
}
