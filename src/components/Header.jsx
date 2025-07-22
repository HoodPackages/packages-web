import { Link, NavLink } from 'react-router-dom'
import { PackageSearch } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Логотип */}
          <div className="flex items-center space-x-2">
            <PackageSearch className="text-blue-600 w-6 h-6" />
            <Link
              to="/"
              className="text-xl font-bold text-gray-800 hover:text-blue-600 transition"
            >
              Пакеты
            </Link>
          </div>

          {/* Навигация */}
          <nav className="flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium hover:text-blue-600 transition ${
                  isActive ? 'text-blue-600' : 'text-gray-700'
                }`
              }
            >
              Главная
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                `text-sm font-medium hover:text-blue-600 transition ${
                  isActive ? 'text-blue-600' : 'text-gray-700'
                }`
              }
            >
              Каталог
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
