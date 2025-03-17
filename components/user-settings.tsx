"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Eye, EyeOff } from "lucide-react"

export function UserSettings() {
  const [userInfo, setUserInfo] = useState({
    name: "관리자",
    email: "admin@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 사용자 정보 업데이트 API 호출
    console.log("사용자 정보 업데이트:", userInfo)
    // 성공 메시지 표시
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">이름</Label>
          <Input id="name" name="name" value={userInfo.name} onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">이메일</Label>
          <Input id="email" name="email" type="email" value={userInfo.email} onChange={handleChange} />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">비밀번호 변경</h3>

        <div className="grid gap-2">
          <Label htmlFor="currentPassword">현재 비밀번호</Label>
          <div className="relative">
            <Input
              id="currentPassword"
              name="currentPassword"
              type={showPassword ? "text" : "password"}
              value={userInfo.currentPassword}
              onChange={handleChange}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="newPassword">새 비밀번호</Label>
          <Input
            id="newPassword"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            value={userInfo.newPassword}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={userInfo.confirmPassword}
            onChange={handleChange}
          />
        </div>
      </div>

      <Separator />

      <div className="flex justify-end">
        <Button type="submit">
          <CheckCircle className="mr-2 h-4 w-4" />
          저장
        </Button>
      </div>
    </form>
  )
}

