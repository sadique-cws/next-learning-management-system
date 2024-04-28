import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux(
   { 
    tokenId:process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET
    }
);


export async function DELETE(req,{params}){
    try{
        const {userId} = auth();
        if(!userId) return new NextResponse("unauthorized",{status:401});
        
        const course = await db.course.findUnique({
            where:{
                id:params.courseId,
            }
        });
        if(!course) return new NextResponse("unauthorized",{status:401});

        const chapter = await db.chapter.findUnique({
            where:{
                id:params.chapterId,
                courseId:params.courseId,
            }
        })
        
        if(!chapter) return new NextResponse("not found",{status:404});

        if(chapter.videoUrl){
            const existingMuxData = await db.muxData.findFirst({
                where:{
                    chapterId:params.chapterId,
                }
            })

            if(existingMuxData){
                await mux.video.assets.del(existingMuxData.assetId);
                await db.muxData.delete({
                    where:{
                        id:existingMuxData.id,
                    }
                })
            }
        }
        const deletedChapter = await db.chapter.delete({
            where:{
                id:params.chapterId,
            }
        });

        const publishedChaptersInCourse = await db.chapter.findMany({
            where:{
                courseId:params.courseId,
                isPublished:true
            }
        })

        if(!publishedChaptersInCourse.length) {
            await db.course.update({
                where:{
                    id:params.courseId,
                },
                data:{
                    isPublished:false,
                }
            })
        }

        return NextResponse.json(deletedChapter);

    }
    catch(error){
        console.log("CHAPTER DELETE]",error);
        return new NextResponse("Internet Error",{status:500});
    }
}

export async function PATCH(req, { params }) {
    try {
        const { userId } = auth();

        /* 
            This req body will came from a patch req from different components 
            under /teacher/courses/[courseId]/chapters/[chapterId]/_components
              - chapter-title-form.tsx
              - chapter-description-form.tsx
              - chapter-access-form.tsx
              - chapter-video-form.tsx
			
			Here we used destructuring to extract isPublished out of the rest
			(values). The reason behind this that users cannot accidentally set
			isPublished to true, immediately passed that into values in our update 
			below and the chapter is published. The mechanism of chapter publishing
			will be controlled by a separate API route which is going to check
			whether we have all the required fields to publish a chapter
        */
        const { isPublished, ...values } = await req.json();

        /* 
			Check if there's a logged in user (authentication)
		*/
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        /* 
			Check if the user updating the course (specifically chapters) 
            is the owner of the course (authorization)
		*/
        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
            },
        });

        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data: {
                ...values,
            },
        });

        /*  
            If the values contain videoUrl (a patch req came from chapter-video-form.tsx)
            then proceed to process the video in the database and in the MUX
        */
        if (values.videoUrl) {
            /*  
                Find if the chapter already have an uploaded video in the database
                by checking if the id of the chapter (chapterId) matched a certain
                muxData in the database. If so, delete the existingMuxData on MUX 
                and in the database
            */
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: params.chapterId,
                },
            });

            if (existingMuxData) {
                await mux.video.assets.del(existingMuxData.assetId);
                await db.muxData.delete({
                    where: {
                        id: existingMuxData.id,
                    },
                });
            }

            /*  
                Start to upload the videoUrl of the chapter (generated by the UploadThing)
                into MUX
            */
            const asset = await mux.video.assets.create({
                input: values.videoUrl,
                playback_policy: "public",
                test: false,
            });

            /*  
                Once the upload of videoUrl of the chapter into MUX has finished proceed
                in storing the muxData into the database
            */
            await db.muxData.create({
                data: {
                    chapterId: params.chapterId,
                    assetId: asset.id,
                    playbackId: asset.playback_ids?.[0]?.id,
                },
            });
        }

        return NextResponse.json(chapter);
    } catch (error) {
        console.log("[COURSES_CHAPTER_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


