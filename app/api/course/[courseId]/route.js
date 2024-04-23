import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export  async function PATCH(req, {params}){
    try{
        const {userId} = auth();
        const {courseId} = params;

        const values = await req.json();

        if(!userId) return new NextResponse("unauthorized",{status:401});


        let course = await db.course.update({
            where: {    
                id: courseId
            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(course);
    }
    catch(e){
        console.log("COURSE", e);
        return new NextResponse("Internal Server error", {status:500})
    }
}