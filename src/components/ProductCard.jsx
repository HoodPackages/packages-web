import { useState, useMemo } from "react";
import { usePackages } from "../data/usePackages";
import PackageCard from "./PackageCard";

export default function ProductCard({ packages }) {
    const { loading } = usePackages();
    const [selectedType, setSelectedType] = useState("Всі");

    const types = useMemo(() => {
        const allTypes = packages.map(p => p.category).filter(Boolean);
        return ["Всі", ...Array.from(new Set(allTypes))];
    }, [packages]);

    const filteredPackages = useMemo(() => {
        if (selectedType === "Всі") return packages;
        return packages.filter(p => p.category === selectedType);
    }, [packages, selectedType]);

    if (loading) return <div>Завантаження...</div>;

    return (
        <section className="py-0 px-4">
            <div className="max-w-7xl mx-auto">

                {/* <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {types.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedType(category)}
                            className={`px-4 py-2 rounded-full border transition ${selectedType === category
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div> */}

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPackages.map(pack => (
                        <PackageCard key={pack._id} pack={pack} />
                    ))}
                </div>
            </div>
        </section>
    );
}
