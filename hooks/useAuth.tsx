"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/types/user"
import type { LoginCredentials, RegisterData, AuthResponse } from "@/types/auth"
import { toast } from "sonner"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<AuthResponse>
  register: (data: RegisterData) => Promise<AuthResponse>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token")
        if (token) {
          const mockUser: User = {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            avatar: "/default-image/comic2.jpg?height=40&width=40",
            role: "reader",
            isAuthenticated: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          setUser(mockUser)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("auth_token")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const mockUser: User = {
        id: "1",
        name: "John Doe",
        email: credentials.email,
        avatar: "/default-image/comic2.jpg?height=40&width=40",
        role: "reader",
        isAuthenticated: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      const token = "mock_jwt_token_" + Date.now()
      localStorage.setItem("auth_token", token)
      setUser(mockUser)
      toast.success("Login successful!")
      return { success: true, message: "Login successful", user: mockUser, token }
    } catch (error) {
      const errorMessage = "Login failed. Please try again."
      toast.error(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const register = async (data: RegisterData): Promise<AuthResponse> => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const mockUser: User = {
        id: "2",
        name: data.name,
        email: data.email,
        avatar: "/default-image/comic2.jpg?height=40&width=40",
        role: "reader",
        isAuthenticated: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      const token = "mock_jwt_token_" + Date.now()
      localStorage.setItem("auth_token", token)
      setUser(mockUser)
      toast.success("Registration successful!")
      return { success: true, message: "Registration successful", user: mockUser, token }
    } catch (error) {
      const errorMessage = "Registration failed. Please try again."
      toast.error(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setUser(null)
    toast.success("Logged out successfully")
    router.push("/")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}