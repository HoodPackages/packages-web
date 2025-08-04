import React, { useState } from "react";

const categories = [
    {
        name: "Полієтіленові пакети",
        products: 96,
        image:
            "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Крафт пакети",
        products: 74,
        image:
            "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Картонні пакети",
        products: 81,
        image:
            "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Кур'єрські пакети",
        products: 37,
        image:
            "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Коробки",
        products: 136,
        image:
            "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Поліпропіленові пакети",
        products: 64,
        image:
            "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Футболки",
        products: 103,
        image:
            "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Сумки",
        products: 31,
        image:
            "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Тішью",
        products: 24,
        image:
            "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Пакети Саше",
        products: 34,
        image:
            "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Коробки",
        products: 119,
        image:
            "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "DTF-друк",
        products: 1,
        image:
            "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
];

export default function CategorySection() {
    const [showAll, setShowAll] = useState(false);
    const initialCount = 4;
    const visibleCategories = showAll ? categories : categories.slice(0, initialCount);

    return (
        <div className="py-16 bg-white text-center">
            <h2 className="text-3xl font-bold text-gray-900">Категорії</h2>
            <p className="mt-4 max-w-md mx-auto text-gray-500">
                Ми підготували різні пакети товарів — оберіть категорію, яка вам підходить найбільше.
            </p>

            {/* 
                Сетка:
                - 2 колонки на мобильных и sm экранах (по умолчанию и sm)
                - 4 колонки на lg и выше (десктоп)
            */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
                {visibleCategories.map((category) => (
                    <div
                        key={category.name}
                        className="flex flex-col items-center bg-white"
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-auto object-cover rounded-xl shadow-sm"
                        />
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">
                            {category.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {category.products} Products Available
                        </p>
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
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}
