import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-yellow-400 py-12 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-wide text-gray-900">
          {t("about.title")}
        </h1>
        <p className="mt-2 text-lg text-gray-800">{t("about.subtitle")}</p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-yellow-400 pl-3">
              {t("about.mission.title")}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t("about.mission.text")}
            </p>
          </div>
          <img
            src="https://via.placeholder.com/500x350?text=Branding+Example"
            alt={t("about.mission.imageAlt")}
            className="rounded-lg shadow-md border border-gray-200"
          />
        </section>

        <section className="bg-yellow-50 rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("about.values.title")}
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>✔ {t("about.values.quality")}</li>
            <li>✔ {t("about.values.individual")}</li>
            <li>✔ {t("about.values.deadlines")}</li>
            <li>✔ {t("about.values.design")}</li>
          </ul>
        </section>

        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-yellow-400 pl-3">
            {t("about.history.title")}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {t("about.history.text")}
          </p>
        </section>
      </main>
    </div>
  );
}
