"use client"

import {

    FcMusic,
    FcOldTimeCamera,
    FcMultipleDevices,
    FcSalesPerformance,
    FcSportsMode,
    FcEngineering
} from "react-icons/fc"
import { CategoryItem } from "./category-item"

const IconMap =  {
    "Music" : FcMusic,
    "Photography" : FcOldTimeCamera,
    "Fitness": FcSportsMode,
    "Computer Science" : FcMultipleDevices,
    "Accounting" : FcSalesPerformance,
    "Engineering" : FcEngineering,
    "Filming" : FcOldTimeCamera,
}
export const Categories = ({items}) => {
    return (
        <div className="flex items-center gap-x-2 overflow-auto pb-2">
            {items.map((item) => (
                <CategoryItem key={item.id} label={item.name} value={item.id} icon={IconMap[item.name]} />
            ))}
        </div>
    )
}