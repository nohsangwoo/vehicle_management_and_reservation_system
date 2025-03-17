"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Info, Mail, Lock } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showTestAccountModal, setShowTestAccountModal] = useState(false)

  // 페이지 로드 시 모달 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTestAccountModal(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "로그인에 실패했습니다.")
      }

      // 로그인 성공 처리
      login(data.user)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  const fillTestCredentials = () => {
    setEmail("test@naver.com")
    setPassword("test")
    setShowTestAccountModal(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">차량 관리 시스템</CardTitle>
          <CardDescription>계정 정보를 입력하여 로그인하세요</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">비밀번호</Label>
                <Button variant="link" className="h-auto p-0 text-sm" type="button">
                  비밀번호 찾기
                </Button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              로그인
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* 테스트 계정 안내 모달 */}
      <Dialog open={showTestAccountModal} onOpenChange={setShowTestAccountModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Info className="h-5 w-5 text-blue-500" />
              테스트 계정 안내
            </DialogTitle>
            <DialogDescription>
              이 페이지는 테스트 목적으로 제공됩니다. 아래 계정 정보로 로그인하실 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
              <span className="font-medium text-muted-foreground">이메일:</span>
              <code className="rounded bg-blue-100 dark:bg-blue-900 px-2 py-1 font-mono">test@naver.com</code>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
              <span className="font-medium text-muted-foreground">비밀번호:</span>
              <code className="rounded bg-blue-100 dark:bg-blue-900 px-2 py-1 font-mono">test</code>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
            <Button type="button" variant="outline" onClick={() => setShowTestAccountModal(false)}>
              직접 입력하기
            </Button>
            <Button type="button" onClick={fillTestCredentials}>
              테스트 계정으로 자동 입력
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

