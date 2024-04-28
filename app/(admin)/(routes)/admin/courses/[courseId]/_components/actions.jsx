"use client"

import ConfirmModel from "@/components/models/confirm-model"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"


export const Actions = ({disabled, courseId, isPublished}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const onClick = async () => {
        try {
            setIsLoading(true);
            if (isPublished) {
                await axios.patch(
                    `/api/course/${courseId}/unpublish`
                );
                toast.success("Chapter unpublished");
            } else {
                await axios.patch(
                    `/api/course/${courseId}/publish`
                );
                toast.success("Chapter published");
            }
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };
    const onDelete = async() => {
        try{
            setIsLoading(true);
            await axios.delete(`/api/course/${courseId}`)
            toast.success("Chapter deleted");
            router.push(`/admin/courses`)
            router.refresh();
        }
        catch(error){
            toast.error("something went wrong")
        }
        finally{
            setIsLoading(false);
        }
    }
    return (
        <div className="flex items-center gap-x-2">
            <Button onClick={onClick} disabled={disabled} variant="outline" size="sm">
                {isPublished ? "Unpublished" : "Published"}
            </Button>
           <ConfirmModel onConfirm={onDelete}>
            <Button size="sm" disabled={isLoading}>
                    <Trash className="w-4 h-4"/>
                </Button>
           </ConfirmModel>
        </div>
    )
}