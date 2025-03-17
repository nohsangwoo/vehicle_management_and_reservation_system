"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockAccountingData } from "@/lib/mock-data"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { MoreHorizontal, Edit, Printer, Download, CreditCard, Trash } from "lucide-react"
import Link from "next/link"

interface AccountingTableProps {
  status: string
}

export function AccountingTable({ status }: AccountingTableProps) {
  const [accountingData, setAccountingData] = useState<any[]>([])

  useEffect(() => {
    // 상태에 따라 데이터 필터링
    if (status === "all") {
      setAccountingData(mockAccountingData)
    } else {
      setAccountingData(mockAccountingData.filter((item) => item.status === status))
    }
  }, [status])

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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>번호</TableHead>
            <TableHead>날짜</TableHead>
            <TableHead>고객명</TableHead>
            <TableHead>차량번호</TableHead>
            <TableHead>서비스</TableHead>
            <TableHead>금액</TableHead>
            <TableHead>결제방법</TableHead>
            <TableHead>상태</TableHead>
            <TableHead className="text-right">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accountingData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                <Link href={`/dashboard/accounting/${item.id}`} className="hover:underline">
                  #{item.id.substring(1)}
                </Link>
              </TableCell>
              <TableCell>{format(new Date(item.date), "yyyy-MM-dd", { locale: ko })}</TableCell>
              <TableCell>{item.customerName}</TableCell>
              <TableCell>{item.licensePlate}</TableCell>
              <TableCell>{item.serviceType}</TableCell>
              <TableCell>{item.amount.toLocaleString()}원</TableCell>
              <TableCell>{item.paymentMethod || "-"}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>작업</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/accounting/${item.id}`} className="cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" />
                        상세보기
                      </Link>
                    </DropdownMenuItem>
                    {item.status === "미결제" && (
                      <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        결제 처리
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <Printer className="mr-2 h-4 w-4" />
                      영수증 인쇄
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      PDF 다운로드
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

