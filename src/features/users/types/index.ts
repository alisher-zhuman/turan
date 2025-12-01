import type { User } from "@/features/authentication/interfaces/auth";

export type UserRow = Omit<User, "devices">;
