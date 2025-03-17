// 예약 API 호출을 위한 유틸리티 함수

// 모든 예약 또는 필터링된 예약 가져오기
export async function fetchReservations(filters?: {
  date?: string
  status?: string
  customerId?: string
  licensePlate?: string
  assignedTo?: string
}) {
  try {
    // 쿼리 파라미터 구성
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })
    }

    const response = await fetch(`/api/reservations?${params.toString()}`)

    if (!response.ok) {
      throw new Error("예약 데이터를 가져오는데 실패했습니다.")
    }

    return await response.json()
  } catch (error) {
    console.error("예약 데이터 가져오기 오류:", error)
    throw error
  }
}

// 특정 ID의 예약 가져오기
export async function fetchReservationById(id: string) {
  try {
    const response = await fetch(`/api/reservations/${id}`)

    if (!response.ok) {
      throw new Error("예약 데이터를 가져오는데 실패했습니다.")
    }

    return await response.json()
  } catch (error) {
    console.error("예약 데이터 가져오기 오류:", error)
    throw error
  }
}

// 새 예약 생성하기
export async function createReservation(reservationData: any) {
  try {
    const response = await fetch("/api/reservations/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "예약 생성에 실패했습니다.")
    }

    return await response.json()
  } catch (error) {
    console.error("예약 생성 오류:", error)
    throw error
  }
}

// 예약 수정하기
export async function updateReservation(id: string, updateData: any) {
  try {
    const response = await fetch(`/api/reservations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "예약 수정에 실패했습니다.")
    }

    return await response.json()
  } catch (error) {
    console.error("예약 수정 오류:", error)
    throw error
  }
}

// 예약 삭제하기
export async function deleteReservation(id: string) {
  try {
    const response = await fetch(`/api/reservations/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "예약 삭제에 실패했습니다.")
    }

    return await response.json()
  } catch (error) {
    console.error("예약 삭제 오류:", error)
    throw error
  }
}

