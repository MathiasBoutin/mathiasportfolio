import { siteConfig } from "@/lib/site-config";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

export function localizePath(path: string, locale: Locale = DEFAULT_LOCALE): string {
  if (locale === DEFAULT_LOCALE) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalizedPath}`;
}

export function localizeUrl(path: string, locale: Locale = DEFAULT_LOCALE): string {
  return `${siteConfig.url}${localizePath(path, locale)}`;
}

export function getPathWithoutLocalePrefix(pathname: string): string {
  if (pathname === "/fr") {
    return "/";
  }

  if (pathname.startsWith("/fr/")) {
    return pathname.slice(3);
  }

  return pathname;
}

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
}

export function localizePathnameForLocale(pathname: string, locale: Locale): string {
  const basePath = getPathWithoutLocalePrefix(pathname);
  return localizePath(basePath, locale);
}
