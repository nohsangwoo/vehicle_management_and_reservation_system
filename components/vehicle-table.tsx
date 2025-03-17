"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockVehicles } from "@/lib/mock-data"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { MoreHorizontal, Calendar, Edit, Trash } from "lucide-react"
import Link from "next/link"

export function VehicleTable() {
  const [vehicles] = useState(mockVehicles)

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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>번호판</TableHead>
            <TableHead>차종</TableHead>
            <TableHead>소유자</TableHead>
            <TableHead>연락처</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>입차 시간</TableHead>
            <TableHead className="text-right">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell className="font-medium">
                <Link href={`/dashboard/vehicles/${vehicle.id}`} className="hover:underline">
                  {vehicle.licensePlate}
                </Link>
              </TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.owner.name}</TableCell>
              <TableCell>{vehicle.owner.phone}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
              </TableCell>
              <TableCell>{format(new Date(vehicle.entryTime), "yyyy-MM-dd HH:mm", { locale: ko })}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>작업</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href={`/dashboard/vehicles/${vehicle.id}`} className="flex w-full items-center">
                        <Edit className="mr-2 h-4 w-4" />
                        상세보기
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      예약 생성
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

