import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br to-white px-4 py-12">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className='max-w-2xl'>
        <div className="z-10 text-center max-w-2xl">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="text-blue-600 w-8 h-8" />
            <span className="uppercase tracking-wide text-blue-600 font-semibold text-sm">
              Онлайн-магазин пакетів
            </span>
          </div>

          <h1 className="text-5xl sm:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
            Оберіть ідеальний <span className="text-blue-600">пакет</span> для свого бізнесу
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Рекламні, фірмові або крафтові пакети — замовляйте якісну продукцію з урахуванням усіх потреб.
          </p>

          <Link
            to="/catalog"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-md transition duration-300"
          >
            Перейти до каталогу
          </Link>
        </div>
      </div>
    </div>
  )
}
