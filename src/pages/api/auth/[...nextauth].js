import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// // adapter
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongoose";

export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Your Alias",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // if (
        //   credentials?.username === user.name &&
        //   credentials.password === user.password
        // ) {
        //   return user;
        // } else {
        //   return null;
        // }
      },
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    // signIn: "/auth/signin",
  },
  callbacks: {
    // async session({ session, user }) {
    //   session.user._id = user.id;
    //   return session;
    // },
    // async redirect({ url, baseUrl }) {
    //   return `/auth/signin`;
    // },
  },
};

export default NextAuth(authOptions);
