import { faFileInvoice, faGear, faHeadset, faHouse, faMoneyCheck, faTicket, faUser } from "@fortawesome/free-solid-svg-icons";

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