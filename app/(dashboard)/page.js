import { Card, CardContent, CardDescription } from "@/components/ui/card";
import FactContainer from "./_components/fact-container";
import { Categories } from "./(routes)/learn/_components/categories";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@/auth"
import { db } from "@/lib/db";
import CoursesList from "@/components/courses-list";
import Link from "next/link";
import Achievements from "@/components/achievements";
import Image from "next/image";

export default async function Home({ searchParams }) {
    const session = await auth();
    const userId = session?.userId;

    const category = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })

    const courses = await getCourses({ userId, ...searchParams })

    return (
        <>
            <Card className="border-0 bg-slate-200 flex flex-1 gap-4 md:p-10 p-2 min-h-[450px] rounded-none items-center">
                <CardContent className="flex w-full">
                    <div className="md:w-4/12 flex flex-col items-start gap-y-3">
                        <h1 className="text-4xl font-bold flex flex-col gap-y-1">
                            <span className="text-blue-700">Most Trusted</span>
                            <span>Programming Learning </span>
                            <span className="text-blue-600">Educational Platform</span>
                        </h1>
                        <CardDescription>Unlock your potential by signing up with CWS - The most affordable learning Solution</CardDescription>
                        <Link className="bg-slate-800 text-white px-3 py-2 rounded-lg" href="/learn" size="lg">Start Learning</Link>
                    </div>
                    <div className="md:w-8/12 flex justify-center">
                        <Image width={250} sizes="100vw" height={250} alt="syed sadique hussain" src="/sadique-sir.png"/>
                    </div>
                </CardContent> 
            </Card>
            <FactContainer />
            <div className="md:px-[3%] p-3">
                <Categories items={category} />
                <br />
                <CoursesList items={courses} />

            </div>
            <div className="w-full p-[5%]">
                <div className="flex-1 flex justify-center">
                    <h2 className="text-3xl text-slate-700 font-semibold mb-4 border-b pb-1 border-slate-300">Cwsian's</h2>
                </div>
            <Achievements/>
            </div>
        </>
    );
}
