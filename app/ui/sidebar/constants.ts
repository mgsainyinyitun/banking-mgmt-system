import { faFileInvoice, faGear, faHeadset, faHome, faHouse, faMoneyBillTransfer, faMoneyCheck, faTicket, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";

export const customerSideBar = [
    {
        name: 'Dashboard',
        link: '/dashboard',
        icon: faHouse,
    },
    {
        name: 'Profile',
        link: '/profile',
        icon: faUser,
    },
    {
        name: 'Transaction',
        link: '/transaction',
        icon: faMoneyCheck,
    },
    {
        name: 'Invoice',
        link: '/invoices',
        icon: faFileInvoice,
    },
    {
        name: 'Support',
        link: '/support',
        icon: faTicket
    },
    {
        name: 'Help',
        link: '/help',
        icon: faHeadset
    },
    {
        name: 'Settings',
        link: '/settings',
        icon: faGear,
    },
]


export const adminSideBar = [
    {
        name: 'Dashboard',
        link: '/dashboard',
        icon: faHome
    },
    {
        name: 'Profile',
        link: '/profile',
        icon: faUser,
    },
    {
        name: 'Transaction',
        link: '/transactions',
        icon: faMoneyBillTransfer
    },
    {
        name: 'Users',
        link: '/users',
        icon: faUserCircle
    },
    {
        name: 'Settings',
        link: '/settings',
        icon: faGear
    },
];