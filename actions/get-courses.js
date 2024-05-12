import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";

export const getCourses = async ({
    userId,
    title,
    categoryId,
}) => {
    try {
        
        if(!userId){
            const courses = await db.course.findMany({
                where: {
                    isPublished: true,
                    title: {
                        contains: title,
                    },
                    categoryId,
                },
                include: {
                    category: true,
                    chapters: {
                        where: {
                            isPublished: true,
                        },
                        select: {
                            id: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            return courses;
        }
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                },
                categoryId,
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    },
                },
                purchases: {
                    where: {
                        userId,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const coursesWithProgress =
            await Promise.all(
                courses.map(async (course) => {
                    if (course.purchases.length === 0) {
                        return {
                            ...course,
                            progress: null,
                        };
                    }

                    const progressPercentage = await getProgress(
                        userId,
                        course.id
                    );

                    return {
                        ...course,
                        progress: progressPercentage,
                    };
                })
            );

        return coursesWithProgress;
    } catch (error) {
        console.log("[GET_COURSES]", error);
        return [];
    }
};