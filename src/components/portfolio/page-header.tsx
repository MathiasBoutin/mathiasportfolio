import { getActivePresentationTheme } from "@/lib/presentation-themes";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  const theme = getActivePresentationTheme();

  return (
    <header className={theme.slots.pageHeader.root}>
      {eyebrow ? (
        <p className={theme.slots.pageHeader.eyebrow}>
          {eyebrow}
        </p>
      ) : null}
      <h1 className={theme.slots.pageHeader.title}>
        {title}
      </h1>
      <p className={theme.slots.pageHeader.description}>
        {description}
      </p>
    </header>
  );
}
