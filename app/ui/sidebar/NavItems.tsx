'use client'

import { ROUTE_TYPE } from '@/app/constants/CONSTANTS';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemsProps {
    sidebars: {
        name: string;
        link: string;
        icon: IconDefinition;
    }[];
    ty: string | undefined;
    onClick?: () => void;
}

const NavItems = ({ sidebars, ty, onClick }: NavItemsProps) => {
    const pathname = usePathname();

    const isActive = (path: string) => {
        console.log('pathname', pathname);
        console.log('path', path);
        return pathname.startsWith(path);
    }

    return (
        <>
            {
                sidebars.map(itm => (
                    <Link href={`/${ty ? ROUTE_TYPE[ty] : ''}${itm.link}`}
                        key={itm.name}
                        onClick={onClick}
                        className={`flex py-2.5 px-4 rounded-2xl transition duration-200 ${isActive(`/${ty ? ROUTE_TYPE[ty] : ''}${itm.link}`) ? 'bg-primary-300 text-white font-semibold' : ''} hover:bg-primary-300 text-lg hover:text-white hover:font-semibold`}
                    >
                        <span className='w-8 h-8 bg-primary-400 flex justify-center items-center p-1 rounded-lg'>
                            <FontAwesomeIcon className='text-white' icon={itm.icon} />
                        </span>
                        <span className='ml-3'>{itm.name}</span>
                    </Link>
                ))
            }
        </>
    )
}

export default NavItems