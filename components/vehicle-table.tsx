"use client"

import { useState, useEffect } from "react"
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
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { MoreHorizontal, Calendar, Edit, Trash, RefreshCw } from "lucide-react"
import Link from "next/link"
import { getVehicles, deleteVehicle } from "@/lib/local-storage"
import { useToast } from "@/hooks/use-toast"
import { Vehicle } from "@/lib/types"

export function VehicleTable() {
  const [vehicles, setVehicles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // 컴포넌트 마운트 시 차량 데이터 가져오기
  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = () => {
    setIsLoading(true)
    try {
      const vehiclesData = getVehicles()
      setVehicles(vehiclesData)
    } catch (error) {
      console.error("차량 데이터 가져오기 오류:", error)
      toast({
        title: "오류 발생",
        description: "차량 데이터를 가져오는 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("정말로 이 차량을 삭제하시겠습니까?")) {
      try {
        setIsLoading(true)
        await deleteVehicle(id)
        fetchVehicles()
        toast({
          title: "삭제 완료",
          description: "차량이 삭제되었습니다.",
        })
      } catch (error) {
        toast({
          title: "오류 발생",
          description: "차량 삭제 중 오류가 발생했습니다.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleRefresh = () => {
    fetchVehicles()
    toast({
      title: "새로고침 완료",
      description: "차량 목록이 새로고침되었습니다.",
    })
  }

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
      <div className="p-4 flex justify-end">
        <Button variant="outline" size="sm" onClick={handleRefresh} className="mr-2">
          <RefreshCw className="mr-2 h-4 w-4" />
          새로고침
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard/vehicles/new">
            + 새 차량 등록
          </Link>
        </Button>
      </div>
      
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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                데이터를 불러오는 중...
              </TableCell>
            </TableRow>
          ) : vehicles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                등록된 차량이 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            vehicles.map((vehicle: Vehicle) => (
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
                        <Link href={`/dashboard/reservations/new?vehicleId=${vehicle.id}`} className="flex w-full items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          예약 생성
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(vehicle.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        삭제
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

