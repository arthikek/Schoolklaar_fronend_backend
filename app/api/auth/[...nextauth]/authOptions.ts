// Import necessary modules and types
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

// Define the refresh token lifetime (6 days in seconds)
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60;

// Define a session interface to help with typing
interface Session {
  accessToken: string;
  refresh_token: string;
}

export const authOptions: NextAuthOptions = {
  // Set the secret key from environment variables
  secret: process.env.AUTH_SECRET,

  // Configure the JWT session strategy
  session: {
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },

  // Customize the signIn page path
  pages: {
    signIn: '/',
  },

  // Configure providers for authentication
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      // Handle the authorize logic
      async authorize(credentials) {
        try {
          // Send a POST request to the backend to log the user in
          const response = await fetch(process.env.NEXTAUTH_BACKEND_URL + "auth/login/", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });

          // Check if the response is unsuccessful
          if (!response.ok) {
            const errorData = await response.text();
            console.error("Error response from the backend:", errorData);
            throw new Error("Login failed");
          }

          const data = await response.json();

          // Return the data if present
          if (data) return data;
        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  // Configure callbacks
  callbacks: {
    async jwt({ token, user, account }) {
      // Handle Google OAuth flow
      if (account?.provider === 'google') {
        try {
          // Send the Google id_token to the backend
          const response = await fetch(process.env.NEXTAUTH_BACKEND_URL + "auth/google/", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              access_token: account.id_token,
            }),
          });

          const data = await response.json();

          // Store access and refresh tokens in the JWT if present
          if (data && data.access) {
            token.accessToken = data.access;
            token.refreshToken = data.refresh;
          }
        } catch (error) {
          console.error("Error sending id_token to Django:", error);
        }
      }

      // Handle credentials flow
      else if (user && (user as any).access && (user as any).refresh) {
        token.accessToken = (user as any).access;
        token.refreshToken = (user as any).refresh;
      }

      return token;
    },

    async session({ session, token, user }) {
      console.log('session 2', session)
      // Assign tokens to the session object
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },
};