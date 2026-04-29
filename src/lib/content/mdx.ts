import matter from "gray-matter";

export type ParsedMdx<T> = {
  slug: string;
  content: string;
  data: T;
};

export function getMdxFilesFromSources<T>({
  sources,
  parse,
}: {
  sources: Record<string, string>;
  parse: (input: unknown) => T;
}): Array<ParsedMdx<T>> {
  return Object.entries(sources).map(([slug, source]) => {
    const { data, content } = matter(source);

    return {
      slug,
      content,
      data: parse(data),
    };
  });
}
