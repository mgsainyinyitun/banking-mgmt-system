import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { User } from './app/types/types';
import prisma from './app/lib/prisma';
import { signInSchema } from './app/types/form-shema';

async function getUser(email: string): Promise<User | undefined> {
    try {
        console.log('unique use finding ...');
        const user = await prisma.user.findUnique({ where: { email } }) as User | null;
        if (!user) return undefined;
        return user;
    } catch (error) {
        console.log(error);
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = signInSchema.safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;

                    console.log('user:', user);

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    console.log('passwordsMatch:', passwordsMatch);
                    if (passwordsMatch) {
                        return user
                    };
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});