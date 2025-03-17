import { type NextRequest, NextResponse } from "next/server"
import type { Reservation } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const reservationData = await request.json()

    // 필수 필드 검증
    const requiredFields = ["customerName", "licensePlate", "date", "service", "assignedTo"]
    for (const field of requiredFields) {
      if (!reservationData[field]) {
        return NextResponse.json(
          {
            success: false,
            message: `${field} 필드는 필수입니다.`,
          },
          { status: 400 },
        )
      }
    }

    // 모의 지연
    await new Promise((resolve) => setTimeout(resolve, 800))

    // 새 예약 ID 생성
    const newId = `res${Date.now()}`

    // 새 예약 객체 생성
    const newReservation: Reservation = {
      id: newId,
      customerName: reservationData.customerName,
      licensePlate: reservationData.licensePlate,
      date: reservationData.date,
      service: reservationData.service,
      assignedTo: reservationData.assignedTo,
      status: reservationData.status || "예약됨",
      notes: reservationData.notes || null,
    }

    return NextResponse.json({
      success: true,
      message: "예약이 성공적으로 생성되었습니다.",
      data: newReservation,
    })
  } catch (error) {
    console.error("예약 생성 중 오류:", error)
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

