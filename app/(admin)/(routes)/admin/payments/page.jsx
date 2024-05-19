import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { PaymentTable } from "./payment-tables"
import { columns } from "./columns"
import { getPurchase } from "@/actions/get-purchase"

const page = async () => {

  const purchase = await getPurchase();

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
                <BreadcrumbPage>Manage Payments</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className='grid grid-cols-1'>
          <PaymentTable data={purchase} columns={columns} />
        </div>
      </div>
    )
  }

  export default page