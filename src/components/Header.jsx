import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { PackageSearch } from 'lucide-react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="mt-5 flex items-center justify-between px-6 py-3 md:py-4 shadow max-w-7xl rounded-full mx-auto w-full bg-white sticky top-0 z-50">
      {/* Логотип */}
      <div className="flex items-center space-x-2">
        <PackageSearch className="text-blue-600 w-6 h-6" />
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 hover:text-blue-600 transition"
        >
          Package
        </Link>
      </div>

      {/* Навигация */}
      <nav
        id="menu"
        className={`
          flex-col md:flex-row flex items-center justify-center gap-8 text-gray-900 text-sm font-normal
          max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden max-md:h-full
          max-md:bg-white/50 max-md:backdrop-blur
          transition-[width]
          md:static
          max-md:flex
          ${menuOpen ? 'max-md:w-full' : 'max-md:w-0'}
        `}
      >
        <Link
          to="/"
          className={({ isActive }) =>
            `hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`
          }
          onClick={() => setMenuOpen(false)}
        >
          Головна
        </Link>
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            `hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`
          }
          onClick={() => setMenuOpen(false)}
        >
          Каталог
        </NavLink>
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            `hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`
          }
          onClick={() => setMenuOpen(false)}
        >
          Контакти
        </NavLink>
        <NavLink
          to="/docs"
          className={({ isActive }) =>
            `hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`
          }
          onClick={() => setMenuOpen(false)}
        >
          Портфоліо
        </NavLink>

        {/* Кнопка закрытия меню на мобилках */}
        <button
          id="closeMenu"
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      {/* Правая часть: кнопки */}
      <div className="flex items-center space-x-4">

        <Link
          to="/signup"
          className="hidden md:flex bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
        >
          Увійти
        </Link>

        {/* Кнопка открытия меню на мобилках */}
        <button
          id="openMenu"
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}