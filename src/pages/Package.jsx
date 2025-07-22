import { useParams } from "react-router-dom"
import { useState } from "react"
import { packages } from "../data/mockPackages"

export default function Package() {
  const { id } = useParams()
  const pack = packages.find(p => p.id === id)
  const [selectedOption, setSelectedOption] = useState("")
  const [quantity, setQuantity] = useState(1)

  if (!pack) return <div className="text-center mt-10 text-xl">Пакет не знайдено</div>

  // Определяем цену за одну единицу с учётом оптовой скидки
  const getUnitPrice = () => {
    const base = pack.basePrice
    const printCost = selectedOption ? pack.printOptions[selectedOption] || 0 : 0
    const fullBase = base + printCost

    // Ищем подходящий множитель по количеству
    const bulkLevel = [...pack.bulkPricing]
      .reverse()
      .find(tier => quantity >= tier.minQty)

    return fullBase * (bulkLevel?.priceMultiplier || 1)
  }

  const totalPrice = (getUnitPrice() * quantity).toFixed(2)

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{pack.name}</h1>

      <img
        src={pack.image}
        alt={pack.name}
        className="w-full max-h-72 object-contain mb-6 rounded"
      />

      <p className="text-gray-600 mb-6">{pack.description}</p>

      <div>
        <h2 className="text-lg font-medium mb-3">Виберіть варіант друку:</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedOption("")}
            className={`px-4 py-2 rounded border ${
              selectedOption === ""
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300 hover:border-blue-400"
            }`}
          >
            Без друку
          </button>

          {Object.entries(pack.printOptions).map(([option, optPrice]) => (
            <button
              key={option}
              onClick={() => setSelectedOption(option)}
              className={`px-4 py-2 rounded border transition-all duration-200 ${
                selectedOption === option
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-300 hover:border-blue-400"
              }`}
            >
              {option}
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
          onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
          className="w-32 px-3 py-2 border border-gray-300 rounded shadow-sm"
          min={1}
        />
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
