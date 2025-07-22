import { Link } from "react-router-dom"

export default function PackageCard({ pack }) {
  return (
    <Link
      to={`/package/${pack.id}`}
      className="block bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="w-full aspect-[4/3]">
        <img
          src={pack.image}
          alt={pack.name}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{pack.name}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-3">{pack.description}</p>

        <div className="mt-3 text-right">
          <span className="inline-block bg-blue-100 text-blue-700 font-bold text-sm px-3 py-1 rounded-full">
            от {pack.basePrice} грн
          </span>
        </div>
      </div>
    </Link>
  )
}
