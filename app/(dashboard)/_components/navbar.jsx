import React from 'react'
import MobileSidebar from './mobile-sidebar'
import NavbarRoutes from '@/components/navbarRoutes'
import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@/auth'

const Navbar = async () => {
    const session = await auth();
    return (
        <div className="py-4 px-[5%] border-b h-full flex items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm">
            <MobileSidebar />
            <Link href="/">
                <Image src="/cws.png" alt="cws logo" width={180} height={130}/>
            </Link>
            <NavbarRoutes session={session}/>
        </div>
    )
}

export default Navbar