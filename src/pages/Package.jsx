import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { usePackages } from "../data/usePackages";
import { FaSpinner } from "react-icons/fa";
import { useCartStore } from "../../store/cartStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import { useAuthStore } from "../../store/authStore";

import "swiper/css";
import "swiper/css/thumbs";

export default function Package() {
    const { id } = useParams();
    const { packages, loading } = usePackages();
    const [selectedOption, setSelectedOption] = useState("");
    const [quantity, setQuantity] = useState(100);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const addToCart = useCartStore((state) => state.addToCart);

    const [totalPrice, setTotalPrice] = useState("0.00");

    const [lang, setLang] = useState(window.getAppLanguage());

    const isAuth = useAuthStore(state => state.isAuth);
    const discount = useAuthStore(state => state.user?.discount || 0);

    const pack = packages.find((p) => p._id === id);

    useEffect(() => {
        if (!pack) return;

        if (Array.isArray(pack.price) && pack.price.length > 0) {
            const minQty = Math.min(...pack.price.map((p) => p.minQty));
            setQuantity(minQty);
        }

        document.title = pack.name;
    }, [pack]);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentLang = window.getAppLanguage();
            if (currentLang !== lang) {
                setLang(currentLang); // форсируем перерисовку
            }
        }, 500);

        return () => clearInterval(interval);
    }, [lang]);

    const getBaseUnitPrice = () => {
        if (!pack || !Array.isArray(pack.price) || pack.price.length === 0) return 0;

        const sorted = [...pack.price].sort((a, b) => b.minQty - a.minQty);
        const level = sorted.find((p) => quantity >= p.minQty) || sorted[sorted.length - 1];
        return Number(level.price);
    };

    const getUnitPrice = () => {
        if (!pack) return 0;

        const basePrice = getBaseUnitPrice();

        let printPrice = 0;
        if (selectedOption && Array.isArray(pack.printOptions)) {
            const filtered = pack.printOptions.filter((p) => p.code === selectedOption);
            const sorted = filtered.sort((a, b) => b.quantity - a.quantity);
            const matching = sorted.find((p) => quantity >= p.quantity) || sorted[sorted.length - 1];
            printPrice = matching?.price || 0;
        }
        const unitPriceBeforeDiscount = basePrice + printPrice;

        const discountedPrice = isAuth
            ? Math.min(
                unitPriceBeforeDiscount,
                Math.floor(unitPriceBeforeDiscount * (1 - discount / 100) * 100) / 100
            )
            : unitPriceBeforeDiscount;

        return discountedPrice;
    };


    useEffect(() => {
        if (!pack) return;
        setTotalPrice((getUnitPrice() * quantity).toFixed(2));
    }, [quantity, selectedOption, isAuth, discount, lang, pack]);

    // const totalPrice = (getUnitPrice() * quantity).toFixed(2);

    const handleAddToCart = () => {
        addToCart({
            _id: pack._id,
            name: pack.name + (selectedOption ? ` (${selectedOption})` : ""),
            image: pack.images?.[0],
            price: getUnitPrice(),
            quantity,
            discount: isAuth ? discount : 0
        });
    };

    if (loading) {
        window.scroll(0, 0);

        return (
            <div className="flex justify-center items-center h-[50vh]">
                <FaSpinner className="animate-spin text-indigo-600 text-4xl" />
            </div>
        );
    }

    if (!pack) {
        return (
            <div className="flex justify-center items-center h-[50vh] text-gray-600 text-lg font-medium">
                Пакет не знайдено
            </div>
        );
    }

    return (
        <section className="py-12 lg:py-20 relative bg-gradient-to-b from-gray-50 to-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT CONTENT */}
                    <div className="flex flex-col lg:pr-10">
                        <h2 className="mb-4 font-extrabold text-4xl lg:text-5xl leading-tight text-gray-900 tracking-tight">
                            {pack.name}
                        </h2>

                        <p className="text-gray-600 text-base leading-relaxed mb-8">
                            {pack.description}
                        </p>


                        {/* PRINT OPTIONS */}
                        <div className="mb-8">
                            <p className="font-semibold text-lg text-gray-900 mb-3">
                                Виберіть варіант друку:
                            </p>
                            <div className="flex flex-wrap gap-3 max-h-[220px] overflow-y-auto">
                                <button
                                    onClick={() => setSelectedOption("")}
                                    className={`px-5 py-2.5 rounded-full border transition-all duration-200 shadow-sm text-sm font-medium ${selectedOption === ""
                                        ? "bg-indigo-600 text-white border-indigo-600 cursor-pointer"
                                        : "bg-white text-gray-800 border-gray-300 hover:border-indigo-400 cursor-pointer"
                                        }`}
                                >
                                    Без друку
                                </button>

                                {[...new Set(pack.printOptions.map((p) => p.code))].map((code) => (
                                    <button
                                        key={code}
                                        onClick={() => setSelectedOption(code)}
                                        className={`px-5 py-2.5 rounded-full border transition-all duration-200 shadow-sm text-sm font-medium ${selectedOption === code
                                            ? "bg-indigo-600 text-white border-indigo-600 cursor-pointer"
                                            : "bg-white text-gray-800 border-gray-300 hover:border-indigo-400 cursor-pointer"
                                            }`}
                                    >
                                        {code}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* QUANTITY */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Кількість (шт.):
                            </label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                onBlur={() => {
                                    const val = Number(quantity);
                                    const minQtyFromPack = Math.min(...pack.price.map((p) => p.minQty));
                                    if (isNaN(val) || val < minQtyFromPack) {
                                        setQuantity(minQtyFromPack);
                                    } else {
                                        setQuantity(val);
                                    }
                                }}
                                className="w-32 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-center text-base font-medium"
                            />
                        </div>

                        {/* PRICE */}
                        <div className="mb-6 text-2xl font-extrabold text-gray-900">
                            Ціна за штуку:{" "}
                            {isAuth && discount > 0 ? (
                                <>
                                    <span>{getUnitPrice().toFixed(2)} грн</span>
                                    <span className="ml-2 text-sm text-gray-500 line-through">
                                        {(getBaseUnitPrice() + (selectedOption ? pack.printOptions.find(p => p.code === selectedOption)?.price || 0 : 0)).toFixed(2)} грн
                                    </span>
                                </>
                            ) : (
                                <span>{getUnitPrice().toFixed(2)} грн</span>
                            )}
                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold text-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transition-all cursor-pointer"
                        >
                            Додати в кошик — {totalPrice} грн
                        </button>
                    </div>

                    {/* RIGHT CONTENT (IMAGES) */}
                    <div className="w-full lg:max-w-[500px] lg:ml-auto bg-white rounded-2xl shadow-lg p-6">
                        <Swiper
                            loop
                            spaceBetween={24}
                            modules={[Thumbs]}
                            thumbs={{ swiper: thumbsSwiper }}
                            className="mb-6 rounded-xl overflow-hidden"
                        >
                            {pack.images?.map((img, idx) => (
                                <SwiperSlide key={idx}>
                                    <img
                                        src={img}
                                        alt={pack.name}
                                        className="w-full h-auto object-contain rounded-lg"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}
