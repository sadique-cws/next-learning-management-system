import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hook/debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';

const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname  = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  const currentTitle = searchParams.get("title");


  useEffect(() => {
      const url = queryString.stringifyUrl({
        url:pathname,
        query: {
          categoryId: currentCategoryId,
          title:debouncedValue
        },
      }, {skipEmptyString: true, skipNull:true});

      router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname])


  useEffect(() => {
    if (currentTitle) {
        setValue(currentTitle);
    }
}, [currentTitle]);
  return (
    <div className='relative'>
        <Search className="h-4 w-4 top-3 absolute left-3 text-slate-600 dark:text-slate-200" />
        <Input  
        onChange={(e) => setValue(e.target.value)}
        value={value}
                  className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 dark:bg-slate-800 focus-visible:ring-slate-200" placeholder="search Course"/>
    </div>
  )
}

export default SearchInput