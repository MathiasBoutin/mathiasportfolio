import type { Metadata } from "next";
import { CvPageContent } from "@/components/portfolio/pages/cv-page-content";
import { getMessages } from "@/lib/i18n/messages";
import { buildMetadata } from "@/lib/metadata/seo";

const cvMessages = getMessages("fr").cv;

export const metadata: Metadata = buildMetadata({
  title: cvMessages.metadataTitle,
  description: cvMessages.metadataDescription,
  path: "/cv",
  locale: "fr",
});

export default async function FrenchCvPage() {
  return <CvPageContent locale="fr" />;
}
