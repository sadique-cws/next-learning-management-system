import { LatestMembers } from "@/app/(admin)/_components/LatestMember"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getTotalPaymentAmount } from "@/actions/get-purchase";
import { formatPrice } from "@/lib/format";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { DataCard } from "@/components/data-card";


const page = async () => {

  const total = await getTotalPaymentAmount();
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 ">

        <DataCard label="Total Members" value={3} />
        <DataCard label="Total Courses" value={3} />
        <DataCard label="Total Chapters" value={3} />
        <DataCard label="Total Payments" value={total} shouldFormat/>

      </div>

      <div className='grid grid-cols-2 gap-3'>
        <LatestMembers />
      </div>
    </div>
  )
}

export default page