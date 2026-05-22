import { Fragment } from "react";
import { DefinitionPopover } from "@/components/ui/definition-popover";
import {
  definitionPopoverThemes,
  type DefinitionPopoverThemeId,
} from "@/lib/definition-popover-themes";
import { type InlineDefinition } from "@/lib/content/schema";

const DEFINITION_PATTERN = /\[([^\]]+)\]/g;

function resolveDefinitionPopoverTheme(themeId?: DefinitionPopoverThemeId) {
  return definitionPopoverThemes[themeId ?? "patch"];
}

function findDefinition(
  key: string,
  definitions: Record<string, InlineDefinition>,
): InlineDefinition | undefined {
  const normalizedKey = key.toLowerCase();
  const entry = Object.entries(definitions).find(
    ([definitionKey]) => definitionKey.toLowerCase() === normalizedKey,
  );

  return entry?.[1];
}

export function renderInlineDefinitions(
  text: string,
  definitions?: Record<string, InlineDefinition>,
): React.ReactNode {
  if (!definitions || Object.keys(definitions).length === 0) {
    return text;
  }

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  DEFINITION_PATTERN.lastIndex = 0;

  while ((match = DEFINITION_PATTERN.exec(text)) !== null) {
    const [fullMatch, key] = match;
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      parts.push(text.slice(lastIndex, matchIndex));
    }

    const definition = findDefinition(key, definitions);

    if (definition) {
      parts.push(
        <DefinitionPopover
          key={`${matchIndex}-${key}`}
          term={definition.term}
          title={definition.title}
          definition={definition.definition}
          pronunciation={definition.pronunciation}
          learnMoreHref={definition.learnMoreHref}
          theme={resolveDefinitionPopoverTheme(definition.theme)}
        />,
      );
    } else {
      parts.push(key);
    }

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  if (parts.length === 0) {
    return text;
  }

  return parts.map((part, index) => (
    <Fragment key={index}>{part}</Fragment>
  ));
}
