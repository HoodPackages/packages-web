import { useNavigate, useLocation } from 'react-router-dom';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const contact = location.state?.contact || {};

  function handlePaymentSuccess() {
    // Здесь можно вызвать API подтверждения оплаты и получить статус
    navigate('/order-success');
  }

  function handlePaymentFailure() {
    navigate('/order-failure');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white px-4">
      <div className="bg-white rounded-3xl shadow-lg max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-yellow-600 mb-6 text-center">Оплата замовлення</h1>

        <div className="mb-8 text-gray-700">
          <p className="mb-2"><span className="font-semibold">Замовник:</span> {contact.name || 'Користувач'}</p>
          <p className="mb-2"><span className="font-semibold">Телефон:</span> {contact.phone || '-'}</p>
          <p><span className="font-semibold">Email:</span> {contact.email || '-'}</p>
        </div>

        {/* Здесь можно подключить интеграцию с платёжным сервисом */}

        <div className="flex justify-center gap-4">
          <button
            onClick={handlePaymentSuccess}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition"
          >
            Оплатити
          </button>
          <button
            onClick={handlePaymentFailure}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-lg transition"
          >
            Відмінити
          </button>
        </div>
      </div>
    </div>
  );
}
