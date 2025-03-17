import { type NextRequest, NextResponse } from "next/server"
import { mockReservations } from "@/lib/mock-data"
import type { Reservation } from "@/lib/types"

// 더 많은 모의 예약 데이터 생성 (route.ts와 동일한 데이터)
const extendedMockReservations: Reservation[] = [
  ...mockReservations,
  {
    id: "res6",
    customerName: "박서준",
    licensePlate: "12하 3456",
    date: "2024-03-15T10:00:00",
    service: "브레이크 패드 교체",
    assignedTo: "김수리",
    status: "예약됨",
    notes: "프론트 브레이크 패드만 교체 요청",
  },
  {
    id: "res7",
    customerName: "김민지",
    licensePlate: "34거 5678",
    date: "2024-03-15T13:30:00",
    service: "타이어 교체",
    assignedTo: "박정비",
    status: "확인됨",
    notes: "4개 타이어 모두 교체",
  },
  {
    id: "res8",
    customerName: "이준호",
    licensePlate: "56너 7890",
    date: "2024-03-16T09:00:00",
    service: "에어컨 가스 충전",
    assignedTo: "김수리",
    status: "예약됨",
    notes: null,
  },
  {
    id: "res9",
    customerName: "최유진",
    licensePlate: "78더 1234",
    date: "2024-03-16T11:30:00",
    service: "엔진 오일 교체",
    assignedTo: "박정비",
    status: "예약됨",
    notes: "합성유로 교체 요청",
  },
  {
    id: "res10",
    customerName: "정우성",
    licensePlate: "90러 5678",
    date: "2024-03-16T14:00:00",
    service: "정기 점검",
    assignedTo: "김수리",
    status: "확인됨",
    notes: "30,000km 정기 점검",
  },
  {
    id: "res11",
    customerName: "송혜교",
    licensePlate: "12머 3456",
    date: "2024-03-17T10:30:00",
    service: "배터리 교체",
    assignedTo: "박정비",
    status: "예약됨",
    notes: null,
  },
  {
    id: "res12",
    customerName: "강동원",
    licensePlate: "34버 5678",
    date: "2024-03-17T13:00:00",
    service: "와이퍼 교체",
    assignedTo: "김수리",
    status: "예약됨",
    notes: "앞뒤 와이퍼 모두 교체",
  },
  {
    id: "res13",
    customerName: "전지현",
    licensePlate: "56서 7890",
    date: "2024-03-18T09:30:00",
    service: "헤드라이트 교체",
    assignedTo: "박정비",
    status: "예약됨",
    notes: "우측 헤드라이트만 교체",
  },
  {
    id: "res14",
    customerName: "현빈",
    licensePlate: "78어 1234",
    date: "2024-03-18T11:00:00",
    service: "냉각수 교체",
    assignedTo: "김수리",
    status: "예약됨",
    notes: null,
  },
  {
    id: "res15",
    customerName: "손예진",
    licensePlate: "90저 5678",
    date: "2024-03-18T14:30:00",
    service: "에어필터 교체",
    assignedTo: "박정비",
    status: "예약됨",
    notes: "에어컨 필터도 함께 교체",
  },
]

// 특정 ID의 예약 조회
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // 모의 지연
    await new Promise((resolve) => setTimeout(resolve, 300))

    const reservation = extendedMockReservations.find((res) => res.id === id)

    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          message: "예약을 찾을 수 없습니다.",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: reservation,
    })
  } catch (error) {
    console.error("예약 데이터 처리 중 오류:", error)
    return NextResponse.json(
      {
        success: false,
        message: "서버 오류가 발생했습니다.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// 예약 수정
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const updateData = await request.json()

    // 모의 지연
    await new Promise((resolve) => setTimeout(resolve, 500))

    // 실제로는 데이터베이스에서 업데이트하지만, 여기서는 모의 응답만 반환
    const reservation = extendedMockReservations.find((res) => res.id === id)

    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          message: "예약을 찾을 수 없습니다.",
        },
        { status: 404 },
      )
    }

    // 업데이트된 예약 정보 (실제로는 변경되지 않음)
    const updatedReservation = {
      ...reservation,
      ...updateData,
      id: id, // ID는 변경 불가
    }

    return NextResponse.json({
      success: true,
      message: "예약이 성공적으로 업데이트되었습니다.",
      data: updatedReservation,
    })
  } catch (error) {
    console.error("예약 데이터 처리 중 오류:", error)
    return NextResponse.json(
      {
        success: false,
        message: "서버 오류가 발생했습니다.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// 예약 삭제
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // 모의 지연
    await new Promise((resolve) => setTimeout(resolve, 500))

    const reservation = extendedMockReservations.find((res) => res.id === id)

    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          message: "예약을 찾을 수 없습니다.",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "예약이 성공적으로 삭제되었습니다.",
      data: { id },
    })
  } catch (error) {
    console.error("예약 데이터 처리 중 오류:", error)
    return NextResponse.json(
      {
        success: false,
        message: "서버 오류가 발생했습니다.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

