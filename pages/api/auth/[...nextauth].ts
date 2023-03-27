// http://localhost:1337/api/auth/local
// http://localhost:1337/api/auth/local/register

import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // This method is not invoked when you persist sessions in a database.
    async jwt({ token, account }) {
      if (account) {
        const res = await fetch(
          `${process.env.SERVER_LINK}/api/auth/google/callback?access_token=${account.access_token}`
        );
        const data = await res.json();
        const { jwt, user } = data;
        token.jwt = jwt;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.jwt = token.jwt as string;
      session.user.id = token.id as number;
      return session;
    },
  },

  session: {
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    strategy: "jwt",
  },

  // Not providing any secret or NEXTAUTH_SECRET will throw an error in production.
  secret: process.env.NEXTAUTH_SECRET,
};

const auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);

export default auth;
