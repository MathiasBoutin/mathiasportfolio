import type { Metadata } from "next";
import { Geist_Mono, IBM_Plex_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";
import { Analytics } from "@/components/portfolio/analytics";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/metadata/seo";
import {
  getPresentationTheme,
  PRESENTATION_THEME_COOKIE,
  resolvePresentationThemeId,
} from "@/lib/presentation-themes";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
  openGraph: buildMetadata({
    title: siteConfig.title,
    description: siteConfig.description,
    path: "/",
  }).openGraph,
  twitter: buildMetadata({
    title: siteConfig.title,
    description: siteConfig.description,
    path: "/",
  }).twitter,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeId = resolvePresentationThemeId(
    cookieStore.get(PRESENTATION_THEME_COOKIE)?.value,
  );
  const theme = getPresentationTheme(themeId);

  return (
    <html
      lang="en"
      data-presentation-theme={themeId}
      suppressHydrationWarning
      className={`${geistMono.variable} ${ibmPlexMono.variable} ${theme.slots.shell.html}`}
    >
      <body className={theme.slots.shell.body}>
        <a href="#main-content" className={theme.slots.shell.skipLink}>
          Skip to content
        </a>
        <div className={theme.slots.shell.pageRails}>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
        <ThemeToggle currentTheme={themeId} />
        <Analytics />
      </body>
    </html>
  );
}
