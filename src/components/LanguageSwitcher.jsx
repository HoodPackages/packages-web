import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UsaFlag from "../assets/flags/us.png";
import UaFlag from "../assets/flags/ua.png";
import DeFlag from "../assets/flags/de.png";
import ItFlag from "../assets/flags/it.png";
import FrFlag from "../assets/flags/fr.png";

const LANGS = [
  { code: "ua", label: "UA", flag: UaFlag },
  { code: "en", label: "EN", flag: UsaFlag },
  { code: "de", label: "DE", flag: DeFlag },
  { code: "it", label: "IT", flag: ItFlag },
  { code: "fr", label: "FR", flag: FrFlag },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && LANGS.some((l) => l.code === savedLang)) {
      i18n.changeLanguage(savedLang);
    } else {
      const browserLang = navigator.language.slice(0, 2).toLowerCase();
      const matchedLang =
        browserLang === "uk"
          ? "ua"
          : LANGS.some((l) => l.code === browserLang)
          ? browserLang
          : "en";
      i18n.changeLanguage(matchedLang);
      localStorage.setItem("lang", matchedLang);
    }
  }, [i18n]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setIsOpen(false);
  };

  const currentLangObj = LANGS.find((l) => l.code === i18n.language) || LANGS[1];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-yellow-400 hover:text-black"
      >
        <img src={currentLangObj.flag} alt={currentLangObj.label} className="w-5 h-5" />
        <span>{currentLangObj.label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg z-50 overflow-hidden">
          {LANGS.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-left ${
                lang.code === currentLangObj.code
                  ? "font-bold text-yellow-400"
                  : "text-gray-700"
              } hover:bg-yellow-400 hover:text-black`}
            >
              <img src={lang.flag} alt={lang.label} className="w-5 h-5" />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
