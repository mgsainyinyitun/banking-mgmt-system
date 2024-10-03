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