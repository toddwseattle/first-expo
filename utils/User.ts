export type UserRole = "admin " | "user";
/**
 * UserData Interface Definition
 */

export interface UserData {
  role: UserRole;
  uid?: string;
}
export const DEFAULT_USER: UserData = { role: "user" };
export const DEFAULT_ADMIN: UserData = { role: "admin " };
