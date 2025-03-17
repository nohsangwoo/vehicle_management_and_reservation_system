// 예약 관련 타입 정의
export interface Reservation {
  id: string
  customerName: string
  licensePlate: string
  date: string
  service: string
  assignedTo: string
  status: "예약됨" | "확인됨" | "취소됨" | "완료됨"
  notes?: string
}

export type ReservationStatus = "예약됨" | "확인됨" | "취소됨" | "완료됨"

export interface ReservationFormData {
  customerName: string
  licensePlate: string
  date: string
  service: string
  assignedTo: string
  notes?: string
}

export interface Vehicle {
  id: string
  licensePlate: string
  model: string
  manufacturer: string
  year: number
  color: string
  owner: {
    name: string
    phone: string
    email: string
  }
  status: string
  entryTime: string
  expectedExitTime: string | null
  visitCount: number
  lastVisit: string | null
  notes: string | null
}
