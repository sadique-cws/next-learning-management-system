import { LatestMembers } from "@/app/(admin)/_components/LatestMember"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


const page = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className="flex justify-between flex-1 items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className=''>

      </div>
      </div>
      
      <div className='grid grid-cols-2 gap-3'>
          <LatestMembers/>
          <LatestMembers/>
      </div>
    </div>
  )
}

export default page