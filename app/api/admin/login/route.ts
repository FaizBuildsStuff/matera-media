import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_SECRET = process.env.ADMIN_EDIT_SECRET || "matera-admin";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 60 * 60 * 24 * 30, // 30 days — stays on device
  path: "/",
};

// POST: used by the triple-tap logo dialog
export async function POST(request: Request) {
  const { secret } = await request.json().catch(() => ({ secret: "" }));
  if (secret === ADMIN_SECRET) {
    const cookieStore = await cookies();
    cookieStore.set("matera_admin_token", "authenticated", COOKIE_OPTIONS);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, error: "Wrong password" }, { status: 401 });
}

// GET: legacy redirect-based login (kept for backward compatibility)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  if (secret === ADMIN_SECRET) {
    const cookieStore = await cookies();
    cookieStore.set("matera_admin_token", "authenticated", COOKIE_OPTIONS);
    return NextResponse.redirect(new URL("/", request.url));
  }
  return new NextResponse("Unauthorized", { status: 401 });
}
