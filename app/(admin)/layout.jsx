import { isAdmin } from "@/lib/admin";
import AdminNavbar from "./_components/admin-navbar";
import AdminSidebar from "./_components/admin-sidebar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function AdminLayout({children}){
    const { userId } = auth();

    if (!isAdmin(userId)) {
        return redirect("/");
    }
    return (
        <div className="flex h-full flex-col">
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50 dark:bg-gray-900">
                <AdminNavbar/>
            </div>
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 dark:bg-gray-900">
                <AdminSidebar />
            </div>
            <main className="md:pl-56 pt-[80px] h-full dark:bg-gray-900">
            <div className="p-5">
                {children}
                </div>
            </main>
        </div>
    )
}