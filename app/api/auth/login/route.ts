import { NextResponse } from "next/server"

// 모의 사용자 데이터
const mockUser = {
  id: "1",
  email: "test@naver.com",
  name: "테스트 사용자",
  role: "admin",
  avatar: "/placeholder.svg?height=32&width=32",
}

export async function POST(request: Request) {
  try {
    // 요청 본문에서 이메일과 비밀번호 추출
    const { email, password } = await request.json()

    // 모의 인증 로직
    if (email === "test@naver.com" && password === "test") {
      // 로그인 성공
      return NextResponse.json({
        success: true,
        message: "로그인 성공",
        user: mockUser,
      })
    } else {
      // 로그인 실패
      return NextResponse.json(
        {
          success: false,
          message: "이메일 또는 비밀번호가 올바르지 않습니다.",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("로그인 처리 중 오류:", error)
    return NextResponse.json(
      {
        success: false,
        message: "서버 오류가 발생했습니다.",
      },
      { status: 500 },
    )
  }
}

