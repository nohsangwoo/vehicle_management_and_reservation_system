import { VehicleTable } from "@/components/vehicle-table"
import { VehicleFilters } from "@/components/vehicle-filters"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function VehiclesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">차량 관리</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />새 차량 등록
        </Button>
      </div>
      <VehicleFilters />
      <VehicleTable />
    </div>
  )
}

