"use client";

import { Layout, Compass, List, BarChart, Users, GraduationCap, LayoutDashboard, IndianRupeeIcon } from "lucide-react";
import SidebarItem from "./sidebar-items";
import { usePathname } from "next/navigation";

const STUDENTRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/learn",
    }
]

const teacherRoutes = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/admin/dashboard",
    },
    {
        icon: IndianRupeeIcon,
        label: "Payments",
        href: "/admin/payments",
    },
    {
        icon: List,
        label: "Courses",
        href: "/admin/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/admin/analytics",
    },
    {
        icon: Users,
        label: "Manage Users",
        href: "/admin/users",
    }
]


export const SidebarRoutes = () => {

    const pathname = usePathname();
    
    const isTeacherPage = pathname?.startsWith("/admin");

    const routes = isTeacherPage ? teacherRoutes : STUDENTRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route, index) => (
                <SidebarItem 
                    key={index}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}            
        </div>
    )
}