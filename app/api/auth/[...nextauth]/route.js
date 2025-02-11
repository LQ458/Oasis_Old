import DBconnect from "@/libs/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials;
        try {
          await DBconnect();
          const user = await User.findOne({ username });
          if (!user) {
            return null;
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return null;
          }
          const newUserObject = {
            name: username,
          };
          return newUserObject;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/login",
    signOut: "/profile",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
