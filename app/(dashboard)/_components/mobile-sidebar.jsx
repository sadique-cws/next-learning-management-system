import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import React from 'react'
import Sidebar from './sidebar'

const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="pr-4 hover:opacity-75 transition flex items-center">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[250px]">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar