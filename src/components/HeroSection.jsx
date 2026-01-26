import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

export default function HeroSection() {
    const [showArrows, setShowArrows] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 10;
            setShowArrows(!scrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="bg-white relative mb-24">
            <section className="bg-opacity-30 py-1 sm:py-6 lg:py-12">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                        <div>
                            <p className="text-base font-semibold tracking-wider text-yellow-400 uppercase">
                                Друк під замовлення для вашого бренду
                            </p>
                            <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                                Пакети, коробки, футболки та інше
                            </h1>
                            <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                                Друкуємо та постачаємо продукцію для бізнесу й подарунків
                            </p>

                            <button
                                onClick={() => {
                                    document.getElementById("catalog-section")?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start"
                                    });
                                }}
                                className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400 cursor-pointer"
                            >
                                До каталогу
                                <svg
                                    className="w-6 h-6 ml-8 -mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </button>


                            <p className="mt-5 text-gray-600">
                                Ознайомитись з типами оплати:{" "}
                                <Link to="payments" className="text-yellow-400 hover:underline">
                                    Оплата
                                </Link>
                            </p>
                        </div>

                        <div>
                            <img
                                className="w-full"
                                src="/hero-image.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Стрелки прокрутки вниз */}
            {showArrows && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
                    <svg
                        className="w-6 h-6 text-gray-500 animate-bounceDownUp"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    <svg
                        className="w-6 h-6 text-gray-500 animate-bounceDownUp mt-[-10px]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            )}

            {/* Анимация стрелки */}
            <style>
                {`
          @keyframes bounceDownUp {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(6px);
            }
          }

          .animate-bounceDownUp {
            animation: bounceDownUp 1s infinite;
          }
        `}
            </style>
        </div>
    );
}
