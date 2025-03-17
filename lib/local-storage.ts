import type { Employee, Reservation, ReservationFormData, ReservationStatus, Vehicle } from "@/lib/types"
import { mockReservations } from "@/lib/mock-data"
import { mockVehicles } from "@/lib/mock-data"
import { mockEmployees } from "@/lib/mock-data"

// 로컬 스토리지 키
const RESERVATIONS_KEY = "vehicle-management-reservations"
const VEHICLES_KEY = "vehicle-management-vehicles"
const EMPLOYEES_KEY = "vehicle-management-employees"

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

// 로컬 스토리지에서 차량 데이터 가져오기
export const getVehicles = () => {
  if (typeof window === "undefined") return []

  try {
    const storedData = localStorage.getItem(VEHICLES_KEY)
    if (!storedData) {
      // 초기 데이터 설정
      localStorage.setItem(VEHICLES_KEY, JSON.stringify(mockVehicles))
      return mockVehicles
    }
    return JSON.parse(storedData)
  } catch (error) {
    console.error("로컬 스토리지에서 차량 데이터를 가져오는 중 오류 발생:", error)
    return []
  }
}

// 로컬 스토리지에 차량 데이터 저장
export const saveVehicles = (vehicles: Vehicle[]) => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(VEHICLES_KEY, JSON.stringify(vehicles))
  } catch (error) {
    console.error("로컬 스토리지에 차량 데이터를 저장하는 중 오류 발생:", error)
  }
}

// 특정 ID의 차량 가져오기
export const getVehicle = (id: string) => {
  const vehicles = getVehicles()
  return vehicles.find((vehicle: Vehicle) => vehicle.id === id)
}

// 새 차량 추가
export const addVehicle = async (vehicleData: Partial<Vehicle>) => {
  // 모의 API 지연
  await mockDelay()

  const newVehicle = {
    id: `v${Date.now()}`,
    ...vehicleData,
    visitCount: 0,
    lastVisit: null,
  }

  const vehicles = getVehicles()
  const updatedVehicles = [...vehicles, newVehicle]
  saveVehicles(updatedVehicles)

  return newVehicle
}

// 차량 정보 업데이트
export const updateVehicle = async (id: string, data: Partial<Vehicle>) => {
  // 모의 API 지연
  await mockDelay()

  const vehicles = getVehicles()
  let updatedVehicle

  const updatedVehicles = vehicles.map((vehicle: Vehicle) => {
    if (vehicle.id === id) {
      updatedVehicle = { ...vehicle, ...data }
      return updatedVehicle
    }
    return vehicle
  })

  if (!updatedVehicle) {
    throw new Error("차량을 찾을 수 없습니다.")
  }

  saveVehicles(updatedVehicles)
  return updatedVehicle
}

// 차량 삭제
export const deleteVehicle = async (id: string) => {
  // 모의 API 지연
  await mockDelay()

  const vehicles = getVehicles()
  const updatedVehicles = vehicles.filter((vehicle: Vehicle) => vehicle.id !== id)
  saveVehicles(updatedVehicles)
}

// 로컬 스토리지에서 직원 데이터 가져오기
export const getEmployees = () => {
  if (typeof window === "undefined") return []

  try {
    const storedData = localStorage.getItem(EMPLOYEES_KEY)
    if (!storedData) {
      // 초기 데이터 설정
      localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(mockEmployees))
      return mockEmployees
    }
    return JSON.parse(storedData)
  } catch (error) {
    console.error("로컬 스토리지에서 직원 데이터를 가져오는 중 오류 발생:", error)
    return []
  }
}

// 로컬 스토리지에 직원 데이터 저장
export const saveEmployees = (employees: Employee[]) => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees))
  } catch (error) {
    console.error("로컬 스토리지에 직원 데이터를 저장하는 중 오류 발생:", error)
  }
}

// 특정 ID의 직원 가져오기
export const getEmployee = (id: string) => {
  const employees = getEmployees()
  return employees.find((employee: Employee) => employee.id === id)
}

// 새 직원 추가
export const addEmployee = async (employeeData: Partial<Employee>) => {
  // 모의 API 지연
  await mockDelay()

  const newEmployee = {
    id: `e${Date.now()}`,
    ...employeeData,
  }

  const employees = getEmployees()
  const updatedEmployees = [...employees, newEmployee]
  saveEmployees(updatedEmployees)

  return newEmployee
}

// 직원 정보 업데이트
export const updateEmployee = async (id: string, data: Partial<Employee>) => {
  // 모의 API 지연
  await mockDelay()

  const employees = getEmployees()
  let updatedEmployee

  const updatedEmployees = employees.map((employee: Employee) => {
    if (employee.id === id) {
      updatedEmployee = { ...employee, ...data }
      return updatedEmployee
    }
    return employee
  })

  if (!updatedEmployee) {
    throw new Error("직원을 찾을 수 없습니다.")
  }

  saveEmployees(updatedEmployees)
  return updatedEmployee
}

// 직원 삭제
export const deleteEmployee = async (id: string) => {
  // 모의 API 지연
  await mockDelay()

  const employees = getEmployees()
  const updatedEmployees = employees.filter((employee: Employee) => employee.id !== id)
  saveEmployees(updatedEmployees)
}

