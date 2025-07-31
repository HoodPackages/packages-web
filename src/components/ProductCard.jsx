import { useState, useMemo } from "react";
import { usePackages } from "../data/usePackages";
import PackageCard from "./PackageCard";

export default function ProductCard({ packages }) {
    const { loading } = usePackages();
    const [selectedType, setSelectedType] = useState("Всі");

    const filteredPackages = useMemo(() => {
        if (selectedType === "Всі") return packages;
        return packages.filter(p => p.category === selectedType);
    }, [packages, selectedType]);

    if (loading) return <div>Завантаження...</div>;

    return (
        <section className="py-0 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPackages.map(pack => (
                        <PackageCard key={pack._id} pack={pack} />
                    ))}
                </div>
            </div>
        </section>
    );
}
