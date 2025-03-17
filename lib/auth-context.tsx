"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// 사용자 타입 정의
export interface User {
  id: string
  email: string
  name: string
  role: string
  avatar?: string
}

// 인증 컨텍스트 타입 정의
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
}

// 기본값으로 컨텍스트 생성
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
})

// 인증 컨텍스트 제공자 컴포넌트
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 컴포넌트 마운트 시 로컬 스토리지에서 사용자 정보 로드
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("auth_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("사용자 정보 로드 중 오류:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  // 로그인 함수
  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("auth_user", JSON.stringify(userData))
  }

  // 로그아웃 함수
  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// 인증 컨텍스트 사용을 위한 훅
export function useAuth() {
  return useContext(AuthContext)
}

