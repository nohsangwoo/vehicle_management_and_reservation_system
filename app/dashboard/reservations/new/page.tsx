"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { ArrowLeft, CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { mockEmployees } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { addReservation } from "@/lib/local-storage"
import Link from "next/link"

export default function NewReservationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // 현재 날짜와 시간 설정
  const now = new Date()
  const defaultDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0)

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(defaultDate)
  const [selectedTime, setSelectedTime] = useState<string>("09:00")

  const [formData, setFormData] = useState({
    customerName: "",
    licensePlate: "",
    date: defaultDate.toISOString(),
    service: "",
    assignedTo: "",
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)

      // 날짜와 시간을 결합하여 ISO 문자열로 변환
      const [hours, minutes] = selectedTime.split(":").map(Number)
      const newDate = new Date(date)
      newDate.setHours(hours, minutes, 0, 0)

      setFormData((prev) => ({ ...prev, date: newDate.toISOString() }))
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value
    setSelectedTime(time)

    if (selectedDate) {
      // 날짜와 시간을 결합하여 ISO 문자열로 변환
      const [hours, minutes] = time.split(":").map(Number)
      const newDate = new Date(selectedDate)
      newDate.setHours(hours, minutes, 0, 0)

      setFormData((prev) => ({ ...prev, date: newDate.toISOString() }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      // 날짜와 시간이 올바르게 설정되었는지 확인
      if (!selectedDate) {
        toast({
          title: "날짜 오류",
          description: "예약 날짜를 선택해주세요.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // 필수 필드 검증
      if (!formData.customerName || !formData.licensePlate || !formData.service || !formData.assignedTo) {
        toast({
          title: "입력 오류",
          description: "모든 필수 항목을 입력해주세요.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // 새 예약 추가
      await addReservation(formData)

      toast({
        title: "예약 생성 완료",
        description: "새 예약이 성공적으로 생성되었습니다.",
      })

      // 성공 후 예약 목록 페이지로 이동
      router.push("/dashboard/reservations")
      router.refresh()
    } catch (error) {
      console.error("예약 처리 오류:", error)
      toast({
        title: "오류 발생",
        description: "예약 처리 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/reservations">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">새 예약 생성</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>새 예약 정보 입력</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customerName">고객명</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="licensePlate">차량 번호</Label>
                <Input
                  id="licensePlate"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>예약 날짜</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP", { locale: ko }) : <span>날짜 선택</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateChange}
                      locale={ko}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">예약 시간</Label>
                <Input id="time" type="time" value={selectedTime} onChange={handleTimeChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">서비스</Label>
              <Input
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                placeholder="예: 엔진 오일 교체, 타이어 교체 등"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo">담당자</Label>
              <Select
                value={formData.assignedTo}
                onValueChange={(value) => handleSelectChange("assignedTo", value)}
                required
              >
                <SelectTrigger id="assignedTo">
                  <SelectValue placeholder="담당자 선택" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmployees
                    .filter((employee) => employee.isActive)
                    .map((employee) => (
                      <SelectItem key={employee.id} value={employee.name}>
                        {employee.name} ({employee.position})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">메모</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="추가 정보나 특별 요청사항"
                rows={3}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/reservations")}>
              취소
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              예약 생성
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

