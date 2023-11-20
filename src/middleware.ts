
import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"
export function middleware(request: NextRequest) {
  let verify = request.cookies.get("loggedin")
  if (!verify && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/log-in", request.url))
  }
  if (
    (verify && request.nextUrl.pathname === "/log-in") ||
    request.nextUrl.pathname === "register"
  ) {
    return NextResponse.redirect(new URL("/", request.url))
  }
}
