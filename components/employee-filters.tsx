"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

export function EmployeeFilters({ 
  searchTerm, 
  setSearchTerm, 
  status, 
  setStatus 
}: { 
  searchTerm: string, 
  setSearchTerm: (value: string) => void, 
  status: string, 
  setStatus: (value: string) => void 
}) {
  const clearFilters = () => {
    setSearchTerm("")
    setStatus("")
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="이름, 직책 또는 이메일 검색..."
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
            <SelectItem value="active">활성</SelectItem>
            <SelectItem value="inactive">비활성</SelectItem>
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