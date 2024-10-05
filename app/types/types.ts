import { ACCOUNT_TYPE, AccountStatus, BankAccountType, TransactionStatus, TransactionType } from "@prisma/client";

export type User = {
    id?: string,
    username: string,
    profileImage?: string,
    nrc: string,
    dob: Date,
    email: string,
    phone: string,
    city: string,
    state: string,
    address: string,
    password: string,
    type: ACCOUNT_TYPE,
    createAt?: Date,
    updateAt?: Date,
}

export type UserInfo = Omit<User, 'password'>;

export type Bank = {
    id?: number,
    account_name?: string,
    accountNumber?: string,
    accountType?: BankAccountType,
    balance?: number,
    availableBalance?: number,
    User?: User,
    userId?: string,
    accountOpenedAt?: Date,
    accountClosedAt?: Date,
    createAt?: Date,
    updateAt?: Date,
    accountStatus?: AccountStatus
}

export type Transaction = {
    id?: number,
    transaction_id?: string,
    amount?: number,
    transactionType?: string,
    date?: Date,
    description?: string,
    bankAccountId?: number,
    transactionStatus?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export type TransactionFilter = {
    transaction_id?: string,
    transactionType?: any,
    date?: any,
    bankAccountId?: number,
    transactionStatus?: any,
}