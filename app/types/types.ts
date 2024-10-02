import { ACCOUNT_TYPE, AccountStatus } from "@prisma/client";

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

export type Bank = {
    id?: string,
    account_name: string,
    accountNumber?: string,
    accountType: ACCOUNT_TYPE,
    balance?: number,
    availableBalance?: number,
    User?: User,
    userId?: string,
    accountOpenedAt: Date,
    accountClosedAt: Date,
    createAt: Date,
    updateAt: Date,
    accountStatus: AccountStatus
}