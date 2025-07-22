import { packages } from "../data/mockPackages"
import PackageCard from "../components/PackageCard"

export default function Catalog() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Каталог Пакетов
          </h2>
          <p className="text-gray-600 text-lg">
            Выберите подходящий для себя пакет услуг
          </p>
        </div>

        {/* Сетка карточек */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map(pack => (
            <PackageCard key={pack.id} pack={pack} />
          ))}
        </div>
      </div>
    </section>
  )
}
