import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const loginPage = "/auth";
  const dashboardPage = "/dashboard"; // Replace with your protected route
  const cookieName = "authToken_faturrumahan"; // Replace with your actual authentication cookie name

  // Check if the authentication cookie exists
  const authCookie = req.cookies.get(cookieName);

  // Redirect to dashboard if the user is authenticated and trying to access the login page
  if (authCookie && req.nextUrl.pathname === loginPage) {
    return NextResponse.redirect(new URL(dashboardPage, req.url));
  }

  // Redirect to login if the user is not authenticated and trying to access a protected route
  if (!authCookie && req.nextUrl.pathname.startsWith(dashboardPage)) {
    return NextResponse.redirect(new URL(loginPage, req.url));
  }

  // Otherwise, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/dashboard/:path*"], // Apply middleware to the login page and all dashboard routes
};
