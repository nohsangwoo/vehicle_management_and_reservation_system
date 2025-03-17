import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VehicleStatusChart } from "@/components/vehicle-status-chart"
import { RecentVehicles } from "@/components/recent-vehicles"
import { TodayReservations } from "@/components/today-reservations"
import { DashboardCards } from "@/components/dashboard-cards"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">대시보드</h1>
      <DashboardCards />
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="vehicles">차량</TabsTrigger>
          <TabsTrigger value="reservations">예약</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>차량 상태</CardTitle>
                <CardDescription>현재 차량 상태 분포</CardDescription>
              </CardHeader>
              <CardContent>
                <VehicleStatusChart />
              </CardContent>
            </Card>
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>최근 입차 차량</CardTitle>
                <CardDescription>최근에 입차한 차량 목록</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentVehicles />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>오늘의 예약</CardTitle>
              <CardDescription>오늘 예약된 차량 목록</CardDescription>
            </CardHeader>
            <CardContent>
              <TodayReservations />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vehicles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>차량 관리</CardTitle>
              <CardDescription>모든 차량 정보 관리</CardDescription>
            </CardHeader>
            <CardContent>
              <p>차량 관리 페이지로 이동하세요.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reservations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>예약 관리</CardTitle>
              <CardDescription>모든 예약 정보 관리</CardDescription>
            </CardHeader>
            <CardContent>
              <p>예약 관리 페이지로 이동하세요.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

