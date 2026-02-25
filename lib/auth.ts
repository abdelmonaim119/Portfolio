import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const username = credentials?.username?.trim();
        const password = credentials?.password ?? "";
        const envUsername = process.env.ADMIN_USERNAME?.trim();
        const envPassword = process.env.ADMIN_PASSWORD ?? "";

        if (!username || !password) return null;

        try {
          const admin = await prisma.admin.findUnique({ where: { username } });
          if (admin) {
            const ok = await bcrypt.compare(password, admin.passwordHash);
            if (ok) return { id: admin.id, name: admin.username };
          }
        } catch {
          // Fallback below handles temporary DB/network failures.
        }

        if (envUsername && envPassword && username === envUsername && password === envPassword) {
          return { id: "env-admin", name: envUsername };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { id?: string }).id = token.sub;
      }
      return session;
    }
  }
};
