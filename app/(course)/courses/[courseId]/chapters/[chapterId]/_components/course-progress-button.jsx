"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import {  CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const CourseProgressButton = ({chapterId, courseId, isCompleted, nextChapterId}) => {
    const router = useRouter();
    const [isLoading, setIdLoading] = useState(false);

    const onClick = async () => { 
        try {
            setIdLoading(true);
            await axios.put(`/api/course/${courseId}/chapters/${chapterId}/progress`, {isCompleted: !isCompleted});

            if(!isCompleted && nextChapterId){
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            }
            toast.success("Progress Updated ");
            router.refresh();

        } 
        catch (error) {
            toast.error("something went wrong");
        } finally {
            setIdLoading(false);
        }
    }
    const Icon = isCompleted ? XCircle : CheckCircle;
    return (
       <Button 
       type="button"
       onClick={onClick}
       variant={isCompleted? "outline" : "success"}
       className="w-full md:w-auto">
            {isCompleted ? "Not Completed" : "Mark as Completed"}
            <Icon className="h-4 w-4 ml-2"/>
       </Button>
    )
}