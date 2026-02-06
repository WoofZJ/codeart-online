import type { ActionAPIContext } from "astro:actions";

export function getUserId(context: ActionAPIContext): string {
  let userId = context.cookies.get("user_id")?.value;
  if (!userId) {
    userId = crypto.randomUUID();
    context.cookies.set("user_id", userId);
  }
  return userId;
}