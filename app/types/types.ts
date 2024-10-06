import { ACCOUNT_TYPE, AccountStatus, BankAccountType, TransactionStatus, TransactionType, TransferType } from "@prisma/client";

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
    transferAccountId?: number,
    transferAccountProfile?: string,
    transferType?: TransferType
    createdAt?: Date,
    updatedAt?: Date,
}

export type TransactionTable = {
    id?: number,
    account?: string,
    transaction_id: string,
    amount: number,
    transactionType: string,
    transferAccountId?: number,
    transferAccountProfile?: string,
    transferType?: string
    date?: string,
    transactionStatus?: string,
    description?: string
}

export type TransactionFilter = {
    transaction_id?: { contains: string },
    transactionType?: TransactionType | { in: TransactionType[] },
    date?: { lte: Date | undefined, gte: Date | undefined },
    bankAccountId?: number,
    transactionStatus?: TransactionStatus | { in: TransactionStatus[] },
}