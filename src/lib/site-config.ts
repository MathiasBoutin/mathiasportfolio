import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export const siteConfig = {
  name: "Mathias Boutin Portfolio",
  url: "https://mathiasboutin.com",
  contactEmail: "mathiasboutin@gmail.com",
} as const;

export function getSiteCopy(locale: Locale = DEFAULT_LOCALE) {
  const messages = getMessages(locale);

  return {
    title: messages.site.title,
    description: messages.site.description,
    nav: [
      { href: "/", label: messages.site.nav.home },
      { href: "/work", label: messages.site.nav.work },
      { href: "/about", label: messages.site.nav.about },
      { href: "/cv", label: messages.site.nav.cv },
    ],
  } as const;
}
