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

export const TRANSACTION_COLUMNS = [
    { name: "ACCOUNT", value: "account" },
    { name: "AMOUNT", value: "amount" },
    { name: "TYPE", value: "transactionType" },
    { name: "DATE", value: "date" },
    { name: "STATUS", value: "transactionStatus" },
    { name: "TRANSACTION ID", value: "transaction_id" },
    { name: "DESCRIPTION", value: "description" },
]