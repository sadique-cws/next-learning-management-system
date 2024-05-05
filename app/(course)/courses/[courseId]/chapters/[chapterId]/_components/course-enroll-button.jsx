"use client"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

export const CourseEnrollButton = ({price, courseId}) => {
    const [isLoading, setisLoading] = useState(false);

    const onClick = async () => {
        try{
            setisLoading(true);
            const response = await axios.post(`/api/course/${courseId}/checkout`)
            window.location.assign(response.data.url);
        }
        catch{
            toast.error("something went wrong")
        }
        finally{
            setisLoading(false);
        }
    }
    return (
        <Button onClick={onClick} disabled={isLoading} className="w-full md:w-auto">
            Enroll for {formatPrice(price)}
        </Button>
    )
}