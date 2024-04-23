import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import React from 'react'
import AdminSidebar from './admin-sidebar'

const AdminHeader = () => {
  return (
    <Sheet>
    <SheetTrigger className="pr-4 hover:opacity-75 transition">
        <Menu />
    </SheetTrigger>
    <SheetContent side="left" className="p-0">
        <AdminSidebar/>
    </SheetContent>
</Sheet>
  )
}

export default AdminHeader