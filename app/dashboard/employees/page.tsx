import { EmployeeTable } from "@/components/employee-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function EmployeesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">직원 관리</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />새 직원 등록
        </Button>
      </div>
      <EmployeeTable />
    </div>
  )
}

