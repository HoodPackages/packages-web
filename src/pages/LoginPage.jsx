import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import { API_URL } from "../data/config"

export default function LoginPage() {
  const navigate = useNavigate()
  const loginUser = useAuthStore(state => state.login)

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Помилка входу")
      }

      loginUser(data.user, data.token)
      navigate("/")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm border border-gray-200 rounded-2xl p-8">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-black tracking-tight">
            Кульок
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Вхід в акаунт
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Логін
            </label>
            <input
              value={login}
              onChange={e => setLogin(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2
                         focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2
                         focus:outline-none focus:border-yellow-400"
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
            {loading ? "Зачекайте…" : "Увійти"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-sm text-gray-500">
          Немає акаунту?
          <Link
            to="/register"
            className="ml-1 text-black font-medium hover:underline"
          >
            Реєстрація
          </Link>
        </div>

      </div>
    </div>
  )
}
