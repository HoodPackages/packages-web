import { API_URL } from "../data/config";
const translate_API_URL = `${API_URL}/api/translate`

export async function translateText(text, from = "uk", to = "uk") {
  if (!text || from === to) return text;

  const cacheKey = `i18n:${from}:${to}:${text}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) return cached;

  const res = await fetch(translate_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, from, to }),
  });

  const data = await res.json();
  localStorage.setItem(cacheKey, data.text);
  return data.text;
}