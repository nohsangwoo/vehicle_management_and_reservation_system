"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockAccountingData } from "@/lib/mock-data"
import { CreditCard, TrendingUp, TrendingDown, Wallet } from "lucide-react"

export function AccountingSummary() {
  const [summary, setSummary] = useState({
    totalSales: 0,
    pendingPayments: 0,
    completedPayments: 0,
    refunds: 0,
  })

  useEffect(() => {
    // 정산 데이터 요약 계산
    const totalSales = mockAccountingData.reduce((acc, item) => acc + item.amount, 0)

    const pendingPayments = mockAccountingData
      .filter((item) => item.status === "미결제")
      .reduce((acc, item) => acc + item.amount, 0)

    const completedPayments = mockAccountingData
      .filter((item) => item.status === "결제완료")
      .reduce((acc, item) => acc + item.amount, 0)

    const refunds = mockAccountingData
      .filter((item) => item.status === "환불")
      .reduce((acc, item) => acc + item.amount, 0)

    setSummary({
      totalSales,
      pendingPayments,
      completedPayments,
      refunds,
    })
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">총 매출</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.totalSales.toLocaleString()}원</div>
          <p className="text-xs text-muted-foreground">이번 달 총 매출액</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">결제 완료</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.completedPayments.toLocaleString()}원</div>
          <p className="text-xs text-muted-foreground">결제 완료된 금액</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">미결제</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.pendingPayments.toLocaleString()}원</div>
          <p className="text-xs text-muted-foreground">아직 결제되지 않은 금액</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">환불</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.refunds.toLocaleString()}원</div>
          <p className="text-xs text-muted-foreground">환불 처리된 금액</p>
        </CardContent>
      </Card>
    </div>
  )
}

