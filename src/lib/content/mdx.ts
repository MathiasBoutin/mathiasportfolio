import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type ParsedMdx<T> = {
  slug: string;
  content: string;
  data: T;
};

export async function getMdxFilesFromDirectory<T>({
  directory,
  parse,
}: {
  directory: string;
  parse: (input: unknown) => T;
}): Promise<Array<ParsedMdx<T>>> {
  const absoluteDirectory = path.join(process.cwd(), directory);
  const entries = await fs.readdir(absoluteDirectory, { withFileTypes: true });

  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name);

  const results = await Promise.all(
    files.map(async (fileName) => {
      const fullPath = path.join(absoluteDirectory, fileName);
      const source = await fs.readFile(fullPath, "utf-8");
      const { data, content } = matter(source);
      return {
        slug: fileName.replace(/\.mdx$/, ""),
        content,
        data: parse(data),
      };
    }),
  );

  return results;
}
