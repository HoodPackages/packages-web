import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { API_URL } from "../data/config"

export default function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    login: "",
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Помилка реєстрації")
      }

      navigate("/login")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm border border-gray-200 rounded-2xl p-8">

        <div className="mb-10">
          <h1 className="text-2xl font-bold text-black tracking-tight">
            Кульок
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Створення акаунту
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Імʼя або назва компанії
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="
                w-full rounded-lg border border-gray-300 px-3 py-2
                focus:outline-none focus:border-yellow-400
              "
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Логін
            </label>
            <input
              name="login"
              value={form.login}
              onChange={handleChange}
              required
              className="
                w-full rounded-lg border border-gray-300 px-3 py-2
                focus:outline-none focus:border-yellow-400
              "
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="
                w-full rounded-lg border border-gray-300 px-3 py-2
                focus:outline-none focus:border-yellow-400
              "
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Пароль
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="
                w-full rounded-lg border border-gray-300 px-3 py-2
                focus:outline-none focus:border-yellow-400
              "
            />
          </div>

          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full rounded-lg bg-black text-white py-2.5 font-medium
              hover:bg-yellow-400 hover:text-black
              transition-colors
            "
          >
            {loading ? "Зачекайте…" : "Зареєструватися"}
          </button>
        </form>

        <div className="mt-8 text-sm text-gray-500">
          Вже маєте акаунт?
          <Link
            to="/login"
            className="ml-1 text-black font-medium hover:underline"
          >
            Увійти
          </Link>
        </div>

      </div>
    </div>
  )
}
