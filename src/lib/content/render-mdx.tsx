import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/portfolio/mdx-components";

export async function renderMdx(source: string) {
  const result = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
    },
  });

  return result.content;
}
