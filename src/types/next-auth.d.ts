import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role?: "doctor" | "patient" | null;
    username?: string | null;
    address?: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      role?: "doctor" | "patient" | null;
      username?: string | null;
      address?: string | null;
    };
  }
}
