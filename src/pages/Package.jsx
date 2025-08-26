import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { usePackages } from "../data/usePackages";
import { FaSpinner } from "react-icons/fa";
import { useCartStore } from "../../store/cartStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/thumbs";

export default function Package() {
    const { id } = useParams();
    const { packages, loading } = usePackages();
    const [selectedOption, setSelectedOption] = useState("");
    const [quantity, setQuantity] = useState(100);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const addToCart = useCartStore((state) => state.addToCart);

    const pack = packages.find((p) => p._id === id);

    useEffect(() => {
        if (pack && Array.isArray(pack.price) && pack.price.length > 0) {
            const minQty = Math.min(...pack.price.map((p) => p.minQty));
            setQuantity(minQty);
        }
    }, [pack]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <FaSpinner className="animate-spin text-indigo-600 text-3xl" />
            </div>
        );
    }

    if (!pack) {
        return (
            <div className="flex justify-center items-center h-[50vh] text-gray-600">
                Пакет не знайдено
            </div>
        );
    }

    const getBaseUnitPrice = () => {
        if (!Array.isArray(pack.price) || pack.price.length === 0) return 0;
        const sorted = [...pack.price].sort((a, b) => b.minQty - a.minQty);
        const level = sorted.find((p) => quantity >= p.minQty) || sorted[sorted.length - 1];
        return level.price;
    };

    const getUnitPrice = () => {
        const basePrice = getBaseUnitPrice();
        let printPrice = 0;
        if (selectedOption && Array.isArray(pack.printOptions)) {
            const filtered = pack.printOptions.filter((p) => p.code === selectedOption);
            const sorted = filtered.sort((a, b) => b.quantity - a.quantity);
            const matching = sorted.find((p) => quantity >= p.quantity) || sorted[sorted.length - 1];
            printPrice = matching?.price || 0;
        }
        return basePrice + printPrice;
    };

    const totalPrice = (getUnitPrice() * quantity).toFixed(2);

    const handleAddToCart = () => {
        addToCart({
            _id: pack._id,
            name: pack.name + (selectedOption ? ` (${selectedOption})` : ""),
            image: pack.images?.[0],
            price: getUnitPrice(),
            quantity,
        });
    };

    return (
        <section className="py-10 lg:py-20 relative">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* LEFT SIDE — PRODUCT INFO */}
                    <div className="flex flex-col justify-start order-last lg:order-none lg:pr-8">
                        <h2 className="mb-3 font-bold text-3xl leading-10 text-gray-900">
                            {pack.name}
                        </h2>

                        {/* Уменьшенный отступ на телефоне */}
                        <p className="text-gray-500 text-base font-normal mb-4 sm:mb-6">
                            {pack.description}
                        </p>

                        {/* ВАРИАНТЫ ПЕЧАТИ */}
                        <div className="mb-6">
                            <p className="font-medium text-lg text-gray-900 mb-4">Виберіть варіант друку:</p>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setSelectedOption("")}
                                    className={`px-4 py-2 rounded-full border ${selectedOption === ""
                                        ? "bg-indigo-600 text-white border-indigo-600"
                                        : "bg-white text-gray-900 border-gray-300 hover:border-indigo-400"
                                        }`}
                                >
                                    Без друку
                                </button>
                                {[...new Set(pack.printOptions.map((p) => p.code))].map((code) => (
                                    <button
                                        key={code}
                                        onClick={() => setSelectedOption(code)}
                                        className={`px-4 py-2 rounded-full border ${selectedOption === code
                                            ? "bg-indigo-600 text-white border-indigo-600"
                                            : "bg-white text-gray-900 border-gray-300 hover:border-indigo-400"
                                            }`}
                                    >
                                        {code}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* КОЛИЧЕСТВО */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                className="w-32 px-3 py-2 border border-gray-300 rounded-lg shadow-sm appearance-none
                [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                            />
                        </div>

                        {/* ЦЕНЫ */}
                        <div className="mb-4 text-xl font-bold text-inherit">
                            Ціна за 1 шт: {getUnitPrice().toFixed(2)} грн
                        </div>

                        {/* КНОПКА */}
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-4 rounded-full bg-yellow-500 text-white font-semibold text-lg shadow-sm hover:bg-yellow-600 transition"
                        >
                            Додати в кошик
                        </button>
                    </div>

                    {/* RIGHT SIDE — IMAGES */}
                    <div className="w-full lg:max-w-[450px] lg:ml-16">
                        <Swiper
                            loop
                            spaceBetween={24}
                            modules={[Thumbs]}
                            thumbs={{ swiper: thumbsSwiper }}
                            className="mb-6"
                        >
                            {pack.images?.map((img, idx) => (
                                <SwiperSlide key={idx}>
                                    <img
                                        src={img}
                                        alt="Product"
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
