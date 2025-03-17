"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { mockVehiclePhotos } from "@/lib/mock-data"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Download, Upload } from "lucide-react"

interface VehiclePhotosProps {
  vehicleId: string
}

export function VehiclePhotos({ vehicleId }: VehiclePhotosProps) {
  const [photos, setPhotos] = useState<any[]>([])

  useEffect(() => {
    // 모의 데이터에서 차량의 사진 가져오기
    const vehiclePhotos = mockVehiclePhotos.filter((p) => p.vehicleId === vehicleId)
    setPhotos(vehiclePhotos)
  }, [vehicleId])

  return (
    <div className="py-4">
      <div className="mb-4 flex justify-end">
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          사진 업로드
        </Button>
      </div>

      {photos.length === 0 ? (
        <div className="py-4 text-center text-muted-foreground">등록된 사진이 없습니다.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <div key={photo.id} className="overflow-hidden rounded-lg border">
              <div className="aspect-video relative">
                <img
                  src={photo.url || "/placeholder.svg"}
                  alt={photo.description}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-2">
                <p className="font-medium">{photo.description}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(photo.uploadedAt), "yyyy-MM-dd HH:mm", { locale: ko })}
                </p>
                <div className="mt-2 flex justify-end">
                  <Button variant="ghost" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    다운로드
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

