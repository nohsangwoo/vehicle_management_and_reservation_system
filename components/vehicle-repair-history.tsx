"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { mockRepairHistory } from "@/lib/mock-data"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Eye } from "lucide-react"

interface VehicleRepairHistoryProps {
  vehicleId: string
}

export function VehicleRepairHistory({ vehicleId }: VehicleRepairHistoryProps) {
  const [repairHistory, setRepairHistory] = useState<any[]>([])

  useEffect(() => {
    // 모의 데이터에서 차량의 정비 이력 가져오기
    const history = mockRepairHistory.filter((h) => h.vehicleId === vehicleId)
    setRepairHistory(history)
  }, [vehicleId])

  if (repairHistory.length === 0) {
    return <div className="py-4 text-center text-muted-foreground">정비 이력이 없습니다.</div>
  }

  return (
    <div className="py-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>날짜</TableHead>
            <TableHead>서비스</TableHead>
            <TableHead>담당자</TableHead>
            <TableHead>비용</TableHead>
            <TableHead className="text-right">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {repairHistory.map((repair) => (
            <TableRow key={repair.id}>
              <TableCell>{format(new Date(repair.date), "yyyy-MM-dd", { locale: ko })}</TableCell>
              <TableCell className="font-medium">{repair.service}</TableCell>
              <TableCell>{repair.technician}</TableCell>
              <TableCell>{repair.cost.toLocaleString()}원</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  상세보기
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

