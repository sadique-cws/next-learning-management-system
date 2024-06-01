import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try{
        const {userId} = await auth();
        const {title} = await req.json();

        if(!userId){
            return new NextResponse("Unauthorized",{status: 401})
        }

        const course = await db.course.create({
            data: {
                title: title,
                userId,
                updatedAt:new Date(),
            }
        })

        return NextResponse.json(course)
    }
    catch(error){
        console.log("[COURSE] Error", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

