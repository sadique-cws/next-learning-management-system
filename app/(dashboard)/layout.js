import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

 const HomeLayout = ({children}) => {
    return (
        <div className="h-full dark:bg-gray-900">
            <div className="h-[80px]  fixed inset-y-0 w-full z-50 dark:bg-gray-900">
                <Navbar/>
            </div>
            <div className="hidden h-full flex-col fixed inset-y-0 z-50 dark:bg-gray-900">
                <Sidebar />
            </div>
            <main className=" pt-[80px] h-full dark:bg-gray-900">
                <div className="p-5">
                {children}
                </div>
            </main>
        </div>
    )
}

export default HomeLayout;