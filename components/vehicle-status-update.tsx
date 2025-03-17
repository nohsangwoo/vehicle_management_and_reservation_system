"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"

interface VehicleStatusUpdateProps {
  vehicle: any
}

export function VehicleStatusUpdate({ vehicle }: VehicleStatusUpdateProps) {
  const [status, setStatus] = useState(vehicle.status)
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 여기서 상태 업데이트 API 호출
    console.log("상태 업데이트:", { status, notes })
    // 성공 메시지 표시
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="status">상태 변경</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger id="status">
            <SelectValue placeholder="상태 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="입차">입차</SelectItem>
            <SelectItem value="상담 대기">상담 대기</SelectItem>
            <SelectItem value="상담 완료">상담 완료</SelectItem>
            <SelectItem value="출차">출차</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">메모</Label>
        <Textarea
          id="notes"
          placeholder="상태 변경에 대한 메모를 입력하세요..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full">
        <CheckCircle className="mr-2 h-4 w-4" />
        상태 업데이트
      </Button>
    </form>
  )
}

