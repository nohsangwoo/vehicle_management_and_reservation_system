"use client"

import { Separator } from "@/components/ui/separator"

interface VehicleDetailsProps {
  vehicle: any
}

export function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">차량 정보</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">제조사</p>
              <p>{vehicle.manufacturer}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">모델</p>
              <p>{vehicle.model}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">연식</p>
              <p>{vehicle.year}년</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">색상</p>
              <p>{vehicle.color}</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">입출차 정보</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">입차 시간</p>
              <p>{new Date(vehicle.entryTime).toLocaleString("ko-KR")}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">예상 출차 시간</p>
              <p>{vehicle.expectedExitTime ? new Date(vehicle.expectedExitTime).toLocaleString("ko-KR") : "미정"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">방문 횟수</p>
              <p>{vehicle.visitCount}회</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">마지막 방문</p>
              <p>{vehicle.lastVisit ? new Date(vehicle.lastVisit).toLocaleDateString("ko-KR") : "첫 방문"}</p>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">메모</h3>
        <p className="text-sm">{vehicle.notes || "메모가 없습니다."}</p>
      </div>
    </div>
  )
}

