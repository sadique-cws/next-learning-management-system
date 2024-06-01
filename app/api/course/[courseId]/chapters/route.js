import { db } from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req, {params}){
    try{
        const {userId} = await auth();
        const {title} = await req.json();

        const course = await db.course.findUnique({
            where:{
                id:params.courseId,
            },
        });

        if(!course) return new NextResponse("Unauthorized",{status:401})

        const lastChapter = await db.chapter.findFirst({
            where:{
                courseId:params.courseId,
            },
            orderBy:{
                position:"desc",
            },
        });

        const newPosition = lastChapter ? lastChapter.position+1 : 1;

        const chapter = await db.chapter.create({
            data:{
                title,
                position:newPosition,
                courseId:params.courseId,
            }
        });

        return NextResponse.json(chapter);
    }
    catch(error){
        console.log("COURSE Chapters error : ", error);
        return new NextResponse("Internal Error", {status:500})
    }
}