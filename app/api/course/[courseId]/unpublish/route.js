import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import Mux from "@mux/mux-node";

const mux = new Mux(
    {
        tokenId: process.env.MUX_TOKEN_ID,
        tokenSecret: process.env.MUX_TOKEN_SECRET
    }
);


export async function PATCH(req, { params }) {
    try {
        const { userId } = auth();

        /* 
            Check if there's a logged in user (authentication)
        */
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        /* 
            Before unpublishing the course, make sure that it exist in
            the database
        */
        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
            },
        });

        if (!course) {
            return new NextResponse("Not found", { status: 404 });
        }

        /* 
            Finally, you can unpublish the course by setting its isPublished
            property to false
        */
        const unpublishedCourse = await db.course.update({
            where: {
                id: params.courseId,
            },
            data: {
                isPublished: false,
            },
        });

        return NextResponse.json(unpublishedCourse);
    } catch (error) {
        console.log("[COURSE_ID_UNPUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

