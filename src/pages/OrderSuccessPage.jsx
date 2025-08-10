import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCartStore } from '../../store/cartStore';

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const clearCart = useCartStore(state => state.clearCart);

  useEffect(() => {
    // Очищаем корзину при монтировании компонента
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white px-4">
      <div className="bg-white rounded-3xl shadow-lg max-w-md w-full p-8 text-center">
        <h1 className="text-4xl font-extrabold text-yellow-500 mb-6">Дякуємо за замовлення!</h1>
        <p className="text-gray-700 mb-8 text-lg">
          Ми зв’яжемося з вами найближчим часом.
        </p>
        <button
          onClick={() => navigate('/cart')}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition"
        >
          Повернутись до магазину
        </button>
      </div>
    </div>
  );
}
