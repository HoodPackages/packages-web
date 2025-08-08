import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePackages } from '../data/usePackages'
import { FaSpinner } from "react-icons/fa";

export default function Header() {
  const { packages, loading } = usePackages();
  const [state, setState] = useState(false)
  const [dropdownState, setDropdownState] = useState({ isActive: false, idx: null })

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

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".nav-menu")) setDropdownState({ isActive: false, idx: null });
    };
  }, []);

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
                alt="Float UI logo"
              />
            </Link>
            <div className="md:hidden">
              <button className="text-gray-500 hover:text-gray-800"
                onClick={() => setState(!state)}
              >
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
                            setDropdownState(prev =>
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

                    {
                      item.isDropdown && dropdownState.idx === idx && dropdownState.isActive && (
                        <div className="mt-6 inset-x-0 top-20 w-full md:absolute md:shadow-md md:mt-0 z-50">
                          {
                            loading ? (
                              <div className="flex justify-center items-center p-6 bg-white rounded-lg shadow max-w-screen-xl mx-auto">
                                <FaSpinner className="animate-spin h-6 w-6 mr-2 text-gray-500" />
                                <span className="text-gray-500 text-lg">Завантаження...</span>
                              </div>
                            ) : (
                              <ul className='bg-white max-w-screen-xl mx-auto grid items-center gap-6 md:p-8 md:grid-cols-2 lg:grid-cols-3 z-50'>
                                {item.navs.map((dropdownItem, i) => (
                                  <li key={i}>
                                    <Link
                                      to={dropdownItem.path}
                                      onClick={() => setDropdownState({ isActive: false, idx: null })}
                                      className="group block p-4 rounded-xl border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-200 ease-in-out text-gray-800 hover:text-yellow-600 text-lg font-semibold shadow-sm hover:shadow-md"
                                    >
                                      <span className="group-hover:underline underline-offset-4">
                                        {dropdownItem.label}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )
                          }
                        </div>
                      )
                    }
                  </li>
                ))
              }
              <div className='flex-1 items-center justify-end gap-x-6 space-y-3 md:flex md:space-y-0'>
                <li>
                  <a href="javascript:void(0)" className="block px-8 py-3.5 font-bold text-center text-white bg-black hover:bg-yellow-400 hover:text-black active:shadow-none rounded-full shadow md:inline">
                    Увійти
                  </a>
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
