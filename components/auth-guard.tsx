"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // 로딩 중이 아니고, 인증되지 않았으며, 현재 경로가 로그인 페이지가 아닌 경우
    if (!isLoading && !isAuthenticated && pathname !== "/login") {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router, pathname])

  // 로딩 중이거나 인증되지 않았고 로그인 페이지가 아닌 경우 아무것도 렌더링하지 않음
  if ((isLoading || !isAuthenticated) && pathname !== "/login") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    )
  }

  // 인증된 경우 또는 로그인 페이지인 경우 자식 컴포넌트 렌더링
  return <>{children}</>
}

