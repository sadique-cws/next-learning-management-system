import { IconBadge } from '@/components/icon-badge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs'
import { Eye, LayoutDashboard, MoveLeft, Video } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import ChapterTitleForm from './_components/chapter-title-form';
import ChapterDescriptionForm from './_components/chapter-description-form';
import ChapterAccessForm from './_components/chapter-access-form';
import { ChapterVideoForm } from './_components/chapter-video-form';
import Banner from '@/components/banner';
import { ChapterActions } from './_components/chapter-actions';

const page = async ({ params }) => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterId,
            courseId: params.courseId,
        },
        include: {
            $scalars: true
        },
    })

    const muxData = await db.muxData.findUnique({
        where:{
            chapterId:params.chapterId,
        }
    })

    // console.log("data", chapter.maxData.playbackId)

    // if(!chapter){
    //     return redirect("/");
    // }

    const requiredFileds = [
        chapter.title,
        chapter.description,
        chapter.videoUrl
    ]

    const totalFields = requiredFileds.length;
    const completedFields = requiredFileds.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`;

    const isCompleted = requiredFileds.every(Boolean);
    
    return (
       <>
       {!chapter.isPublished && <Banner label="this Chapter is unpublished it will not be visible in the course"/>}
        <div className='p-6'>
            <div className='flex items-center justify-between'>
                <div className="w-full">
                    <Link href={`/admin/courses/${params.courseId}`}
                        className='flex items-center text-sm hover:opacity-75 transition mb-6'>
                        <MoveLeft />
                        <span className='ml-2'>Go Back to Course Setup</span>
                    </Link>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-medium">
                                Chapter Creation
                            </h1>
                            <span className="text-sm text-slate-700">
                                Complete all fields {completionText}
                            </span>
                        </div>
                        <ChapterActions 
                        disabled={!isCompleted}
                        chapterId={params.chapterId}
                        courseId={params.courseId}
                        isPublished={chapter.isPublished}
                        />
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
                <div className='space-y-4'>
                    <div>
                        <div className='flex items-center gap-x-2'>
                            <IconBadge icon={LayoutDashboard} />
                            <h2 className='text-xl'>
                                Customize your Chapter
                            </h2>
                        </div>
                        <ChapterTitleForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} />
                        <ChapterDescriptionForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} />
                    </div>
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={Eye} />
                        <h2 className='text-xl'>
                            Access Settings
                        </h2>
                    </div>
                    <ChapterAccessForm initialData={chapter} chapterId={params.chapterId} courseId={params.courseId} />
                </div>
                </div>
                <div>
                    <div className='flex items-center gap-x-2'>
                        <IconBadge icon={Video}/>
                        <h2 className="text-xl">Add a Video</h2>
                    </div>
                    <ChapterVideoForm initialData={chapter} muxData={muxData} chapterId={params.chapterId} courseId={params.courseId}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default page