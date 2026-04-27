import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-16 border-t border-border pt-8 text-[clamp(1.8rem,3vw,3rem)] font-medium leading-none tracking-[-0.07em]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-10 text-2xl font-medium tracking-[-0.055em]" {...props} />
  ),
  p: (props) => (
    <p
      className="mt-5 text-pretty text-[clamp(1.25rem,2vw,1.7rem)] font-medium leading-[1.16] tracking-[-0.045em] text-foreground/85"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mt-6 space-y-3 pl-6 text-[clamp(1.1rem,1.6vw,1.4rem)] font-medium leading-tight tracking-[-0.035em] [list-style-type:square]"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-6 list-decimal space-y-3 pl-6 text-[clamp(1.1rem,1.6vw,1.4rem)] font-medium leading-tight tracking-[-0.035em]"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-10 border-l border-border pl-6 text-[clamp(1.4rem,2vw,2rem)] font-medium italic leading-tight tracking-[-0.05em] text-foreground/75"
      {...props}
    />
  ),
};
