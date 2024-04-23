import { Search } from 'lucide-react'
import React from 'react'
import { Input } from './ui/input'

const SearchInput = () => {
  return (
    <div className='relative'>
        <Search className="h-4 w-4 top-3 absolute left-3 text-slate-600 dark:text-slate-200" />
        <Input  className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 dark:bg-slate-800 focus-visible:ring-slate-200" placeholder="search Course"/>
    </div>
  )
}

export default SearchInput