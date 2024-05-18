"use client"

import {
    FcOldTimeCamera,
    FcMultipleDevices,
    FcSalesPerformance,
    FcSportsMode,
    FcEngineering,
    FcDatabase,
    FcPhoneAndroid,
    FcFlowChart,
    FcDeployment,
    FcPrivacy
} from "react-icons/fc"
import { CategoryItem } from "./category-item"

const IconMap =  {
    "Database" : FcDatabase,
    "Android Dev" : FcPhoneAndroid,
    "Web Designing": FcDeployment,
    "Backend Dev" : FcFlowChart,
    "Frontend Dev" : FcMultipleDevices,
    "Computer Science" : FcEngineering,
    "Cyber Security" : FcPrivacy,
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