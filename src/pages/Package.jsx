import { useParams } from "react-router-dom"
import { useState } from "react"
import { usePackages } from "../data/usePackages"

export default function Package() {
    const { id } = useParams()
    const { packages, loading } = usePackages();
    const [selectedOption, setSelectedOption] = useState("")
    const [quantity, setQuantity] = useState(100)

    if (loading) return <div className="text-center mt-10 text-xl">Завантаження...</div>;

    const pack = packages.find(p => p._id === id)

    if (!pack) return <div className="text-center mt-10 text-xl">Пакет не знайдено</div>

    // Найти цену за единицу по количеству
    const getBaseUnitPrice = () => {
        if (!Array.isArray(pack.price) || pack.price.length === 0) return 0;

        // Сортируем по minQty по убыванию и ищем подходящий уровень
        const sorted = [...pack.price].sort((a, b) => b.minQty - a.minQty);
        const level = sorted.find(p => quantity >= p.minQty) || sorted[sorted.length - 1];

        return level.price;
    }

    // Вычисление финальной цены за единицу (с учётом печати)
    const getUnitPrice = () => {
        const basePrice = getBaseUnitPrice();

        let printPrice = 0;
        if (selectedOption) {
            const selectedPrint = pack.printOptions?.find(p => p.code === selectedOption);
            printPrice = selectedPrint?.price || 0;
        }

        return basePrice + printPrice;
    };

    const totalPrice = (getUnitPrice() * quantity).toFixed(2);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{pack.name}</h1>

            <img
                src={pack.images?.[0]} // если images — массив
                alt={pack.name}
                className="w-full max-h-72 object-contain mb-6 rounded"
            />

            <p className="text-gray-600 mb-6">{pack.description}</p>

            <div>
                <h2 className="text-lg font-medium mb-3">Виберіть варіант друку:</h2>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setSelectedOption("")}
                        className={`px-4 py-2 rounded border ${selectedOption === ""
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-800 border-gray-300 hover:border-blue-400"
                            }`}
                    >
                        Без друку
                    </button>

                    {Array.isArray(pack.printOptions) &&
                        pack.printOptions.map(({ code }) => (
                            <button
                                key={code}
                                onClick={() => setSelectedOption(code)}
                                className={`px-4 py-2 rounded border transition-all duration-200 ${selectedOption === code
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-800 border-gray-300 hover:border-blue-400"
                                    }`}
                            >
                                {code}
                            </button>
                        ))}
                </div>
            </div>

            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Кількість (шт.):
                </label>
                <input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    onBlur={() => {
                        const val = Number(quantity);
                        if (isNaN(val) || val < 100) {
                            setQuantity(100);
                        } else {
                            setQuantity(val);
                        }
                    }}
                    className="w-32 px-3 py-2 border border-gray-300 rounded shadow-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]" />
            </div>

            <div className="mt-6 text-xl font-bold text-blue-700">
                Ціна за штуку: {getUnitPrice().toFixed(2)} грн
            </div>

            <div className="mt-1 text-2xl font-bold text-green-700">
                Підсумкова ціна: {totalPrice} грн
            </div>
        </div>
    )
}
