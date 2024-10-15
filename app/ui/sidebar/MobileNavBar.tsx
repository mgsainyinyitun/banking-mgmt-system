'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import NavItems from './NavItems';
import { customerSideBar } from './constants';
// import Logout from './Logout';
import Image from 'next/image';

interface MobileNavBarProps {
  ty: string | undefined;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ ty }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-primary-400 rounded-full text-white shadow-md"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="w-6 h-6" />
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-content1-900 z-40 flex flex-col p-5 overflow-y-auto">
          <div className="flex justify-center my-5">
            <Image
              alt='Zai banking logo'
              src='/icons/zai-logo.png'
              width={100}
              height={100}
            />
          </div>
          <nav className="mt-10">
            <NavItems sidebars={customerSideBar} ty={ty} onClick={() => setIsOpen(false)} />
            {/* <Logout /> */}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNavBar;