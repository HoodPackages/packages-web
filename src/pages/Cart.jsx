import { useCartStore } from "../../store/cartStore";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCartStore();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-yellow-50">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty Cart"
          className="w-40 mb-6 opacity-80"
        />
        <h2 className="text-3xl font-extrabold text-yellow-600 mb-2">Ваш кошик порожній</h2>
        <p className="text-gray-600 mb-6">Додайте товари, щоб оформити замовлення</p>
        <Link
          to="/"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-8 py-3 rounded-xl shadow-lg font-semibold transition-colors"
        >
          Перейти до покупок
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-yellow-50 rounded-3xl shadow-lg">
      <h1 className="text-4xl font-extrabold text-yellow-600 mb-10 text-center">🛒 Ваш кошик</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg mr-6"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                <p className="text-gray-600 mt-1">
                  {item.price} грн × {item.quantity} шт
                </p>
                <p className="text-yellow-500 font-extrabold mt-2 text-lg">
                  {item.price * item.quantity} грн
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700 ml-6 text-2xl transition-colors"
                aria-label="Видалити товар"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <aside className="bg-white rounded-2xl shadow-md p-8 h-fit flex flex-col">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-yellow-300 pb-3">
            Підсумок
          </h3>
          <div className="flex justify-between mb-3 text-gray-700">
            <span>Товари:</span>
            <span className="font-semibold">{totalPrice} грн</span>
          </div>
          <div className="flex justify-between mb-6 text-gray-700">
            <span>Доставка:</span>
            <span className="font-semibold">Безкоштовно</span>
          </div>
          <div className="flex justify-between text-2xl font-extrabold text-yellow-600 mb-8">
            <span>Разом:</span>
            <span>{totalPrice} грн</span>
          </div>

          <Link
            to="/checkout"
            className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-white py-4 rounded-xl font-extrabold shadow-lg transition-colors"
          >
            Оформити замовлення
          </Link>

          <button
            onClick={clearCart}
            className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
          >
            Очистити кошик
          </button>
        </aside>
      </div>
    </div>
  );
}
