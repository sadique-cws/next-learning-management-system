import { IconBadge } from '@/components/icon-badge'
import { File, IndianRupeeIcon, LayoutDashboard, ListChecks } from 'lucide-react'
import React from 'react'
import TitleForm from './_components/title-form'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import CategoryForm from './_components/category-form'
import DescriptionForm from './_components/description-form'
import { PriceForm } from './_components/price-form'
import { ImageForm } from './_components/image-form'
import { AttachmentForm } from './_components/attachments-form'
import { ChaptersForm } from './_components/chapter-form'
import Banner from '@/components/banner'
import { Actions } from './_components/actions'

const page = async ({ params }) => {

  const { userId } = auth();

  if (!userId) return redirect("/");


  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc"
        }
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const requiredFields = [
    course.title,
    course.description,
    course.categoryId,
    course.price,
    course.imageUrl,
    course.chapters.some((chapter) => chapter.isPublished),
  ]

  let totalFields = requiredFields.length;
  let completedFields = requiredFields.filter(Boolean).length;
  let completionText = `(${completedFields}/${totalFields})`
  let isCompleted = requiredFields.every(Boolean);

  return (
    <>
           {!course.isPublished && <Banner label="this Chapter is unpublished it will not be visible in the course"/>}
           <div className='p-6'>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
        {/* add actions */}
        <Actions 
          disabled={!isCompleted}
          courseId={params.courseId}
          isPublished={course.isPublished}
          />
        
      </div>
      <div className='grid grid-cols-1 gap-6 mt-16 md:grid-cols-2 '>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">
              Customize your course
            </h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
        </div>

        <div className="space-y-6">
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={ListChecks} />
              <h2 className='text-xl'>Course Chapters</h2>
            </div>
            <ChaptersForm initialData={course} courseId={course.id} />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={IndianRupeeIcon} />
              <h2 className="text-xl">Sell your course</h2>
            </div>
            <PriceForm initialData={course} courseId={course.id} />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl">Resources & attactments</h2>
            </div>
            <AttachmentForm initialData={course} courseId={course.id} />

          </div>
        </div>
      </div>
    </div>
    </>
   

  )
}

export default page