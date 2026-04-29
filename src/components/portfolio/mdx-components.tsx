import type { MDXComponents } from "mdx/types";
import { DefinitionPopover } from "@/components/ui/definition-popover";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

const theme = getActivePresentationTheme();

export const mdxComponents: MDXComponents = {
  DefinitionPopover,
  h2: (props) => (
    <h2
      className={theme.slots.content.mdxH2}
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className={theme.slots.content.mdxH3} {...props} />
  ),
  p: (props) => (
    <p
      className={theme.slots.content.mdxP}
      {...props}
    />
  ),
  ul: (props) => (
    <ul className={theme.slots.content.mdxUl} {...props} />
  ),
  ol: (props) => (
    <ol className={theme.slots.content.mdxOl} {...props} />
  ),
  blockquote: (props) => (
    <blockquote className={theme.slots.content.mdxBlockquote} {...props} />
  ),
};
