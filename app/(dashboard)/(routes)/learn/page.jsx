import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { getCourses } from "@/actions/get-courses";
import CoursesList from "@/components/courses-list";
import { auth } from "@clerk/nextjs";

const search = async ({searchParams}) => {
    const {userId} = auth();
    const category = await db.category.findMany({
        orderBy:{
            name:"asc"
        }
    })

    const courses = await getCourses({userId, ...searchParams})

    return ( 
        <div className="p-3">
            <Categories items={category}/>
            <CoursesList items={courses}/>
        </div>
     );
}
 
export default search;