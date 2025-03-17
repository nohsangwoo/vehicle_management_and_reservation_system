"use client"

import { useState } from "react"
import { EmployeeTable } from "@/components/employee-table"
import { EmployeeFilters } from "@/components/employee-filters"

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useState("")

  return (
    <div className="flex flex-col gap-4">
      <EmployeeFilters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        status={status}
        setStatus={setStatus}
      />
      <EmployeeTable 
        searchTerm={searchTerm}
        statusFilter={status}
      />
    </div>
  )
}

