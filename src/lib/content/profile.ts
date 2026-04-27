import { cache } from "react";
import { getMdxFilesFromDirectory } from "@/lib/content/mdx";
import { profileSchema } from "@/lib/content/schema";

export const getProfileDocument = cache(async (slug: string) => {
  const docs = await getMdxFilesFromDirectory({
    directory: "content/profile",
    parse: (input) => profileSchema.parse(input),
  });

  return docs.find((doc) => doc.slug === slug);
});
