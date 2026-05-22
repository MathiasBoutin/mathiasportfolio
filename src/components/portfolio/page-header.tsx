import { getActivePresentationTheme } from "@/lib/presentation-themes";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: React.ReactNode;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  headerClassName,
  titleClassName,
  descriptionClassName,
}: PageHeaderProps) {
  const theme = getActivePresentationTheme();

  return (
    <header className={headerClassName ?? theme.slots.pageHeader.root}>
      {eyebrow ? (
        <p className={theme.slots.pageHeader.eyebrow}>
          {eyebrow}
        </p>
      ) : null}
      <h1 className={titleClassName ?? theme.slots.pageHeader.title}>
        {title}
      </h1>
      <p className={descriptionClassName ?? theme.slots.pageHeader.description}>
        {description}
      </p>
    </header>
  );
}
