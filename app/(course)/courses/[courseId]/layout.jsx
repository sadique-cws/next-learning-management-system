import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CourseNavbar } from "./_components/course-navbar";
import { CourseSidebar } from "./_components/course-sidebar";
import { auth } from "@/auth";

const CourseLayout = async ({children, params}) => {
    let session, course,progressCount;
    try{
     session = await auth();
    const {userId} = session;   
     course = await db.course.findUnique({
        where:{
            id:params.courseId,
        },
        include:{
            chapters : {
                where: {
                    isPublished:true
                },
                include:{
                    userProgress: {
                        where:{
                            userId,
                        }
                    }
                },
                orderBy:{
                    position:"asc"
                }
            }
        }
    });
    if(!course) return redirect('/');
     progressCount = await getProgress(userId, course.id);

    }
    catch(e){
        session = {userId:null};
    }
    finally{
        if(!session.user) return redirect("/");
    }
   
  


    return (
        <div className="h-full">
        <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
            <CourseNavbar course={course} progressCount={progressCount} />
        </div>
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
            <CourseSidebar course={course} progressCount={progressCount} />
        </div>
        <main className="md:pl-80 pt-[80px] h-full">{children}</main>
    </div>
    )
}

export default CourseLayout;