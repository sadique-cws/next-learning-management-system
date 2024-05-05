import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { AlertTriangle, CheckCircleIcon } from "lucide-react"


const bannerVariants = cva("border text-center text-sm flex items-center w-full p-4",{
    variants: {
        variant: {
            warning: "bg-yellow-200/80 border-yellow-300 text-primary",
            success:"bg-emerald-700 border-emerald-800 text-secondary",
        }
    },
    defaultVariants: {
        variant: "warning"
    }
})

const IconMap = {
    warning: AlertTriangle,
    success: CheckCircleIcon,
}


const Banner = ({label, variant}) => {

    const Icon = IconMap[variant || "warning"]
  return (
    <div className={cn(bannerVariants({variant}))}>
        <Icon className="h-4 w-4 mr-2" />
        {label}
    </div>
  )
}

export default Banner