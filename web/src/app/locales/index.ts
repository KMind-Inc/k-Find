import cn from "./cn";
import en from "./en";

import type { LocaleType } from "./cn";
export type { LocaleType, PartialLocaleType } from "./cn";

const ALL_LANGS = {
  en,
  cn,
};

export type Lang = keyof typeof ALL_LANGS;

export const AllLangs = Object.keys(ALL_LANGS) as Lang[];

export const ALL_LANG_OPTIONS: Record<Lang, string> = {
  en: "English",
  cn: "简体中文",
};

const LANG_KEY = "lang";
const DEFAULT_LANG = "cn";

const targetLang = ALL_LANGS[getLang()] as LocaleType;

export default targetLang as LocaleType;

function getItem(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setItem(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function getLanguage() {
  try {
    return navigator.language.toLowerCase();
  } catch {
    return DEFAULT_LANG;
  }
}

export function getLang(): Lang {
  const savedLang = getItem(LANG_KEY);

  if (AllLangs.includes((savedLang ?? "") as Lang)) {
    return savedLang as Lang;
  }

  const lang = getLanguage();

  for (const option of AllLangs) {
    if (lang.includes(option)) {
      return option;
    }
  }

  return DEFAULT_LANG;
}

export function changeLang(lang: Lang) {
  setItem(LANG_KEY, lang);
  location.reload();
}
