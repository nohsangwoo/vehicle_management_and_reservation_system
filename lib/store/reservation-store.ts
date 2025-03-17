import { create } from "zustand"
import { persist } from "zustand/middleware"
import { mockReservations } from "@/lib/mock-data"
import type { Reservation, ReservationFormData, ReservationStatus } from "@/lib/types"

interface ReservationState {
  // 상태
  reservations: Reservation[]
  isLoading: boolean
  error: string | null

  // 액션 - 나중에 API로 교체할 수 있도록 설계
  fetchReservations: () => Promise<void>
  getReservation: (id: string) => Reservation | undefined
  getReservationsByDate: (date: Date) => Reservation[]
  addReservation: (data: ReservationFormData) => Promise<Reservation>
  updateReservation: (id: string, data: Partial<Reservation>) => Promise<Reservation>
  updateReservationStatus: (id: string, status: ReservationStatus) => Promise<Reservation>
  deleteReservation: (id: string) => Promise<void>
}

// 모의 API 지연 시간 (실제 API 호출 시뮬레이션)
const mockDelay = () => new Promise((resolve) => setTimeout(resolve, 500))

// 고유 ID 생성 함수
const generateId = () => `r${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

export const useReservationStore = create<ReservationState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      reservations: mockReservations,
      isLoading: false,
      error: null,

      // 액션
      fetchReservations: async () => {
        set({ isLoading: true, error: null })
        try {
          // 실제 API 호출 대신 모의 지연
          await mockDelay()
          // 이미 초기 상태에 mockReservations가 있으므로 여기서는 아무것도 하지 않음
          // 실제 API 구현 시 여기서 fetch 호출
          set({ isLoading: false })
        } catch (error) {
          set({ isLoading: false, error: (error as Error).message })
        }
      },

      getReservation: (id: string) => {
        return get().reservations.find((reservation) => reservation.id === id)
      },

      getReservationsByDate: (date: Date) => {
        return get().reservations.filter((reservation) => {
          const reservationDate = new Date(reservation.date)
          return (
            reservationDate.getDate() === date.getDate() &&
            reservationDate.getMonth() === date.getMonth() &&
            reservationDate.getFullYear() === date.getFullYear()
          )
        })
      },

      addReservation: async (data: ReservationFormData) => {
        set({ isLoading: true, error: null })
        try {
          // 실제 API 호출 대신 모의 지연
          await mockDelay()

          const newReservation: Reservation = {
            id: generateId(), // 고유 ID 생성
            ...data,
            status: "예약됨",
          }

          console.log("새 예약 생성:", newReservation)

          set((state) => ({
            reservations: [...state.reservations, newReservation],
            isLoading: false,
          }))

          return newReservation
        } catch (error) {
          console.error("예약 생성 오류:", error)
          set({ isLoading: false, error: (error as Error).message })
          throw error
        }
      },

      updateReservation: async (id: string, data: Partial<Reservation>) => {
        set({ isLoading: true, error: null })
        try {
          // 실제 API 호출 대신 모의 지연
          await mockDelay()

          let updatedReservation: Reservation | undefined

          set((state) => {
            const updatedReservations = state.reservations.map((reservation) => {
              if (reservation.id === id) {
                updatedReservation = { ...reservation, ...data }
                return updatedReservation
              }
              return reservation
            })

            return {
              reservations: updatedReservations,
              isLoading: false,
            }
          })

          if (!updatedReservation) {
            throw new Error("예약을 찾을 수 없습니다.")
          }

          return updatedReservation
        } catch (error) {
          set({ isLoading: false, error: (error as Error).message })
          throw error
        }
      },

      updateReservationStatus: async (id: string, status: ReservationStatus) => {
        return get().updateReservation(id, { status })
      },

      deleteReservation: async (id: string) => {
        set({ isLoading: true, error: null })
        try {
          // 실제 API 호출 대신 모의 지연
          await mockDelay()

          set((state) => ({
            reservations: state.reservations.filter((reservation) => reservation.id !== id),
            isLoading: false,
          }))
        } catch (error) {
          set({ isLoading: false, error: (error as Error).message })
          throw error
        }
      },
    }),
    {
      name: "reservation-storage", // 로컬 스토리지 키 이름
      partialize: (state) => ({ reservations: state.reservations }), // 저장할 상태 선택
    },
  ),
)

