import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try{
        const {userId} = auth();
        const {title} = await req.json();

        if(!userId){
            return new NextResponse("Unauthorized",{status: 401})
        }

        const course = await db.course.create({
            data: {
                title: title
            }
        })

        return NextResponse.json(course)
    }
    catch(error){
        console.log("[COURSE] Error", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

