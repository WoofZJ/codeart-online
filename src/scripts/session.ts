import type { AstroCookies } from "astro"

export function getUserId(cookies: AstroCookies): string {
  let userId = cookies.get("user_id")?.value;
  if (!userId) {
    userId = crypto.randomUUID();
    cookies.set("user_id", userId);
  }
  return userId;
}