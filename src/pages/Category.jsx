import { useParams } from 'react-router-dom'
import { packages } from '../data/mockPackages'
import PackageCard from '../components/PackageCard'

export default function Category() {
  const { category } = useParams()
  const filtered = packages.filter(p => p.category === category)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Категория: {category}</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map(pack => (
          <PackageCard key={pack.id} pack={pack} />
        ))}
      </div>
    </div>
  )
}
