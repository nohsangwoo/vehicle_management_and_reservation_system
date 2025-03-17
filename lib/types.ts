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

