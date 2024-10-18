import { CalendarDate } from "@internationalized/date";
import { ACCOUNT_TYPE, AccountStatus } from "@prisma/client";
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

export const passwordChangeSchema = z.object({
    id: z.string().min(1, { message: "Id is required" }),
    oldpassword: z.string().min(6, "Password must be at least 6 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
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


export const depositSchema = z.object({
    id: z.preprocess((a) => parseInt(z.string().parse(a), 10),
        z.number().gte(1, 'Must be 1 and above')),
    type: z.string().min(1, { message: 'Require' }),
    account_id: z.string().min(1, { message: "Id is required" }),
    amount: z.preprocess((a) => parseInt(z.string().parse(a), 10),
        z.number().gte(1, 'Must be 1 and above'))
});

export const withdrawSchema = z.object({
    id: z.preprocess((a) => parseInt(z.string().parse(a), 10),
        z.number().gte(1, 'Must be 1 and above')),
    type: z.string().min(1, { message: 'Require' }),
    account_id: z.string().min(1, { message: "Id is required" }),
    amount: z.preprocess((a) => parseInt(z.string().parse(a), 10),
        z.number().gte(1, 'Must be 1 and above')),
    available: z.preprocess((a) => parseInt(z.string().parse(a), 10),
        z.number().gte(0, 'Must be 0 and above')),
}).refine((data) => data.amount <= data.available, {
    message: 'Insufficient balance',
    path: ['amount'],
});

export const transferSchema = z.object({
    id: z.preprocess((a) => parseInt(z.string().parse(a), 10),
        z.number().gte(1, 'Must be 1 and above')),
    account_id: z.string().min(1, { message: "Id is required" }),
    to_account_id: z.string().min(1, { message: "Id is required" }),
    amount: z.preprocess((a) => parseInt(z.string().parse(a), 10),
        z.number().gte(1, 'Must be 1 and above')),
    available: z.preprocess((a) => parseInt(z.string().parse(a), 10),
        z.number().gte(0, 'Must be 0 and above')),
}).refine((data) => data.amount <= data.available, {
    message: 'Insufficient balance',
    path: ['amount'],
});


export const newSupportTicketSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(10, { message: "Description is should have at least 10 characters" }),
    priority: z.string().min(1, { message: "Priority is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    userId: z.string().min(1, { message: "Id is required" }),
})

export const adminUserCreateSchema = z.object({
    type: z.nativeEnum(ACCOUNT_TYPE),
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    nrc: z.string().min(1, { message: "NRC is required" }),
    dob: z.preprocess(
        (arg) => {
            if (arg instanceof CalendarDate) {
                return new Date(arg.year, arg.month - 1, arg.day);
            }
            return arg;
        },
        z.date({ required_error: "Date of birth is required" })
    ),
    bankUserName: z.string().min(6, 'At Least 6 characters').optional(),
    accountType: z.string().min(0, 'Require').optional(),
});


export const adminUserUpdateSchema = z.object({
    id: z.string().uuid(),
    type: z.nativeEnum(ACCOUNT_TYPE).optional(),
    // profileImage: z.string().optional(),
    username: z.string().min(1, { message: "Username is required" }).optional(),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    phone: z.string().min(1, { message: "Phone number is required" }).optional(),
    city: z.string().min(1, { message: "City is required" }).optional(),
    state: z.string().min(1, { message: "State is required" }).optional(),
    address: z.string().min(1, { message: "Address is required" }).optional(),
    nrc: z.string().min(1, { message: "NRC is required" }).optional(),
    dob: z.date().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    status: z.nativeEnum(AccountStatus).optional(),
    bankAccountNumber: z.string().optional(),
});


export type SignUpSchema = z.infer<typeof signupSchema>;

export type SignInSchema = z.infer<typeof signInSchema>;

export type BankAccountSchema = z.infer<typeof bankAccountSchema>

export type ProfileSchema = z.infer<typeof profileShema>

export type DepositSchema = z.infer<typeof depositSchema>

export type WithdrawSchema = z.infer<typeof withdrawSchema>

export type TransferSchema = z.infer<typeof transferSchema>

export type PasswordChangeSchema = z.infer<typeof passwordChangeSchema>

export type NewSupportTicketSchema = z.infer<typeof newSupportTicketSchema>

export type AdminUserUpdateSchema = z.infer<typeof adminUserUpdateSchema>;

export type AdminUserCreateSchema = z.infer<typeof adminUserCreateSchema>;
