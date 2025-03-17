"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Search, CalendarIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function AccountingFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  const clearFilters = () => {
    setSearchTerm("")
    setServiceType("")
    setDateRange({ from: undefined, to: undefined })
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="고객명 또는 차량번호 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Select value={serviceType} onValueChange={setServiceType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="서비스 유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 서비스</SelectItem>
            <SelectItem value="정비">정비</SelectItem>
            <SelectItem value="부품 교체">부품 교체</SelectItem>
            <SelectItem value="주차">주차</SelectItem>
            <SelectItem value="세차">세차</SelectItem>
            <SelectItem value="기타">기타</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !dateRange.from && !dateRange.to && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "yyyy-MM-dd", { locale: ko })} ~{" "}
                    {format(dateRange.to, "yyyy-MM-dd", { locale: ko })}
                  </>
                ) : (
                  format(dateRange.from, "yyyy-MM-dd", { locale: ko })
                )
              ) : (
                <span>날짜 선택</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={setDateRange}
              locale={ko}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {(searchTerm || serviceType || dateRange.from) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="mr-2 h-4 w-4" />
            필터 초기화
          </Button>
        )}
      </div>
    </div>
  )
}

