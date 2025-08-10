export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-yellow-400 py-12 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-wide text-gray-900">
          Про нас
        </h1>
        <p className="mt-2 text-lg text-gray-800">
          Якість. Стиль. Ваш бренд на будь-чому.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-yellow-400 pl-3">
              Наша місія
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Ми створюємо унікальні та стильні рішення для брендування
              вашої продукції — від пакетів та коробок до одягу і сумок.
              Наше завдання — щоб ваш бізнес виглядав яскраво і впізнавано.
            </p>
          </div>
          <img
            src="https://via.placeholder.com/500x350?text=Branding+Example"
            alt="Приклад брендування"
            className="rounded-lg shadow-md border border-gray-200"
          />
        </section>

        <section className="bg-yellow-50 rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Наші цінності
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>✔ Висока якість друку</li>
            <li>✔ Індивідуальний підхід</li>
            <li>✔ Дотримання термінів</li>
            <li>✔ Стильний та сучасний дизайн</li>
          </ul>
        </section>

        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-yellow-400 pl-3">
            Наша історія
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Починаючи з 2015 року, ми допомагаємо компаніям виділитися
            серед конкурентів за допомогою унікального брендування.
            За цей час ми реалізували понад 2000 успішних проєктів
            для клієнтів з різних сфер бізнесу.
          </p>
        </section>
      </main>
    </div>
  );
}
