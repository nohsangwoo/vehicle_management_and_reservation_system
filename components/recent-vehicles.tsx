"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockVehicles } from "@/lib/mock-data"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"
import Link from "next/link"

export function RecentVehicles() {
  const [vehicles] = useState(mockVehicles.slice(0, 5))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "입차":
        return "bg-blue-500"
      case "상담 대기":
        return "bg-yellow-500"
      case "상담 완료":
        return "bg-green-500"
      case "출차":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>번호판</TableHead>
          <TableHead>차종</TableHead>
          <TableHead>소유자</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>입차 시간</TableHead>
          <TableHead className="text-right">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell className="font-medium">{vehicle.licensePlate}</TableCell>
            <TableCell>{vehicle.model}</TableCell>
            <TableCell>{vehicle.owner.name}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
            </TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(vehicle.entryTime), {
                addSuffix: true,
                locale: ko,
              })}
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/dashboard/vehicles/${vehicle.id}`}>상세보기</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

