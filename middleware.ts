import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
    // determinte whether or not to call the middleware
    matcher: ["/((?!_next/static|_next/image|favicon.ico|sign-in|sign-up).*)"],
};