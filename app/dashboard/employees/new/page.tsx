"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { addEmployee } from "@/lib/local-storage"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// 직원 등록 폼 스키마 정의
const employeeFormSchema = z.object({
  name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다"),
  position: z.string().min(1, "직책을 입력해주세요"),
  email: z.string().email("유효한 이메일 주소를 입력해주세요"),
  phone: z.string().min(1, "연락처를 입력해주세요"),
  isActive: z.boolean().default(true),
})

// 폼 데이터 타입 정의
type EmployeeFormValues = z.infer<typeof employeeFormSchema>

export default function NewEmployeePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 폼 설정
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      name: "",
      position: "",
      email: "",
      phone: "",
      isActive: true,
    },
  })

  // 폼 제출 처리
  const onSubmit = async (data: EmployeeFormValues) => {
    try {
      setIsSubmitting(true)
      await addEmployee(data)
      toast({
        title: "등록 완료",
        description: "새 직원이 성공적으로 등록되었습니다.",
      })
      router.push("/dashboard/employees")
    } catch (error) {
      console.error("직원 등록 오류:", error)
      toast({
        title: "오류 발생",
        description: "직원 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/employees">
            <ArrowLeft className="mr-2 h-4 w-4" />
            직원 목록으로 돌아가기
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>새 직원 등록</CardTitle>
          <CardDescription>직원 정보를 입력하여 새로운 직원을 등록합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input placeholder="홍길동" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>직책</FormLabel>
                      <FormControl>
                        <Input placeholder="정비사" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input placeholder="example@company.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>연락처</FormLabel>
                      <FormControl>
                        <Input placeholder="010-1234-5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>활성 상태</FormLabel>
                      <FormDescription>
                        이 직원을 활성 상태로 설정합니다.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <CardFooter className="flex justify-end gap-2 px-0">
                <Button variant="outline" type="button" asChild>
                  <Link href="/dashboard/employees">취소</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "등록 중..." : "직원 등록"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
} 