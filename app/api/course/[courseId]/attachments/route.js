import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req, {params}){
    try{
        const {userId} = auth();
        const {url} = await req.json();

        if(!userId) return new NextResponse('unauthorized', {status:401})

        let courseOwner = await db.course.findUnique({
            where:{
                id:params.courseId,
            }
        })

        if(!courseOwner) return new NextResponse('unauthorized', {status:401})
        
        const attachments = await db.attachment.create({
            data:{
                url,
                name:url.split("/").pop(),
                courseId:params.courseId
            }
        })

        return NextResponse.json(attachments);
    }
    catch(error){
        console.log("COURSE attachments error : ", error);
        return new NextResponse("Internal Error", {status:500})
    }
}