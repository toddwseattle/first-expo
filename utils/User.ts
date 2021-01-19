/**
 * UserData Interface Definition
 */
export interface UserData {
  role: "admin " | "user";
}
export const DEFAULT_USER: UserData = { role: "user" };
export const DEFAULT_ADMIN: UserData = { role: "admin " };
