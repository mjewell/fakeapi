import { MikroOrmAdapter } from "@/lib/mikro-orm-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MikroOrmAdapter(),
  providers: [Google],
});
