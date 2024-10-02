// next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface User {
        id: string;
        username: string;
        type: string;
    }

    interface Session {
        user: User;
    }
}
