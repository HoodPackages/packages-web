import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import { API_URL } from "../data/config"

export default function ProfilePage() {
    const navigate = useNavigate()
    const logoutUser = useAuthStore(state => state.logout)
    const setAuthUser = useAuthStore(state => state.setUser)

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }

        const fetchProfile = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(`${API_URL}/api/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const data = await res.json()
                if (res.status === 401) {
                    logoutUser()
                    navigate("/login")
                    return
                }
                if (!res.ok) throw new Error(data.message || "Помилка сервера")
                setUser(data.user)
                setAuthUser(data.user)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [navigate])

    const handleLogout = () => {
        logoutUser()
        navigate("/")
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Завантаження...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                <p>{error}</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md border border-gray-200 rounded-2xl p-8 shadow-lg">

                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-black">{user.name}</h1>
                    <p className="text-sm text-gray-500 mt-1">Профіль користувача</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Логін</label>
                        <p className="px-3 py-2 border border-gray-300 rounded-lg">{user.login}</p>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <p className="px-3 py-2 border border-gray-300 rounded-lg">{user.email}</p>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Знижка</label>
                        <p className="px-3 py-2 border border-gray-300 rounded-lg">{user.discount}%</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full mt-6 rounded-lg bg-black text-white py-2.5 font-medium hover:bg-yellow-400 hover:text-black transition-colors"
                >
                    Вийти
                </button>
            </div>
        </div>
    )
}
