import type { Reservation, ReservationFormData, ReservationStatus } from "@/lib/types"
import { mockReservations } from "@/lib/mock-data"

// 로컬 스토리지 키
const RESERVATIONS_KEY = "vehicle-management-reservations"

// 모의 API 지연 시간 (실제 API 호출 시뮬레이션)
const mockDelay = () => new Promise((resolve) => setTimeout(resolve, 500))

// 고유 ID 생성 함수
const generateId = () => `r${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// 로컬 스토리지에서 예약 데이터 가져오기
export const getReservations = (): Reservation[] => {
  if (typeof window === "undefined") return []

  try {
    const storedData = localStorage.getItem(RESERVATIONS_KEY)
    if (!storedData) {
      // 초기 데이터 설정
      const typedMockReservations = mockReservations.map(reservation => ({
        ...reservation,
        status: reservation.status as ReservationStatus,
        notes: reservation.notes || undefined
      }));
      localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(typedMockReservations))
      return typedMockReservations
    }
    return JSON.parse(storedData) as Reservation[]
  } catch (error) {
    console.error("로컬 스토리지에서 예약 데이터를 가져오는 중 오류 발생:", error)
    return []
  }
}

// 로컬 스토리지에 예약 데이터 저장
export const saveReservations = (reservations: Reservation[]): void => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations))
  } catch (error) {
    console.error("로컬 스토리지에 예약 데이터를 저장하는 중 오류 발생:", error)
  }
}

// 특정 ID의 예약 가져오기
export const getReservation = (id: string): Reservation | undefined => {
  const reservations = getReservations()
  return reservations.find((reservation) => reservation.id === id)
}

// 특정 날짜의 예약 목록 가져오기
export const getReservationsByDate = (date: Date): Reservation[] => {
  const reservations = getReservations()
  return reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.date)
    return (
      reservationDate.getDate() === date.getDate() &&
      reservationDate.getMonth() === date.getMonth() &&
      reservationDate.getFullYear() === date.getFullYear()
    )
  })
}

// 새 예약 추가
export const addReservation = async (data: ReservationFormData): Promise<Reservation> => {
  // 모의 API 지연
  await mockDelay()

  const newReservation: Reservation = {
    id: generateId(),
    ...data,
    status: "예약됨",
  }

  const reservations = getReservations()
  const updatedReservations = [...reservations, newReservation]
  saveReservations(updatedReservations)

  return newReservation
}

// 예약 업데이트
export const updateReservation = async (id: string, data: Partial<Reservation>): Promise<Reservation> => {
  // 모의 API 지연
  await mockDelay()

  const reservations = getReservations()
  let updatedReservation: Reservation | undefined

  const updatedReservations = reservations.map((reservation) => {
    if (reservation.id === id) {
      updatedReservation = { ...reservation, ...data }
      return updatedReservation
    }
    return reservation
  })

  if (!updatedReservation) {
    throw new Error("예약을 찾을 수 없습니다.")
  }

  saveReservations(updatedReservations)
  return updatedReservation
}

// 예약 상태 업데이트
export const updateReservationStatus = async (id: string, status: ReservationStatus): Promise<Reservation> => {
  return updateReservation(id, { status })
}

// 예약 삭제
export const deleteReservation = async (id: string): Promise<void> => {
  // 모의 API 지연
  await mockDelay()

  const reservations = getReservations()
  const updatedReservations = reservations.filter((reservation) => reservation.id !== id)
  saveReservations(updatedReservations)
}

