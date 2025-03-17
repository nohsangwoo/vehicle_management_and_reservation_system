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
import Link from "next/link"

export default function NewAccountingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // 현재 날짜 설정
  const now = new Date()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(now)

  const [formData, setFormData] = useState({
    customerName: "",
    licensePlate: "",
    date: now.toISOString(),
    serviceType: "",
    amount: "",
    paymentMethod: "",
    status: "미결제",
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
      setFormData((prev) => ({ ...prev, date: date.toISOString() }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      // 필수 필드 검증
      if (!formData.customerName || !formData.licensePlate || !formData.serviceType || !formData.amount) {
        toast({
          title: "입력 오류",
          description: "모든 필수 항목을 입력해주세요.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // 금액이 숫자인지 확인
      if (isNaN(Number(formData.amount))) {
        toast({
          title: "금액 오류",
          description: "금액은 숫자만 입력 가능합니다.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // 여기서 실제로는 API 호출을 통해 데이터를 저장할 것입니다.
      // 지금은 모의 지연만 추가합니다.
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "정산 등록 완료",
        description: "새 정산 내역이 성공적으로 등록되었습니다.",
      })

      // 성공 후 정산 목록 페이지로 이동
      router.push("/dashboard/accounting")
      router.refresh()
    } catch (error) {
      console.error("정산 처리 오류:", error)
      toast({
        title: "오류 발생",
        description: "정산 처리 중 오류가 발생했습니다.",
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
          <Link href="/dashboard/accounting">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">새 정산 등록</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>정산 정보 입력</CardTitle>
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
                <Label>정산 날짜</Label>
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
                <Label htmlFor="serviceType">서비스 유형</Label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) => handleSelectChange("serviceType", value)}
                  required
                >
                  <SelectTrigger id="serviceType">
                    <SelectValue placeholder="서비스 유형 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="정비">정비</SelectItem>
                    <SelectItem value="부품 교체">부품 교체</SelectItem>
                    <SelectItem value="주차">주차</SelectItem>
                    <SelectItem value="세차">세차</SelectItem>
                    <SelectItem value="기타">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="amount">금액 (원)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">결제 방법</Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                >
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="결제 방법 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="현금">현금</SelectItem>
                    <SelectItem value="신용카드">신용카드</SelectItem>
                    <SelectItem value="계좌이체">계좌이체</SelectItem>
                    <SelectItem value="모바일결제">모바일결제</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="status">결제 상태</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)} required>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="결제 상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="미결제">미결제</SelectItem>
                    <SelectItem value="결제완료">결제완료</SelectItem>
                    <SelectItem value="환불">환불</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedTo">담당자</Label>
                <Select value={formData.assignedTo} onValueChange={(value) => handleSelectChange("assignedTo", value)}>
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
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/accounting")}>
              취소
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              정산 등록
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

