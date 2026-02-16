import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

const authSecret = process.env.NEXTAUTH_SECRET;
if (!authSecret) {
  throw new Error("Missing NEXTAUTH_SECRET in environment.");
}

export const authOptions: NextAuthOptions = {
  secret: authSecret,
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
        try {
          const username = credentials?.username?.trim();
          const password = credentials?.password ?? "";

          if (!username || !password) return null;

          const admin = await prisma.admin.findUnique({ where: { username } });
          if (!admin) return null;

          const ok = await bcrypt.compare(password, admin.passwordHash);
          if (!ok) return null;

          return { id: admin.id, name: admin.username };
        } catch {
          return null;
        }
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
