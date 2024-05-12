import { SidebarRoutes } from '@/components/sidebar-routes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Sidebar = () => {
  return (
    <div className={`h-full border-r flex flex-col overflow-y-auto bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-white`}>
    <div className="p-6">
            <Link href="/">
              <Image src="/cws.png" alt="" width={130} height={130}/>
            </Link>
        </div>
        <div className="flex flex-col w-full">
           <SidebarRoutes/>
        </div>
    </div>
  );
}

export default Sidebar