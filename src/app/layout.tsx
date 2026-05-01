import type { Metadata } from "next";
import { Geist_Mono, IBM_Plex_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";
import { Analytics } from "@/components/portfolio/analytics";
import { getSiteCopy, siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/metadata/seo";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { defaultMessages } from "@/lib/i18n/messages";
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

const siteCopy = getSiteCopy();
const SHOW_THEME_TOGGLE = false;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteCopy.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteCopy.description,
  alternates: { canonical: siteConfig.url },
  openGraph: buildMetadata({
    title: siteCopy.title,
    description: siteCopy.description,
    path: "/",
  }).openGraph,
  twitter: buildMetadata({
    title: siteCopy.title,
    description: siteCopy.description,
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
      lang={DEFAULT_LOCALE}
      data-presentation-theme={themeId}
      suppressHydrationWarning
      className={`${geistMono.variable} ${ibmPlexMono.variable} ${theme.slots.shell.html}`}
    >
      <body className={theme.slots.shell.body}>
        <a href="#main-content" className={theme.slots.shell.skipLink}>
          {defaultMessages.shell.skipToContent}
        </a>
        <div className={theme.slots.shell.pageRails}>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
        {SHOW_THEME_TOGGLE ? <ThemeToggle currentTheme={themeId} /> : null}
        <Analytics />
      </body>
    </html>
  );
}
