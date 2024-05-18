import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { CheckCircle, Clock } from "lucide-react";


import { InfoCard } from "./_components/info-card";
import  CoursesList from "@/components/courses-list";
import { getDashboardCourses } from "@/actions/get-dashboard-course";
import { getAnalytics } from "@/actions/get-analytics";

export default async function Dashboard() {
    const { userId } = auth();

    console.log(getAnalytics(userId));

    if (!userId) {
        return redirect("/");
    }

    const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);

    return (
        <div className="md:px-[10%] px-6 py-6 space-y-4">
            <h2 className="border-b pb-2">Statics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard
                    icon={Clock}
                    label="In Progress"
                    numberOfItems={coursesInProgress.length}
                />
                <InfoCard
                    icon={CheckCircle}
                    label="Completed"
                    numberOfItems={completedCourses.length}
                    variant="success"
                />
            </div>
            <h2 className="border-b pb-2">My Courses</h2>
            <CoursesList items={[...coursesInProgress, ...completedCourses]} />
        </div>
    );
}