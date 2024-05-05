import { LatestMembers } from "@/app/(admin)/_components/LatestMember"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"


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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="bg-emerald-600 text-white">
            <CardContent className="p-5">
              <CardTitle>10+</CardTitle>
              <CardDescription className="text-white">Total Students</CardDescription>
            </CardContent>
        </Card>
        <Card className="bg-yellow-600 text-white">
            <CardContent className="p-5">
              <CardTitle>10+</CardTitle>
              <CardDescription className="text-white">Total Courses</CardDescription>
            </CardContent>
        </Card>
        <Card className="bg-sky-600 text-white">
            <CardContent className="p-5">
              <CardTitle>10+</CardTitle>
              <CardDescription className="text-white">Total Users</CardDescription>
            </CardContent>
        </Card>
        <Card className="bg-red-600 text-white">
            <CardContent className="p-5">
              <CardTitle>10+</CardTitle>
              <CardDescription className="text-white">Total Payments</CardDescription>
            </CardContent>
        </Card>
        
      </div>
      
      <div className='grid grid-cols-2 gap-3'>
          <LatestMembers/>
          <LatestMembers/>
      </div>
    </div>
  )
}

export default page