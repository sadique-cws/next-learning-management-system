import Image from 'next/image'
import React from 'react'
import { SidebarRoutes } from '../../../components/sidebar-routes'

const AdminSidebar = () => {
  return (
    <div className={`h-full border-r flex flex-col overflow-y-auto bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-white`}>
    <div className="p-6">
            <h1 className='font-medium'>CWS Admin Panel</h1>
        </div>
        <div className="flex flex-col w-full">
           <SidebarRoutes/>
        </div>
    </div>
  )
}

export default AdminSidebar