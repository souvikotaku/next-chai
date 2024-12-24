import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths explicitly
  const isPublicPath = path === "/login" || path === "/signup";

  // Define private paths, including all paths starting with `/profile`
  const isPrivatePath = path.startsWith("/profile");

  const token = request.cookies.get("token")?.value || "";

  // Redirect authenticated users away from public pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  // Redirect unauthenticated users away from private pages, including nested ones
  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next(); // Allow other requests to proceed
}
