import { Fragment } from "react";
import { getActivePresentationTheme } from "@/lib/presentation-themes";
import { cn } from "@/lib/utils";

type MarkdownContentProps = {
  source: string;
  className?: string;
};

export function MarkdownContent({ source, className }: MarkdownContentProps) {
  const theme = getActivePresentationTheme();
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i]?.trim() ?? "";

    if (!line) {
      i += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={`h2-${i}`} className={theme.slots.content.mdxH2}>
          {line.slice(3)}
        </h2>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={`h3-${i}`} className={theme.slots.content.mdxH3}>
          {line.slice(4)}
        </h3>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i]?.trim() ?? "").startsWith("- ")) {
        items.push((lines[i] ?? "").trim().slice(2));
        i += 1;
      }

      blocks.push(
        <ul key={`ul-${i}`} className={theme.slots.content.mdxUl}>
          {items.map((item, index) => (
            <li key={`li-${i}-${index}`}>
              {item}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    const paragraphLines: string[] = [];
    while (i < lines.length) {
      const nextLine = lines[i]?.trim() ?? "";
      if (!nextLine || nextLine.startsWith("## ") || nextLine.startsWith("### ") || nextLine.startsWith("- ")) {
        break;
      }
      paragraphLines.push(nextLine);
      i += 1;
    }

    blocks.push(
      <p key={`p-${i}`} className={theme.slots.content.mdxP}>
        {paragraphLines.join(" ")}
      </p>,
    );
  }

  return (
    <div className={cn(className)}>
      {blocks.map((block, index) => (
        <Fragment key={index}>
          {block}
        </Fragment>
      ))}
    </div>
  );
}
