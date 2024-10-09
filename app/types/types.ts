import { faCreditCard, faGlobe, faInfoCircle, faLock, faPiggyBank, faUserPlus, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ACCOUNT_TYPE, AccountStatus, BankAccountType, TicketCategory, TicketPriority, TransactionStatus, TransactionType, TransferType, InvoiceStatus, InvoiceType } from "@prisma/client";

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

export type InvoiceFilter = {
    username?: string | undefined ,
    date?: { lte: Date | undefined, gte: Date | undefined },
}

export type Ticket = {
    id: string,
    title: string,
    description: string,
    priority: TicketPriority,
    category: TicketCategory,
    userId: string,
    status?: string,
    responses?: string,
    closeAt?: Date,
}

export const TicketCategoryDescriptions: Record<TicketCategory, string> = {
    [TicketCategory.ACCOUNT_OPEN]: 'Account Open',
    [TicketCategory.ACCOUNT_TYPES]: 'Account Types',
    [TicketCategory.ONLINE_BANKING]: 'Online Banking',
    [TicketCategory.CARD_SERVICES]: 'Card Services',
    [TicketCategory.FEES_AND_CHARGES]: 'Fees and Charges',
    [TicketCategory.GENERAL]: 'General',
};


export const TicketCatIcons: Record<TicketCategory, IconDefinition> = {
    [TicketCategory.ACCOUNT_OPEN]: faUserPlus,
    [TicketCategory.ACCOUNT_TYPES]: faPiggyBank,
    [TicketCategory.ONLINE_BANKING]: faLock,
    [TicketCategory.CARD_SERVICES]: faCreditCard,
    [TicketCategory.FEES_AND_CHARGES]: faGlobe,
    [TicketCategory.GENERAL]: faInfoCircle,
}

export type Invoice = {
    id: number | string;
    bankId: number;
    bankUsername?: string | null;
    bankProfile?: string | null;
    amount: number;
    status: InvoiceStatus;
    type: InvoiceType;
    createdAt?: string;
    updatedAt?: Date;
    transactionId?: string | undefined;
    transferAccount?: string | null;
    transferAccountProfile?: string | null;
}
