"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

export function VehicleFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useState("")

  const clearFilters = () => {
    setSearchTerm("")
    setStatus("")
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="번호판 또는 소유자 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="상태 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 상태</SelectItem>
            <SelectItem value="입차">입차</SelectItem>
            <SelectItem value="상담 대기">상담 대기</SelectItem>
            <SelectItem value="상담 완료">상담 완료</SelectItem>
            <SelectItem value="출차">출차</SelectItem>
          </SelectContent>
        </Select>
        {(searchTerm || status) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="mr-2 h-4 w-4" />
            필터 초기화
          </Button>
        )}
      </div>
    </div>
  )
}

