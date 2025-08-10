import { useNavigate } from 'react-router-dom';

export default function OrderFailurePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white px-4">
      <div className="bg-white rounded-3xl shadow-lg max-w-md w-full p-8 text-center">
        <h1 className="text-4xl font-extrabold text-red-500 mb-6">Оплата не пройшла</h1>
        <p className="text-gray-700 mb-8 text-lg">
          Будь ласка, спробуйте ще раз або зв’яжіться з підтримкою.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/payment')}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
          >
            Спробувати знову
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md transition"
          >
            Повернутись до кошика
          </button>
        </div>
      </div>
    </div>
  );
}
