"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { VehicleDetails } from "@/components/vehicle-details"
import { VehicleRepairHistory } from "@/components/vehicle-repair-history"
import { VehiclePhotos } from "@/components/vehicle-photos"
import { VehicleStatusUpdate } from "@/components/vehicle-status-update"
import { mockVehicles } from "@/lib/mock-data"
import { ArrowLeft, Calendar, Edit, Trash } from "lucide-react"
import Link from "next/link"

export default function VehicleDetailPage() {
  const { id } = useParams()
  const [vehicle, setVehicle] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 모의 데이터에서 차량 정보 가져오기
    const foundVehicle = mockVehicles.find((v) => v.id === id)
    setVehicle(foundVehicle)
    setLoading(false)
  }, [id])

  if (loading) {
    return <div className="flex items-center justify-center h-full">로딩 중...</div>
  }

  if (!vehicle) {
    return <div className="flex items-center justify-center h-full">차량을 찾을 수 없습니다.</div>
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/vehicles">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">차량 상세 정보</h1>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="w-full md:w-2/3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{vehicle.licensePlate}</CardTitle>
                <CardDescription>
                  {vehicle.model} ({vehicle.year})
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">기본 정보</TabsTrigger>
                  <TabsTrigger value="history">정비 이력</TabsTrigger>
                  <TabsTrigger value="photos">사진</TabsTrigger>
                  <TabsTrigger value="status">상태 변경</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <VehicleDetails vehicle={vehicle} />
                </TabsContent>
                <TabsContent value="history">
                  <VehicleRepairHistory vehicleId={vehicle.id} />
                </TabsContent>
                <TabsContent value="photos">
                  <VehiclePhotos vehicleId={vehicle.id} />
                </TabsContent>
                <TabsContent value="status">
                  <VehicleStatusUpdate vehicle={vehicle} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>빠른 작업</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                예약 생성
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                정보 수정
              </Button>
              <Button className="w-full justify-start" variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                차량 삭제
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>고객 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">이름</p>
                  <p>{vehicle.owner.name}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">연락처</p>
                  <p>{vehicle.owner.phone}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">이메일</p>
                  <p>{vehicle.owner.email}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">방문 횟수</p>
                  <p>{vehicle.visitCount}회</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

