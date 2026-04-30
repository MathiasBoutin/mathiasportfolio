import { defaultMessages } from "@/lib/i18n/messages";

export const siteConfig = {
  name: "Mathias Boutin Portfolio",
  url: "https://mathiasboutin.com",
  contactEmail: "mathiasboutin@gmail.com",
} as const;

export function getSiteCopy() {
  return {
    title: defaultMessages.site.title,
    description: defaultMessages.site.description,
    nav: [
      { href: "/", label: defaultMessages.site.nav.home },
      { href: "/work", label: defaultMessages.site.nav.work },
      { href: "/about", label: defaultMessages.site.nav.about },
      { href: "/cv", label: defaultMessages.site.nav.cv },
    ],
  } as const;
}
