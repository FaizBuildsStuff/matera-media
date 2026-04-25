import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const adminSecret = process.env.ADMIN_EDIT_SECRET || "matera-admin-2024";

  if (secret === adminSecret) {
    const cookieStore = await cookies();
    cookieStore.set("matera_admin_token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return NextResponse.redirect(new URL("/", request.url));
  }

  return new NextResponse("Unauthorized", { status: 401 });
}
