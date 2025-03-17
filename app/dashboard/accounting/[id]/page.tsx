"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { ArrowLeft, Edit, Printer, Download, CreditCard } from "lucide-react"
import { mockAccountingData } from "@/lib/mock-data"
import Link from "next/link"

export default function AccountingDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [accounting, setAccounting] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 모의 데이터에서 정산 정보 가져오기
    const foundAccounting = mockAccountingData.find((a) => a.id === id)
    setAccounting(foundAccounting)
    setLoading(false)
  }, [id])

  if (loading) {
    return <div className="flex items-center justify-center h-full">로딩 중...</div>
  }

  if (!accounting) {
    return <div className="flex items-center justify-center h-full">정산 내역을 찾을 수 없습니다.</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "미결제":
        return "bg-yellow-500"
      case "결제완료":
        return "bg-green-500"
      case "환불":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/accounting">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">정산 상세 정보</h1>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="w-full md:w-2/3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">정산 #{accounting.id.substring(1)}</CardTitle>
                <CardDescription>
                  {format(new Date(accounting.date), "yyyy년 MM월 dd일", { locale: ko })}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(accounting.status)}>{accounting.status}</Badge>
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/dashboard/accounting/${accounting.id}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">고객 정보</h3>
                    <div className="rounded-md border p-4">
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">이름</p>
                          <p>{accounting.customerName}</p>
                        </div>
                        <Separator />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">차량 번호</p>
                          <p>{accounting.licensePlate}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">정산 정보</h3>
                    <div className="rounded-md border p-4">
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">서비스 유형</p>
                          <p>{accounting.serviceType}</p>
                        </div>
                        <Separator />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">담당자</p>
                          <p>{accounting.assignedTo}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="mb-4 text-lg font-medium">결제 정보</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">서비스 금액</span>
                      <span>{accounting.amount.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">부가세 (10%)</span>
                      <span>{Math.round(accounting.amount * 0.1).toLocaleString()}원</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>총 금액</span>
                      <span>{Math.round(accounting.amount * 1.1).toLocaleString()}원</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">결제 방법</span>
                      <span>{accounting.paymentMethod || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">결제 상태</span>
                      <Badge className={getStatusColor(accounting.status)}>{accounting.status}</Badge>
                    </div>
                  </div>
                </div>

                {accounting.notes && (
                  <div className="rounded-md border p-4">
                    <h3 className="mb-2 text-sm font-medium text-muted-foreground">메모</h3>
                    <p className="text-sm">{accounting.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>빠른 작업</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {accounting.status === "미결제" && (
                <Button className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  결제 처리
                </Button>
              )}
              <Button className="w-full justify-start" variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                영수증 인쇄
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                PDF 다운로드
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href={`/dashboard/accounting/${accounting.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  정보 수정
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>관련 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">생성 시간</p>
                  <p>{format(new Date(accounting.createdAt), "yyyy-MM-dd HH:mm", { locale: ko })}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">마지막 수정</p>
                  <p>
                    {accounting.updatedAt
                      ? format(new Date(accounting.updatedAt), "yyyy-MM-dd HH:mm", { locale: ko })
                      : "-"}
                  </p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">영수증 번호</p>
                  <p>{accounting.receiptNumber || "-"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

