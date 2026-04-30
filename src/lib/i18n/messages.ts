import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import enMessages from "@/lib/i18n/messages/en";
import frMessages from "@/lib/i18n/messages/fr";

type DeepStringify<T> = T extends string
  ? string
  : T extends Array<infer U>
    ? Array<DeepStringify<U>>
    : T extends object
      ? { [K in keyof T]: DeepStringify<T[K]> }
      : T;

export type Messages = DeepStringify<typeof enMessages>;

const messagesByLocale: Record<Locale, Messages> = {
  en: enMessages,
  fr: frMessages,
};

export function getMessages(locale: Locale = DEFAULT_LOCALE): Messages {
  return messagesByLocale[locale];
}

export const defaultMessages = messagesByLocale[DEFAULT_LOCALE];
