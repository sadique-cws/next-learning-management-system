import {redirect} from "next/navigation"

const page = () => {
    redirect("/admin/dashboard")
  return (
    <div>Loading...</div>
  )
}

export default page