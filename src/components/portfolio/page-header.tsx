type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="space-y-8 pt-28 md:pt-36">
      {eyebrow ? (
        <p className="font-ibm-plex-mono text-[0.78rem] font-semibold uppercase text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="max-w-4xl text-balance text-[clamp(3.25rem,9vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.09em]">
        {title}
      </h1>
      <p className="max-w-2xl text-pretty text-[clamp(1.35rem,3vw,2.25rem)] font-medium leading-[1.05] tracking-[-0.055em] text-foreground">
        {description}
      </p>
    </header>
  );
}
