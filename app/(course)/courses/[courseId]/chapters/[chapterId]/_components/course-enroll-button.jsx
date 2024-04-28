import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"

export const CourseEnrollButton = ({price, courseId}) => {
    return (
        <Button className="w-full md:w-auto">
            Enroll for {formatPrice(price)}
        </Button>
    )
}