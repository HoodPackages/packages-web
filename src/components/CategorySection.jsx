import React, { useState } from "react";
import { usePackages } from "../data/usePackages";

export default function CategorySection() {
    const { packages, loading } = usePackages();
    const [showAll, setShowAll] = useState(false);

    const categoriesMap = packages.reduce((acc, pkg) => {
        const category = pkg.category || "Без категорії";

        if (!acc[category]) {
            acc[category] = {
                productsCount: 0,
                firstImage: pkg.images && pkg.images.length > 0 ? pkg.images[0] : null,
            };
        }

        acc[category].productsCount += 1;

        return acc;
    }, {});

    const categories = Object.entries(categoriesMap).map(([name, data]) => ({
        name,
        products: data.productsCount,
        image: data.firstImage || "https://via.placeholder.com/600x400?text=No+Image",
    }));

    const initialCount = 4;
    const visibleCategories = showAll ? categories : categories.slice(0, initialCount);

    if (loading) {
        return (
            <div className="py-16 bg-white text-center">
                <h2 className="text-3xl font-bold text-gray-900">Категорії</h2>
                <p className="mt-4 max-w-md mx-auto text-gray-500">Завантаження...</p>
            </div>
        );
    }

    return (
        <div className="py-16 bg-white text-center">
            <h2 className="text-3xl font-bold text-gray-900">Категорії</h2>
            <p className="mt-4 max-w-md mx-auto text-gray-500">
                Ми підготували різні пакети товарів — оберіть категорію, яка вам підходить найбільше.
            </p>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
                {visibleCategories.map((category) => (
                    <div key={category.name} className="flex flex-col items-center bg-white">
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-68 h-68 object-cover rounded-xl shadow-sm"
                        />
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-500">Товарів: {category.products}</p>
                    </div>
                ))}
            </div>

            {!showAll && categories.length > initialCount && (
                <button
                    className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
                    onClick={() => setShowAll(true)}
                >
                    Подивитись усі
                    <svg
                        className="w-6 h-6 ml-3 -mr-2 rotate-90"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            )}
        </div>
    );
}
