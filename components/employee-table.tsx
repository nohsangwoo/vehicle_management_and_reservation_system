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
import { MoreHorizontal, Edit, Trash, Calendar, Lock, RefreshCw } from "lucide-react"
import { getEmployees, deleteEmployee } from "@/lib/local-storage"
import { useToast } from "@/hooks/use-toast"
import { Employee } from "@/lib/types"
import Link from "next/link"

export function EmployeeTable({ searchTerm = "", statusFilter = "" }) {
  const [employees, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // 컴포넌트 마운트 시 직원 데이터 가져오기
  useEffect(() => {
    fetchEmployees()
  }, [])

  // 필터링된 직원 목록 계산 - searchTerm이나 statusFilter가 변경될 때마다 재계산
  useEffect(() => {
    console.log("필터 변경됨:", { searchTerm, statusFilter })
  }, [searchTerm, statusFilter])

  const fetchEmployees = () => {
    setIsLoading(true)
    try {
      const employeesData = getEmployees()
      setEmployees(employeesData)
    } catch (error) {
      console.error("직원 데이터 가져오기 오류:", error)
      toast({
        title: "오류 발생",
        description: "직원 데이터를 가져오는 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("정말로 이 직원을 삭제하시겠습니까?")) {
      try {
        setIsLoading(true)
        await deleteEmployee(id)
        fetchEmployees()
        toast({
          title: "삭제 완료",
          description: "직원이 삭제되었습니다.",
        })
      } catch (error) {
        toast({
          title: "오류 발생",
          description: "직원 삭제 중 오류가 발생했습니다.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleRefresh = () => {
    fetchEmployees()
    toast({
      title: "새로고침 완료",
      description: "직원 목록이 새로고침되었습니다.",
    })
  }

  // 필터링된 직원 목록 계산
  const filteredEmployees = employees.filter((employee: Employee) => {
    // 검색어 필터링
    const matchesSearch = !searchTerm || 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 상태 필터링
    const matchesStatus = !statusFilter || statusFilter === "all" || 
      (statusFilter === "active" && employee.isActive) ||
      (statusFilter === "inactive" && !employee.isActive);
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="rounded-md border">
      <div className="p-4 flex justify-end">
        <Button variant="outline" size="sm" onClick={handleRefresh} className="mr-2">
          <RefreshCw className="mr-2 h-4 w-4" />
          새로고침
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard/employees/new">
            + 새 직원 등록
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>직책</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>연락처</TableHead>
            <TableHead>상태</TableHead>
            <TableHead className="text-right">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                데이터를 불러오는 중...
              </TableCell>
            </TableRow>
          ) : filteredEmployees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                {employees.length === 0 ? "등록된 직원이 없습니다." : "검색 결과가 없습니다."}
              </TableCell>
            </TableRow>
          ) : (
            filteredEmployees.map((employee: Employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>
                  <Badge variant={employee.isActive ? "default" : "secondary"}>
                    {employee.isActive ? "활성" : "비활성"}
                  </Badge>
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
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        정보 수정
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        일정 보기
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Lock className="mr-2 h-4 w-4" />
                        권한 변경
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(employee.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        삭제
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

