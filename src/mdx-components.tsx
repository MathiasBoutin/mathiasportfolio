import type { MDXComponents } from "mdx/types";
import { mdxComponents } from "@/components/portfolio/mdx-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
