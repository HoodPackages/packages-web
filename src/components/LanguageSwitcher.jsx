import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex gap-2">
      {["ua", "en", "de", "it", "fr"].map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className="px-2 py-1 text-sm font-medium text-gray-700 hover:text-yellow-400"
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
