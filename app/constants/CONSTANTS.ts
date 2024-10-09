export enum ACCOUNT_TYPE {
    ADMIN = 'ADMIN',
    MANAHGER = 'MANAHGER',
    TELLER = 'TELLER',
    CUSTOMER = 'CUSTOMER',
}


export enum BANK_ACC_TYPE {
    SAVINGS = 'SAVINGS',
    CHECKING = 'CHECKING'
}


export const ROUTE_TYPE: { [key: string]: string } = {
    'CUSTOMER': 'cu',
    'ADMIN': 'admin',
}

export const DEFAULT_PROFILE = '/profiles/default.png';

export const EXCHANGE_ICON = '/profiles/exchange.jpg';

export const ZAI_LOGO = '/icons/zai-log.png';

export const TRANSACTION_COLUMNS = [
    { name: "ACCOUNT", value: "account" },
    { name: "AMOUNT", value: "amount" },
    { name: "TYPE", value: "transactionType" },
    { name: "DATE", value: "date" },
    { name: "STATUS", value: "transactionStatus" },
    { name: "TRANSACTION ID", value: "transaction_id" },
    // { name: "DESCRIPTION", value: "description" },
]


export const INVOICE_COLUMNS = [
    { name: "# INVOICE", value: "id" },
    { name: "FROM", value: "transferAccount" },
    { name: "AMOUNT", value: "amount" },
    { name: "TYPE", value: "type" },
    { name: "STATUS", value: "status" },
    { name: "DATE", value: "createdAt" },
    { name: "TRANSACTION ID", value: "transactionId" },
    { name: "DETAILS", value: "details" },
]


// id: number | string;
// bankId: number;
// amount: number;
// status: InvoiceStatus;
// type:InvoiceType;
// createdAt?: Date;
// updatedAt?: Date;
// transactionId?: string | undefined;
// transferAccount?:string | null;
// transferAccountProfile?: string | null;