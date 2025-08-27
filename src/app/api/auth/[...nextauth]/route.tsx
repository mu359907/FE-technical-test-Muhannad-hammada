import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "../../../../utils/axios";

interface User {
  id: any;
  name: any;
  email: string;
  image: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { UserName, UserPassword, UserType }: any = credentials;
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}user/login`,
            {
              UserName,
              UserPassword,
              UserType,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            const user: User = {
              id: response.data.data?.Userdetails?.UserID,
              name: response.data.data?.Userdetails,
              email: response.data.data?.Userdetails,
              image: response.data.data?.Userdetails?.UserAuthToken,
            };

            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error("Authentication error", error);
          return Promise.reject(new Error("Authentication failed"));
        }
      },
    }),
  ],
  callbacks:{
    async jwt({ token, user, account, profile, trigger, session }: any) {
      if (trigger === "update" && session) {
        token.name.UserMedia = session?.UserMedia;
      };
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 12,
  },
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: "/login",
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
