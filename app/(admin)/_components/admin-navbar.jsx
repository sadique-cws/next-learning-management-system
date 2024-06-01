import React from 'react'
import AdminHeader from './admin-header'

const AdminNavbar = () => {
  return (
    <div className='p-4 border-b w-full h-full justify-between flex items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'>
        <AdminHeader/>
    </div>
  )
}

export default AdminNavbar