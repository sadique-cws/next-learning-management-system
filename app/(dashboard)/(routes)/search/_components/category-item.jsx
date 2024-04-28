"use client"

import { cn } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string";


export const CategoryItem = ({label, value, icon:Icon}) => {

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategoryId = searchParams.get("categoryId");

    const currentTitle = searchParams.get("title");

    const isSelected = currentCategoryId === value;

    const onClick = () => {
        const url = queryString.stringifyUrl(
            {
                url: pathname,
                query: {
                    title: currentTitle,
                    categoryId: isSelected ? null : value,
                },
            },
            { skipNull: true, skipEmptyString: true }
        );

        router.push(url);
    };
    return (
        <button onClick={onClick} className={cn("py-2 selection px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition", 
        isSelected && "border-sky-700 text-sky-700 bg-sky-100/20"
        )}>
            {Icon && <Icon size={20}/>}
            <div className="truncate">
                {label}
            </div>
        </button>
    )
}