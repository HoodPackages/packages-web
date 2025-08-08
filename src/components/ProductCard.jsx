import { useState, useMemo } from "react";
import { usePackages } from "../data/usePackages";
import PackageCard from "./PackageCard";
import { FaSpinner } from "react-icons/fa";

export default function ProductCard({ packages }) {
    const { loading } = usePackages();
    const [selectedType, setSelectedType] = useState("Всі");

    const filteredPackages = useMemo(() => {
        if (selectedType === "Всі") return packages;
        return packages.filter(p => p.category === selectedType);
    }, [packages, selectedType]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="flex items-center gap-3 text-lg text-gray-500">
                    <FaSpinner className="animate-spin h-6 w-6" />
                    <span>Завантаження...</span>
                </div>
            </div>
        );
    }

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
