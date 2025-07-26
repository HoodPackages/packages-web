import { useState, useMemo } from "react";
import { usePackages } from "../data/usePackages";
import PackageCard from "../components/PackageCard";

export default function Catalog() {
  const { packages, loading } = usePackages();
  const [selectedType, setSelectedType] = useState("Всі");

  const types = useMemo(() => {
    const allTypes = packages.map(p => p.type).filter(Boolean);
    return ["Всі", ...Array.from(new Set(allTypes))];
  }, [packages]);

  const filteredPackages = useMemo(() => {
    if (selectedType === "Всі") return packages;
    return packages.filter(p => p.type === selectedType);
  }, [packages, selectedType]);

  if (loading) return <div>Завантаження...</div>;

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Каталог Пакетів</h2>
          <p className="text-gray-600 text-lg">Оберіть категорію або перегляньте всі доступні пакети</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full border transition ${
                selectedType === type
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map(pack => (
            <PackageCard key={pack._id} pack={pack} />
          ))}
        </div>
      </div>
    </section>
  );
}
