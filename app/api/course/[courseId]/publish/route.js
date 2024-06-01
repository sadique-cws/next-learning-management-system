import { db } from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function PATCH(req,{ params }) {
    try {
        const {userId} = await auth();

        /* 
			Check if there's a logged in user (authentication)
		*/
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        /* 
			Before publishing the course, make sure that it exist in
			the database and include all chapters and each of the
			chapter's muxData. If no such course exist, respond with
			404 Not Found
		*/
        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
            },
            include: {
                chapters: {
                    include: {
                        '$scalars': true,
                    },
                },
            },
        });

        if (!course) {
            return new NextResponse("Not found", { status: 404 });
        }

      
        const hasPublishedChapter = course.chapters.some(
            (chapter) => chapter.isPublished
        );

        /* 
			If at least one of the required fields is missing the course
			cannot be published. Respond with a 400 Bad Request
		*/
        if (
            !course.title ||
            !course.description ||
            !course.imageUrl ||
            !course.categoryId ||
            !hasPublishedChapter
        ) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        /* 
			Finally, the isPublished property of the course can now be set to true
		*/
        const publishedCourse = await db.course.update({
            where: {
                id: params.courseId,
            },
            data: {
                isPublished: true,
            },
        });

        return NextResponse.json(publishedCourse);
    } catch (error) {
        console.log("[COURSE_ID_PUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}