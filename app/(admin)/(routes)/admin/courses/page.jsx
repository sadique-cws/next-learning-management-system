import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { db } from "@/lib/db"

const page = async () => {

  const courses = await db.course.findMany();

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex justify-between flex-1 items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Manage Courses</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className=''>
            <Link href="/admin/courses/create"><Button className="flex gap-2" size="sm"><PlusCircle/> Create Course</Button></Link>
      </div>
      </div>
      
      <div className='grid grid-cols-1'>
          <DataTable data={courses} columns={columns}/>
      </div>
    </div>
  )
}

export default page