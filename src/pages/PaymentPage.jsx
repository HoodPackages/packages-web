import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { API_URL } from "../data/config";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, comment, layoutFile } = useCartStore();

  const contact = location.state?.contact || {};
  const delivery = location.state?.delivery || {};
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function handleFinishOrder() {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("contact", JSON.stringify(contact));
    formData.append("delivery", JSON.stringify(delivery));
    formData.append("cart", JSON.stringify(cart));
    formData.append("paymentMethod", paymentMethod);
    formData.append("total", total);
    formData.append("comment", comment);
    const language = localStorage.getItem("app_language") || "en";
    formData.append("language", language);

    if (layoutFile) formData.append("layout", layoutFile);

    try {
      const res = await fetch(`${API_URL}/api/pdf/generate-order`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      navigate("/order-success", { state: { orderId: data.orderId } });
    } catch (err) {
      setError("Помилка створення замовлення");
    } finally {
      setLoading(false);
    }
  }

  function handlePaymentFailure() {
    navigate("/order-failure");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white px-4 py-8">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-3xl p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-yellow-600 mb-6 text-center">
          Підтвердження замовлення
        </h1>

        <div className="mb-6 text-gray-700 bg-yellow-50 border border-yellow-100 rounded-xl p-4 shadow-sm">
          <p><span className="font-semibold">Замовник:</span> {contact.name || "—"}</p>
          <p><span className="font-semibold">Телефон:</span> {contact.phone || "—"}</p>
          <p><span className="font-semibold">Email:</span> {contact.email || "—"}</p>
          {delivery.method && (
            <p>
              <span className="font-semibold">Доставка:</span> {delivery.method} — {delivery.address}
            </p>
          )}
        </div>

        <div className="mb-6 overflow-x-auto rounded-xl shadow-md border border-yellow-200">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-gray-700 uppercase tracking-wider">
                <th className="p-3 text-left">Товар</th>
                <th className="p-3 text-center">К-сть</th>
                <th className="p-3 text-center">Ціна/шт.</th>
                <th className="p-3 text-center">Сума</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-yellow-100 hover:bg-yellow-50 transition"
                >
                  <td className="p-3 font-medium text-gray-800">{item.name}</td>
                  <td className="p-3 text-center">{item.quantity}</td>
                  <td className="p-3 text-center">{item.price}CHF</td>
                  <td className="p-3 text-center font-semibold text-yellow-600">
                    {(item.price * item.quantity).toFixed(2)}CHF
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-yellow-50">
                <td colSpan="3" className="p-3 text-right font-bold text-lg">
                  Разом:
                </td>
                <td className="p-3 text-center font-bold text-lg text-yellow-700">
                  {total.toFixed(2)}CHF
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Спосіб оплати</h2>

          <div className="mb-6">
            <h3 className="text-yellow-600 font-semibold mb-3 border-b border-yellow-300 pb-1">
              Для фізичних осіб
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { value: "card", label: "Карткою онлайн" },
                { value: "gpay", label: "Google Pay / Apple Pay" },
              ].map(({ value, label }) => (
                <label
                  key={value}
                  className={`flex items-center gap-3 p-4 border rounded-xl shadow-sm cursor-pointer transition
            ${paymentMethod === value
                      ? "bg-yellow-50 border-yellow-400 shadow-md"
                      : "bg-white border-gray-200 hover:border-yellow-300 hover:shadow-md"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={value}
                    checked={paymentMethod === value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 accent-yellow-500"
                  />
                  <span className="text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-yellow-600 font-semibold mb-3 border-b border-yellow-300 pb-1">
              Для юридичних осіб
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { value: "invoice", label: "Рахунок-фактура" },
                { value: "bank", label: "Прямий банківський переказ" },
              ].map(({ value, label }) => (
                <label
                  key={value}
                  className={`flex items-center gap-3 p-4 border rounded-xl shadow-sm cursor-pointer transition
            ${paymentMethod === value
                      ? "bg-yellow-50 border-yellow-400 shadow-md"
                      : "bg-white border-gray-200 hover:border-yellow-300 hover:shadow-md"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={value}
                    checked={paymentMethod === value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 accent-yellow-500"
                  />
                  <span className="text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleFinishOrder}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition w-full sm:w-auto cursor-pointer"
          >
            Завершити замовлення
          </button>

          <button
            onClick={handlePaymentFailure}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-lg transition w-full sm:w-auto cursor-pointer"
          >
            Відмінити
          </button>
        </div>

      </div>
    </div>
  );
}
