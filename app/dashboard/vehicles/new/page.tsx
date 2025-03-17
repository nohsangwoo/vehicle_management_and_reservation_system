"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { addVehicle } from "@/lib/local-storage"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export default function NewVehiclePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    licensePlate: "",
    model: "",
    manufacturer: "",
    year: new Date().getFullYear(),
    color: "",
    status: "입차",
    entryTime: new Date().toISOString(),
    expectedExitTime: null,
    owner: {
      name: "",
      phone: "",
      email: "",
    },
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      if (parent === "owner") {
        setFormData({
          ...formData,
          owner: {
            ...formData.owner,
            [child]: value
          }
        })
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleStatusChange = (value: string) => {
    setFormData({
      ...formData,
      status: value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // 필수 필드 검증
    if (!formData.licensePlate || !formData.model || !formData.manufacturer || !formData.owner.name || !formData.owner.phone) {
      toast({
        title: "입력 오류",
        description: "필수 항목을 모두 입력해주세요.",
        variant: "destructive",
      })
      return
    }
    
    try {
      setIsSubmitting(true)
      // 로컬 스토리지에 차량 정보 저장
      await addVehicle(formData)
      
      toast({
        title: "차량 등록 완료",
        description: "새 차량이 성공적으로 등록되었습니다.",
      })
      
      // 차량 목록 페이지로 이동
      router.push("/dashboard/vehicles")
    } catch (error) {
      console.error("차량 등록 오류:", error)
      toast({
        title: "오류 발생",
        description: "차량 등록 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">새 차량 등록</h1>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>차량 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licensePlate">번호판 *</Label>
                <Input
                  id="licensePlate"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleChange}
                  placeholder="예: 12가 3456"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model">차종 *</Label>
                <Input
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="예: 소나타"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manufacturer">제조사 *</Label>
                <Input
                  id="manufacturer"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  placeholder="예: 현대"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year">연식</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="예: 2022"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="color">색상</Label>
                <Input
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="예: 흰색"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">상태</Label>
                <Select
                  value={formData.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="입차">입차</SelectItem>
                    <SelectItem value="상담 대기">상담 대기</SelectItem>
                    <SelectItem value="상담 완료">상담 완료</SelectItem>
                    <SelectItem value="출차">출차</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="pt-4">
              <CardTitle className="mb-4">소유자 정보</CardTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="owner.name">이름 *</Label>
                  <Input
                    id="owner.name"
                    name="owner.name"
                    value={formData.owner.name}
                    onChange={handleChange}
                    placeholder="예: 홍길동"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="owner.phone">전화번호 *</Label>
                  <Input
                    id="owner.phone"
                    name="owner.phone"
                    value={formData.owner.phone}
                    onChange={handleChange}
                    placeholder="예: 010-1234-5678"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="owner.email">이메일</Label>
                  <Input
                    id="owner.email"
                    name="owner.email"
                    type="email"
                    value={formData.owner.email}
                    onChange={handleChange}
                    placeholder="예: example@email.com"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2 pt-4">
              <Label htmlFor="notes">메모</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="추가 정보를 입력하세요"
                rows={3}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => router.push("/dashboard/vehicles")}
            >
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  저장 중...
                </>
              ) : (
                "차량 등록"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
} 