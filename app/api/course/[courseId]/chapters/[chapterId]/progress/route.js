import { db } from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function PUT(req, {params}){
    try{
        const {userId} = await auth();
        const {isCompleted} = await req.json();
        if(!userId){ 
            return new NextResponse("Unauthorized", {status: 401})
        }

        const userProgress = await db.userProgress.upsert({
            where:{
                userId_chapterId : {
                    userId,
                    chapterId: params.chapterId,
                }
            },
            update:{
                isCompleted
            },
            create:{
                userId,
                chapterId: params.chapterId,
                isCompleted,
            }
        })

        return NextResponse.json({userProgress})
    }
    catch(error){
        console.log("[CHAPTER ID PROGRESS", error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}