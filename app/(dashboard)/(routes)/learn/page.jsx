import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { getCourses } from "@/actions/get-courses";
import CoursesList from "@/components/courses-list";
import { auth } from "@/auth";

const search = async ({ searchParams }) => {
    const session = await auth();
    const userId = session?.userId;
    const category = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })

    const courses = await getCourses({ userId, ...searchParams })

    return (
        <div className="p-3">
            <Categories items={category} />
            <CoursesList items={courses} />
        </div>
    );
}

export default search;