import type { Metadata } from "next";
import { WorkPageContent } from "@/components/portfolio/pages/work-page-content";
import { getMessages } from "@/lib/i18n/messages";
import { buildMetadata } from "@/lib/metadata/seo";

const workMessages = getMessages("fr").work;

export const metadata: Metadata = buildMetadata({
  title: workMessages.metadataTitle,
  description: workMessages.metadataDescription,
  path: "/work",
  locale: "fr",
});

export default async function FrenchWorkPage() {
  return <WorkPageContent locale="fr" />;
}
