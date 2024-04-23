import React from 'react'
import AdminHeader from './admin-header'
import { UserButton } from '@clerk/nextjs'

const AdminNavbar = () => {
  return (
    <div className='p-4 border-b w-full h-full justify-between flex items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'>
        <AdminHeader/>
        <UserButton afterSignOutUrl='/'/>
    </div>
  )
}

export default AdminNavbar