"use client"

import { useState } from "react"
import { AccountingTable } from "@/components/accounting-table"
import { AccountingFilters } from "@/components/accounting-filters"
import { AccountingSummary } from "@/components/accounting-summary"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function AccountingPage() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">정산 관리</h1>
        <Button asChild>
          <Link href="/dashboard/accounting/new">
            <PlusCircle className="mr-2 h-4 w-4" />새 정산 등록
          </Link>
        </Button>
      </div>

      <AccountingSummary />

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="pending">미결제</TabsTrigger>
          <TabsTrigger value="completed">결제완료</TabsTrigger>
          <TabsTrigger value="refunded">환불</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <AccountingFilters />
          <AccountingTable status="all" />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <AccountingFilters />
          <AccountingTable status="미결제" />
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <AccountingFilters />
          <AccountingTable status="결제완료" />
        </TabsContent>

        <TabsContent value="refunded" className="space-y-4">
          <AccountingFilters />
          <AccountingTable status="환불" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

