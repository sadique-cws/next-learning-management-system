import { db } from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export  async function PATCH(req, {params}){
    try{
        const {userId} = await auth();
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

export async function DELETE(req, { params }) {

    try {

        let { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
            },
            include: {
                chapters: {
                    include: {
                        "$scalars": true,
                    },
                },
            }
        });

        if (!course) return new NextResponse("not found", { status: 404 });

        for (const chapter of course.chapters) {
            if (chapter.muxData?.assetId) {
                await mux.video.assets.del(chapter.muxData.assetId);
            }
        }
        const deletedCourse = await db.course.delete({
            where: {
                id: params.courseId,
            },
        });

        return NextResponse.json(deletedCourse);
    } catch (error) {
        console.log("[COURSE_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}