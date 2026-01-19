import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { API_URL } from '../data/config';

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const clearCart = useCartStore(state => state.clearCart);

  const orderId = location.state?.orderId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!orderId) return;
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/api/pdf/${orderId}/invoice`, { method: 'HEAD' })
      .then(res => {
        if (!res.ok) throw new Error('PDF недоступний');
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [orderId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-white px-4 py-8 gap-8">
      <div className="bg-white rounded-3xl shadow-lg max-w-md w-full p-8 text-center flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold text-yellow-500">Дякуємо за замовлення!</h1>
        <p className="text-gray-700 text-lg">
          Ми зв’яжемося з вами найближчим часом.
        </p>

        {orderId && (
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 shadow-sm flex flex-col gap-4">
            <h2 className="text-yellow-600 font-semibold text-lg">Ваш рахунок-фактура</h2>

            {loading && <p className="text-gray-600">Завантаження PDF...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && !error && (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={`${API_URL}/api/pdf/${orderId}/invoice`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition text-center"
                >
                  Відкрити PDF
                </a>
                <a
                  href={`${API_URL}/api/pdf/${orderId}/invoice`}
                  download
                  className="bg-yellow-200 hover:bg-yellow-300 text-yellow-700 font-semibold py-3 px-6 rounded-lg shadow-md transition text-center"
                >
                  Завантажити PDF
                </a>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => navigate('/cart')}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition mt-4"
        >
          Повернутись до магазину
        </button>
      </div>
    </div>
  );
}
