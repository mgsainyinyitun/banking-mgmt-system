import { ACCOUNT_TYPE } from "@prisma/client";

export type User = {
    id?: string,
    username: string,
    nrc: string,
    dob: Date,
    email: string,
    phone: string,
    city: string,
    state: string,
    address: string,
    password: string,
    type: ACCOUNT_TYPE,
    createAt: Date,
    updateAt: Date,
}