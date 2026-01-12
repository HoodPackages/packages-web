import { useEffect, useState } from "react";
import { translateText } from "./translate";

export function useTranslatedValue(value, from = "uk") {
  const [translated, setTranslated] = useState(value);
  const lang = localStorage.getItem("lang") || "uk";

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!value) return;
      if (lang === from) {
        setTranslated(value);
        return;
      }

      const result = await translateText(value, from, lang);
      if (!cancelled) setTranslated(result);
    }

    run();
    return () => (cancelled = true);
  }, [value, lang, from]);

  return translated;
}
