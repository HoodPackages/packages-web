import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ua from "./locales/ua/translation.json";
import en from "./locales/en/translation.json";
import de from "./locales/de/translation.json";
import it from "./locales/it/translation.json";
import fr from "./locales/fr/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    ua: { translation: ua },
    en: { translation: en },
    de: { translation: de },
    it: { translation: it },
    fr: { translation: fr }
  },
  lng: "ua", // язык по умолчанию
  fallbackLng: "en", // если нет перевода
  interpolation: { escapeValue: false }
});

export default i18n;
