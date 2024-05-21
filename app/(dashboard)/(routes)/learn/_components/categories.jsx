"use client"

import {
    FcMultipleDevices,
    FcEngineering,
    FcDatabase,
    FcAndroidOs,
    FcIdea,
    FcSteam,
    FcGlobe
} from "react-icons/fc"
import { CategoryItem } from "./category-item"

const IconMap =  {
    "Web Designing" :FcGlobe,
    "Android Development" :FcAndroidOs,
    "Backend Development" :FcIdea,
    "Frontend Development" :FcMultipleDevices,
    "Computer Fundamental" :FcSteam,
    "Data Structure" :FcEngineering,
    "Database" :FcDatabase,
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