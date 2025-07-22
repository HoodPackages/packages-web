import { Link } from 'react-router-dom'

const categories = ['internet', 'tv']

export default function CategoryList() {
  return (
    <div className="flex gap-4">
      {categories.map(cat => (
        <Link key={cat} to={`/catalog/${cat}`} className="text-blue-500 underline">
          {cat}
        </Link>
      ))}
    </div>
  )
}
