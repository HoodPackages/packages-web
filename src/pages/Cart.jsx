import { useCartStore } from "../../store/cartStore";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCartStore();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty Cart"
          className="w-40 mb-6 opacity-80"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Ваш кошик порожній</h2>
        <p className="text-gray-500 mb-6">Додайте товари, щоб оформити замовлення</p>
        <Link
          to="/"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Перейти до покупок
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">🛒 Ваш кошик</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          {cart.map(item => (
            <div
              key={item._id}
              className="flex items-center bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-500">{item.price} грн × {item.quantity} шт</p>
                <p className="text-yellow-500 font-bold">{item.price * item.quantity} грн</p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Підсумок</h3>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Товари:</span>
            <span className="font-medium">{totalPrice} грн</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Доставка:</span>
            <span className="font-medium">Безкоштовно</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-800 mb-6">
            <span>Разом:</span>
            <span>{totalPrice} грн</span>
          </div>

          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-lg font-medium shadow-md transition-all">
            Оформити замовлення
          </button>

          <button
            onClick={clearCart}
            className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium transition-all"
          >
            Очистити кошик
          </button>
        </div>
      </div>
    </div>
  );
}
