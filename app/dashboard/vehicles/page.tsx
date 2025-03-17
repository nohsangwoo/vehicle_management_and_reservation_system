"use client"

import { useState } from "react"
import { VehicleTable } from "@/components/vehicle-table"
import { VehicleFilters } from "@/components/vehicle-filters"

export default function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useState("")
  console.log("searchTerm:", searchTerm)
  console.log("status:", status)

  return (
    <div className="flex flex-col gap-4">
      <VehicleFilters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        status={status}
        setStatus={setStatus}
      />
      <VehicleTable 
        searchTerm={searchTerm}
        status={status}
      />
    </div>
  )
}

