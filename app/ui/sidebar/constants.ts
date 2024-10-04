import { faFileInvoice, faGear, faHeadset, faHouse, faMoneyCheck, faUser } from "@fortawesome/free-solid-svg-icons";

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
        link: '/',
        icon: faFileInvoice,
    },
    {
        name: 'Settings',
        link: '/',
        icon: faGear,
    },
    {
        name: 'Help',
        link: '/',
        icon: faHeadset
    },
]