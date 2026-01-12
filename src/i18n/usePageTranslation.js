import { useEffect, useState } from "react";
import { translateText } from "./translate";

export function usePageTranslation(sourceTexts = {}) {
  const [t, setT] = useState(sourceTexts);
  const lang = localStorage.getItem("lang") || "uk";

  useEffect(() => {
    let cancelled = false;

    async function translateAll() {
      if (lang === "uk") {
        setT(sourceTexts);
        return;
      }

      const result = {};
      console.log(Object.keys(sourceTexts))
      for (const key of Object.keys(sourceTexts)) {
        result[key] = await translateText(sourceTexts[key], "uk", lang);
      }

      if (!cancelled) setT(result);
    }

    translateAll();
    return () => (cancelled = true);
  }, [lang]);

  return t;
}
