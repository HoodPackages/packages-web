import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20">
            <h1 className="text-9xl font-extrabold text-yellow-500">404</h1>
            <p className="mt-4 text-2xl font-semibold text-gray-700">
                Сторінку не знайдено
            </p>
            <p className="mt-2 text-gray-500 max-w-md">
                Можливо, ви ввели неправильну адресу або сторінка була видалена.
            </p>

            <Link
                to="/"
                className="mt-8 px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg shadow hover:bg-yellow-600 transition duration-200"
            >
                Повернутися на головну
            </Link>
        </div>
    );
}
