import { create } from "zustand"

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  isAuth: !!localStorage.getItem("token"),

  login: (user, token) => {
    localStorage.setItem("token", token)
    set({ user, token, isAuth: true })
  },

  setUser: (user) => {
    set({ user, isAuth: true })
  },
  
  logout: () => {
    localStorage.removeItem("token")
    set({ user: null, token: null, isAuth: false })
  }
}))
