import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import enMessages from "@/lib/i18n/messages/en";

const messagesByLocale: Record<Locale, typeof enMessages> = {
  en: enMessages,
};

export type Messages = typeof enMessages;

export function getMessages(locale: Locale = DEFAULT_LOCALE): Messages {
  return messagesByLocale[locale];
}

export const defaultMessages = messagesByLocale[DEFAULT_LOCALE];
