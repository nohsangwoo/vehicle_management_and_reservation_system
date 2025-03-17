"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import type { Reservation } from "@/lib/types"
import { Loader2, Edit, Trash, RefreshCw, PlusCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { getReservations, deleteReservation as removeReservation, updateReservation as updateReservationData } from "@/lib/local-storage"

export default function ReservationsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedDayReservations, setSelectedDayReservations] = useState<Reservation[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // 컴포넌트 마운트 시 예약 데이터 가져오기
  useEffect(() => {
    fetchReservationsData()
  }, [])

  // 날짜 변경 또는 예약 데이터 변경 시 선택된 날짜의 예약 목록 업데이트
  useEffect(() => {
    if (date) {
      filterReservationsByDate(date)
    }
  }, [date, reservations])

  const fetchReservationsData = async () => {
    setIsLoading(true)
    try {
      // 로컬 스토리지에서 직접 예약 데이터 가져오기
      const reservationsData = getReservations()
      setReservations(reservationsData)

      if (date) {
        filterReservationsByDate(date)
      }
    } catch (error) {
      console.error("예약 데이터 가져오기 오류:", error)
      toast({
        title: "오류 발생",
        description: "예약 데이터를 가져오는 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 특정 날짜의 예약만 필터링하는 함수
  const filterReservationsByDate = (selectedDate: Date) => {
    const filteredReservations = reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.date)
      return (
        reservationDate.getDate() === selectedDate.getDate() &&
        reservationDate.getMonth() === selectedDate.getMonth() &&
        reservationDate.getFullYear() === selectedDate.getFullYear()
      )
    })
    setSelectedDayReservations(filteredReservations)
  }

  // 선택한 날짜에 예약이 있는지 확인하는 함수
  const hasReservationOnDay = (day: Date) => {
    return reservations.some((reservation) => {
      const reservationDate = new Date(reservation.date)
      return (
        reservationDate.getDate() === day.getDate() &&
        reservationDate.getMonth() === day.getMonth() &&
        reservationDate.getFullYear() === day.getFullYear()
      )
    })
  }

  // 날짜 선택 시 해당 날짜의 예약 목록 가져오기
  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
  }

  const handleStatusChange = async (id: string, status: "예약됨" | "확인됨" | "취소됨" | "완료됨") => {
    try {
      setIsLoading(true)
      // 로컬 스토리지의 updateReservation 함수 사용
      await updateReservationData(id, { status })
      
      // 상태 업데이트 성공 시 예약 목록 새로고침
      fetchReservationsData()
      toast({
        title: "상태 변경 완료",
        description: "예약 상태가 변경되었습니다.",
      })
    } catch (error) {
      toast({
        title: "오류 발생",
        description: "상태 변경 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("정말로 이 예약을 삭제하시겠습니까?")) {
      try {
        setIsLoading(true)
        // 로컬 스토리지의 deleteReservation 함수 사용
        await removeReservation(id)

        // 삭제 성공 시 예약 목록 새로고침
        fetchReservationsData()
        toast({
          title: "삭제 완료",
          description: "예약이 삭제되었습니다.",
        })
      } catch (error) {
        toast({
          title: "오류 발생",
          description: "삭제 중 오류가 발생했습니다.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleRefresh = () => {
    fetchReservationsData()
    toast({
      title: "새로고침 완료",
      description: "예약 목록이 새로고침되었습니다.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "예약됨":
        return "bg-blue-500"
      case "확인됨":
        return "bg-green-500"
      case "취소됨":
        return "bg-red-500"
      case "완료됨":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">예약 관리</h1>
        <Button asChild>
          <Link href="/dashboard/reservations/new">
            <PlusCircle className="mr-2 h-4 w-4" />새 예약 생성
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-1">
          <CardContent className="p-4">
            <div className="mb-4 flex justify-end">
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="mr-2 h-4 w-4" />
                새로고침
              </Button>
            </div>

            {isLoading ? (
              <div className="flex h-[300px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleSelect}
                locale={ko}
                modifiers={{
                  hasReservation: (day) => hasReservationOnDay(day),
                }}
                modifiersStyles={{
                  hasReservation: {
                    fontWeight: "bold",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                  },
                }}
                className="rounded-md border"
              />
            )}
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="p-4">
            <h3 className="mb-4 text-lg font-medium">
              {date ? format(date, "yyyy년 MM월 dd일", { locale: ko }) : "날짜를 선택하세요"}
            </h3>

            {isLoading ? (
              <div className="flex h-[200px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : selectedDayReservations.length === 0 ? (
              <p className="text-center text-muted-foreground">예약이 없습니다.</p>
            ) : (
              <div className="space-y-4">
                {selectedDayReservations.map((reservation) => (
                  <div key={reservation.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(reservation.status)}>{reservation.status}</Badge>
                        <span className="font-medium">
                          {format(new Date(reservation.date), "HH:mm", { locale: ko })}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(reservation.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/dashboard/reservations/${reservation.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="font-medium">{reservation.customerName}</p>
                      <p className="text-sm text-muted-foreground">{reservation.licensePlate}</p>
                    </div>

                    <div className="mt-2 flex justify-between">
                      <span className="text-sm">서비스: {reservation.service}</span>
                      <span className="text-sm">담당자: {reservation.assignedTo}</span>
                    </div>

                    {reservation.notes && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <p>메모: {reservation.notes}</p>
                      </div>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={reservation.status === "예약됨" ? "default" : "outline"}
                        onClick={() => handleStatusChange(reservation.id, "예약됨")}
                      >
                        예약됨
                      </Button>
                      <Button
                        size="sm"
                        variant={reservation.status === "확인됨" ? "default" : "outline"}
                        onClick={() => handleStatusChange(reservation.id, "확인됨")}
                      >
                        확인됨
                      </Button>
                      <Button
                        size="sm"
                        variant={reservation.status === "취소됨" ? "default" : "outline"}
                        onClick={() => handleStatusChange(reservation.id, "취소됨")}
                      >
                        취소됨
                      </Button>
                      <Button
                        size="sm"
                        variant={reservation.status === "완료됨" ? "default" : "outline"}
                        onClick={() => handleStatusChange(reservation.id, "완료됨")}
                      >
                        완료됨
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

