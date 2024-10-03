import NextAuth, { CredentialsSignin } from 'next-auth';
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

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: 'credentials',
            async authorize(credentials) {

                const parsedCredentials = signInSchema.safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) throw new CredentialsSignin('Please provide valid user');

                    // console.log('user:', user);

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) {
                        console.log('returne user');
                        return user
                    } else {
                        console.log('Invalid credentials');
                        throw new CredentialsSignin('Password not correct!')
                    }
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            let pUsr = user as User;
            if (pUsr) {
                let usr = {
                    id: pUsr.id,
                    username: pUsr.username,
                    type: pUsr.type,
                    imageUrl: pUsr.profileImage,
                }
                token.user = usr;
            }
            console.log('token is :::', token)
            return token;
        },
        async session({ session, token }) {
            return { ...session, ...token };
        },
    }
});