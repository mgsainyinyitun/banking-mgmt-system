import { CalendarDate } from "@internationalized/date";
import z from 'zod';

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const bankAccountSchema = z.object({
    userId: z.string().min(0, 'Require'),
    username: z.string().min(6, 'At Least 6 characters'),
    accountType: z.string().min(0, 'Require')
})


export const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    nrc: z.string().min(6, "NRC must be at least y characters long"),
    email: z.string().email(),
    dob: z.preprocess(
        (arg) => {
            if (arg instanceof CalendarDate) {
                return new Date(arg.year, arg.month - 1, arg.day);
            }
            return arg;
        },
        z.date({ required_error: "Date of birth is required" })
    ),
    phone: z.string().min(10, "Phone number is not valid!"),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "City is required" }),
    address: z.string().min(1, { message: "City is required" }),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });


export const profileShema = z.object({
    id: z.string().min(1, { message: "Id is required" }),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    nrc: z.string().min(6, "NRC must be at least y characters long"),
    email: z.string().email(),
    dob: z.preprocess(
        (arg) => {
            if (arg instanceof CalendarDate) {
                return new Date(arg.year, arg.month - 1, arg.day);
            }
            return arg;
        },
        z.date({ required_error: "Date of birth is required" })
    ),
    phone: z.string().min(10, "Phone number is not valid!"),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "City is required" }),
    address: z.string().min(1, { message: "City is required" }),

})

export type SignUpSchema = z.infer<typeof signupSchema>;

export type SignInSchema = z.infer<typeof signInSchema>;

export type BankAccountSchema = z.infer<typeof bankAccountSchema>

export type ProfileSchema = z.infer<typeof profileShema>
