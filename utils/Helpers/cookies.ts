import Cookies from "js-cookie";

// Function to set a cookie
export function setCookie(
  name: string,
  value: string,
  options: Cookies.CookieAttributes = {}
): void {
  Cookies.set(name, value, {
    expires: 7, // Cookie expiration time in days
    ...options,
  });
}

// Function to clear a cookie
export function clearCookie(name: string): void {
  Cookies.remove(name);
}
