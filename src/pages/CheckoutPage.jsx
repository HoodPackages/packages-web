import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    branch: ''
  });
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.phone || !form.email || !form.city || !form.branch) {
      setError('Будь ласка, заповніть всі поля');
      return;
    }

    setError('');
    navigate('/payment', { state: { contact: form, delivery: { method: 'Нова Пошта', address: `${form.city}, відділення №${form.branch}` } } });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white px-4">
      <div className="bg-white rounded-3xl shadow-lg max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-yellow-600 mb-6 text-center">
          Оформлення замовлення
        </h1>

        {error && (
          <p className="bg-yellow-100 text-yellow-700 border border-yellow-300 rounded-md p-3 mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            name="name"
            placeholder="Ім'я та прізвище"
            value={form.name}
            onChange={handleChange}
            className="border border-yellow-300 rounded-lg px-4 py-3 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <input
            name="phone"
            placeholder="Телефон (наприклад: 380xxxxxxxxx)"
            value={form.phone}
            onChange={handleChange}
            className="border border-yellow-300 rounded-lg px-4 py-3 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-yellow-300 rounded-lg px-4 py-3 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <input
            name="city"
            placeholder="Місто"
            value={form.city}
            onChange={handleChange}
            className="border border-yellow-300 rounded-lg px-4 py-3 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <input
            name="branch"
            placeholder="Номер відділення Нової Пошти"
            value={form.branch}
            onChange={handleChange}
            className="border border-yellow-300 rounded-lg px-4 py-3 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />

          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Продовжити до оплати
          </button>
        </form>

        <button
          onClick={() => navigate('/cart')}
          className="mt-6 w-full text-yellow-600 hover:text-yellow-700 font-medium"
        >
          ← Назад до кошика
        </button>
      </div>
    </div>
  );
}
