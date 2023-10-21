

import NextAuth from "next-auth"
import {authOptions} from "./authOptions"

// BACKEND_ACCESS_TOKEN_LIFETIME is defined but never used. You may need to use it elsewhere.
// const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60; // 45 minutes



const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
