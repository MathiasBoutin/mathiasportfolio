export const SUPPORTED_LOCALES = ["en"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function resolveLocale(input?: string): Locale {
  if (input && isLocale(input)) {
    return input;
  }

  return DEFAULT_LOCALE;
}
