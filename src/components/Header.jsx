import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePackages } from '../data/usePackages'
import { FaSpinner } from "react-icons/fa";
import { Package } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";

export default function Header() {
  const loggedIn = useAuthStore(state => state.isAuth)

  const { packages, loading } = usePackages();
  const [state, setState] = useState(false)
  const [dropdownState, setDropDownState] = useState({ isActive: false, idx: null })

  const cartCount = useCartStore(state => state.cart.length);

  const uniqueCategories = [...new Set(packages.map(pkg => pkg.category || 'Без категорії'))];

  const dynamicDropdownNavs = uniqueCategories.map(category => ({
    label: category,
    path: `/catalog/${encodeURIComponent(category)}`,
  }));

  const navigation = [
    { title: "Каталог", path: "javascript:void(0)", isDropdown: true, navs: dynamicDropdownNavs },
    { title: "Контакти", path: "/contactUs", isDropdown: false },
    { title: "Про нас", path: "/about", isDropdown: false },
    { title: "Оплата", path: "javascript:void(0)", isDropdown: false },
    { title: "Кольори Pantone", path: "/pantone", isDropdown: false }
  ];

  return (
    <>
      <nav className={`relative z-50 bg-white w-full md:static md:text-sm md:border-none ${state ? "shadow-lg rounded-b-xl md:shadow-none z-50" : ""}`}>
        <div className="items-center gap-x-14 px-4 max-w-screen-2xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/">
              <img
                className='mt-1 lg:mt-0 md:mt-0'
                src="/LogoKuliok.PNG"
                width={180}
                height={110}
                alt="Кульок Лого"
              />
            </Link>

            <div className="md:hidden">
              <button className="text-gray-500 hover:text-gray-800"
                onClick={() => setState(!state)}>
                {
                  state ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>
                  )
                }
              </button>
            </div>
          </div>

          <div className={`nav-menu flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
            <ul className="items-center space-y-6 md:flex md:space-x-6 md:space-y-0 z-50">
              {
                navigation.map((item, idx) => (
                  <li key={idx}>
                    {
                      item.isDropdown ? (
                        <button className="w-full flex items-center justify-between gap-1 font-medium text-gray-700 hover:text-yellow-400"
                          onClick={() =>
                            setDropDownState(prev =>
                              prev.idx === idx && prev.isActive
                                ? { isActive: false, idx: null }
                                : { isActive: true, idx }
                            )
                          }
                        >
                          {item.title}
                          {
                            dropdownState.idx === idx && dropdownState.isActive ? (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                              </svg>
                            )
                          }
                        </button>
                      ) : (
                        <Link to={item.path} className="block text-gray-700 hover:text-yellow-400 font-medium">
                          {item.title}
                        </Link>
                      )
                    }

                    {item.isDropdown && dropdownState.idx === idx && dropdownState.isActive && (
                      <div className="mt-6 inset-x-0 top-20 max-w-5xl mx-auto md:absolute md:mt-4 z-50 rounded-2xl overflow-hidden shadow-lg bg-white">
                        <ul className="bg-white rounded-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
                          {[...new Map(packages.map(p => [p.category, p])).values()].map((catItem) => (
                            <li key={item._id} className="group">
                              <Link
                                to={`/catalog/${catItem.category}`}
                                className="flex gap-3 items-center"
                                onClick={() =>
                                  setDropDownState({ isActive: false, idx: null })
                                }
                              >
                                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center duration-150 group-hover:bg-yellow-400 group-hover:text-white md:w-14 md:h-14">
                                  <Package size={20} />
                                </div>
                                <div>
                                  <span className="text-gray-800 duration-200 group-hover:text-yellow-400 text-sm font-medium md:text-base">
                                    {catItem.category}
                                  </span>
                                  <p className="text-sm text-gray-600 group-hover:text-gray-800 mt-1">
                                    {catItem.name?.slice(0, 30)}...
                                  </p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </li>
                ))
              }

              <div className='flex-1 items-center justify-end gap-x-6 space-y-3 md:flex md:space-y-0'>
                <li>
                  <div className="gtranslate_wrapper notranslate"></div>
                </li>

                <li>
                  <Link
                    to={loggedIn ? "/profile" : "/login"}
                    className="block px-8 py-3.5 font-bold text-center text-white bg-black hover:bg-yellow-400 hover:text-black active:shadow-none rounded-full shadow md:inline"
                  >
                    {loggedIn ? "Профіль" : "Увійти"}
                  </Link>
                </li>

                <li>
                  <Link to="/cart" className="relative flex items-center hover:text-yellow-400">
                    <ShoppingCart size={24} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>
              </div>

            </ul>
          </div>
        </div>
      </nav>
      {
        state && (
          <div
            className="z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setState(false)}
          />
        )
      }
    </>
  )
}