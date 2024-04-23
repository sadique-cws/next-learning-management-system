import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function DELETE(req, {params}){
    try{
        const {userId} = auth();

        if(!userId) return new NextResponse("unauthorized",{status:401});

        
        const attachments = await db.attachment.delete({
            where: {
                courseId:params.courseId,
                id: params.attachmentsId
            }
        });

        await UTApi.deleteFiles(attachments.name);
        return NextResponse.json(attachments);
    }
    catch(e){
        console.log("Attachments error", e);
        return new NextResponse("Internal Server Error",{status:500});
    }
}