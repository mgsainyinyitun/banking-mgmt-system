import { faFileInvoice, faGear, faHeadset, faHouse, faMoneyCheck, faUser } from "@fortawesome/free-solid-svg-icons";

export const customerSideBar = [
    {
        name: 'Dashboard',
        link: '/dashboard',
        icon: faHouse,
    },
    {
        name: 'Profile',
        link: '/dashboard/profile',
        icon: faUser,
    },
    {
        name: 'Invoice',
        link: '/',
        icon: faFileInvoice,
    },
    {
        name: 'Transaction',
        link: '/',
        icon: faMoneyCheck,
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