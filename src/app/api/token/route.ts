import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  if (token) {
    return NextResponse.json({
      token,
      status: 200,
    });
  } else {
    return NextResponse.json({
      error: "Token non trouvé",
      status: 404,
    });
  }
}
