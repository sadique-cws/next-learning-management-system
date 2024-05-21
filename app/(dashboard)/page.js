import { db } from "@/lib/db";
import { getCourses } from "@/actions/get-courses";
import CoursesList from "@/components/courses-list";
import { auth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import FactContainer from "./_components/fact-container";
import { Categories } from "./(routes)/learn/_components/categories";
import Image from "next/image";

export default async function Home({searchParams}) {
  const {userId} = auth();
  const category = await db.category.findMany({
      orderBy:{
          name:"asc"
      }
  })

  const courses = await getCourses({userId, ...searchParams})

  return (
      <>
      <Card className="border-0 bg-slate-200 flex flex-1 gap-4 md:p-10 p-2 min-h-[400px] rounded-none items-center"> 
          <CardContent className="flex w-full">
                <div className="md:w-4/12 flex flex-col items-start gap-y-3">
                    <h1 className="text-4xl font-bold flex flex-col gap-y-1">
                      <span className="text-blue-700">Most Trusted</span>
                      <span>Programming Learning </span>
                      <span className="text-blue-600">Educational Platform</span>
                     </h1>
                     <CardDescription>Unlock your potential by signing up with CWS - The most affordable learning Solution</CardDescription>
                     <Button size="lg">Start Learning</Button>
                </div>
                <div className="md:w-8/12 flex">
                    {/* <Image width={200} height={200} src={`/banner.png`}/> */}
                </div>
          </CardContent>
      </Card>
      <FactContainer/>
      <div className="md:px-[3%] p-3">
            <Categories items={category}/>
            <br/>
            <CoursesList items={courses}/>
            
        </div>
      </>
  );
}
