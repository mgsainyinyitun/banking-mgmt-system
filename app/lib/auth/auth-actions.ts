'use server'

import { SignInSchema, SignUpSchema } from "@/app/types/form-shema";
import prisma from "../prisma";
import bcrypt from 'bcryptjs';
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function signUp(formData: SignUpSchema) {
    try {
        const hashedPassword = await bcrypt.hash(formData.password, 10);
        await prisma.user.create({
            data: {
                username: formData.username,
                email: formData.email,
                password: hashedPassword,
                nrc: formData.nrc,
                dob: formData.dob.toISOString(),
                phone: formData.phone,
                city: formData.city,
                state: formData.state,
                address: formData.address,
            }
        });
        redirect('/');
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return { errors: { success: false, message: 'A user already exists. Please try with unique nrc and email.' } };
            }
        }
        return {
            message: { errors: { success: false, message: 'something wrent wrong! Please try again.' } }
        };
    }
}

export async function authenticate(formData: SignInSchema) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        // console.log('error type:', error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { errors: { success: false, message: 'Email or password is not valide!' } }
                default:
                    return { errors: { success: false, message: 'something wrent wrong! Please try again.' } }
            }
        } else {
            redirect('/dashboard');
        }
    }
}

// export async function authenticate(formData: SignInSchema) {
//     try {
//         await signIn('credentials', formData);
//     } catch (error) {
//         if (error instanceof AuthError) {
//             return 'log in failed'
//         }
//         throw error;
//     }
// }


export async function doLogout() {
    try {
        await signOut({ redirectTo: "/sign-in" });
    } catch (err) {
        console.log(err);
    }
}