import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      id: "google-doctor-provider",
      clientId: process.env.GOOGLE_DOCTOR_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_DOCTOR_CLIENT_SECRET!,
      httpOptions: {
        timeout: 10000,
      },
    }),
    Google({
      id: "google-patient-provider",
      clientId: process.env.GOOGLE_PATIENT_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_PATIENT_CLIENT_SECRET!,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      const role = account?.provider.includes("doctor") ? "doctor" : "patient";
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      if (!dbUser.role) {
        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            role: role,
          },
        });
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        role: dbUser.role,
        username: dbUser.username,
      };
    },
  },
};
