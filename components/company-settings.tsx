"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { CheckCircle } from "lucide-react"

export function CompanySettings() {
  const [companyInfo, setCompanyInfo] = useState({
    name: "자동차 정비 센터",
    address: "서울특별시 강남구 테헤란로 123",
    phone: "02-1234-5678",
    email: "info@carservice.com",
    website: "https://carservice.com",
    description: "최고의 자동차 정비 서비스를 제공합니다.",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCompanyInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 회사 정보 업데이트 API 호출
    console.log("회사 정보 업데이트:", companyInfo)
    // 성공 메시지 표시
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">회사명</Label>
          <Input id="name" name="name" value={companyInfo.name} onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address">주소</Label>
          <Input id="address" name="address" value={companyInfo.address} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="phone">전화번호</Label>
            <Input id="phone" name="phone" value={companyInfo.phone} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" name="email" type="email" value={companyInfo.email} onChange={handleChange} />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="website">웹사이트</Label>
          <Input id="website" name="website" value={companyInfo.website} onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">회사 소개</Label>
          <Textarea
            id="description"
            name="description"
            value={companyInfo.description}
            onChange={handleChange}
            rows={4}
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

