"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import type { Reservation } from "@/lib/types"
import { fetchReservations } from "@/lib/api-utils"

export function TodayReservations() {
  const [todayReservations, setTodayReservations] = useState<Reservation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTodayReservations = async () => {
      setIsLoading(true)
      try {
        const today = new Date()
        const formattedDate = format(today, "yyyy-MM-dd")

        const response = await fetchReservations({ date: formattedDate })
        if (response.success) {
          // 최대 5개만 표시
          setTodayReservations(response.data.slice(0, 5))
        } else {
          console.error("오늘의 예약 가져오기 오류:", response.message)
          setTodayReservations([])
        }
      } catch (error) {
        console.error("오늘의 예약 가져오기 오류:", error)
        setTodayReservations([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchTodayReservations()

    // 1분마다 데이터 새로고침
    const intervalId = setInterval(fetchTodayReservations, 60000)

    return () => clearInterval(intervalId)
  }, [])

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

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (todayReservations.length === 0) {
    return <div className="p-4 text-center text-muted-foreground">오늘 예약이 없습니다.</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>시간</TableHead>
          <TableHead>고객명</TableHead>
          <TableHead>번호판</TableHead>
          <TableHead>서비스</TableHead>
          <TableHead>담당자</TableHead>
          <TableHead>상태</TableHead>
          <TableHead className="text-right">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todayReservations.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell>{format(new Date(reservation.date), "HH:mm", { locale: ko })}</TableCell>
            <TableCell className="font-medium">{reservation.customerName}</TableCell>
            <TableCell>{reservation.licensePlate}</TableCell>
            <TableCell>{reservation.service}</TableCell>
            <TableCell>{reservation.assignedTo}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(reservation.status)}>{reservation.status}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/dashboard/reservations/${reservation.id}/edit`}>상세보기</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

