'use server'

import { SignInSchema, SignUpSchema } from "@/app/types/form-shema";
import prisma from "../prisma";
import bcrypt from 'bcryptjs';
import { Prisma } from "@prisma/client";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function signUp(formData: SignUpSchema) {
    try {
        const hashedPassword = await bcrypt.hash(formData.password, 10);
        const user = await prisma.user.create({
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
        })
        console.log('created user:',user)
        return { success: true }
    } catch (error) {
        console.log(error);
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
        const res = await signIn('credentials', formData);
        console.log('auth8888:', res);
        return { message: res }
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
            redirect('/')
            return { message: 'ok' }
        }
    }
}

export async function doLogout() {
    try {
        await signOut({ redirectTo: "/sign-in" });
    } catch (err) {
        console.log(err);
    }
}