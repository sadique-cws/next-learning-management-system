

import NavbarRoutes from "@/components/navbarRoutes";
import { CourseMobileSidebar } from "./course-mobile-sidebar";
import { auth } from "@/auth";


export const CourseNavbar = async ({ course, progressCount }) => {
    const session = await auth();
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <CourseMobileSidebar
                course={course}
                progressCount={progressCount}
            />
            <NavbarRoutes session={session} />
        </div>
    );
};