"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { CheckCircle } from "lucide-react"

export function SystemSettings() {
  const [settings, setSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    notificationsEnabled: true,
    dataRetentionDays: "90",
    darkMode: false,
    language: "ko",
  })

  const handleSwitchChange = (name: string) => {
    setSettings((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 시스템 설정 업데이트 API 호출
    console.log("시스템 설정 업데이트:", settings)
    // 성공 메시지 표시
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="autoBackup">자동 백업</Label>
            <p className="text-sm text-muted-foreground">시스템 데이터 자동 백업 활성화</p>
          </div>
          <Switch
            id="autoBackup"
            checked={settings.autoBackup}
            onCheckedChange={() => handleSwitchChange("autoBackup")}
          />
        </div>

        {settings.autoBackup && (
          <div className="grid gap-2 pl-6">
            <Label htmlFor="backupFrequency">백업 주기</Label>
            <Select
              value={settings.backupFrequency}
              onValueChange={(value) => handleSelectChange("backupFrequency", value)}
            >
              <SelectTrigger id="backupFrequency">
                <SelectValue placeholder="백업 주기 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">매시간</SelectItem>
                <SelectItem value="daily">매일</SelectItem>
                <SelectItem value="weekly">매주</SelectItem>
                <SelectItem value="monthly">매월</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notificationsEnabled">알림</Label>
            <p className="text-sm text-muted-foreground">시스템 알림 활성화</p>
          </div>
          <Switch
            id="notificationsEnabled"
            checked={settings.notificationsEnabled}
            onCheckedChange={() => handleSwitchChange("notificationsEnabled")}
          />
        </div>

        <Separator />

        <div className="grid gap-2">
          <Label htmlFor="dataRetentionDays">데이터 보관 기간 (일)</Label>
          <Input
            id="dataRetentionDays"
            name="dataRetentionDays"
            type="number"
            value={settings.dataRetentionDays}
            onChange={handleInputChange}
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="darkMode">다크 모드</Label>
            <p className="text-sm text-muted-foreground">어두운 테마 사용</p>
          </div>
          <Switch id="darkMode" checked={settings.darkMode} onCheckedChange={() => handleSwitchChange("darkMode")} />
        </div>

        <Separator />

        <div className="grid gap-2">
          <Label htmlFor="language">언어</Label>
          <Select value={settings.language} onValueChange={(value) => handleSelectChange("language", value)}>
            <SelectTrigger id="language">
              <SelectValue placeholder="언어 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ko">한국어</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
              <SelectItem value="zh">中文</SelectItem>
            </SelectContent>
          </Select>
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

