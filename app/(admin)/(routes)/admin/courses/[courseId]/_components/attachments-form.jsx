"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
import toast from "react-hot-toast";
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";



export const AttachmentForm = ({ initialData, courseId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values) => {
        try {
            await axios.post(`/api/course/${courseId}/attachments`, values);
            toast.success("Course updated");
            toggleEdit();
            // Refreshes the server component fetching the new data from the db
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const onDelete = async(id) => {
        try{
            setDeletingId(id);
            await axios.delete(`/api/course/${courseId}/attachments/${id}`);
            toast.success("Course Attachment deleted");
            router.refresh();
        }   
        catch(err){
            toast.error("Something went wrong");
        }
        finally{
            setDeletingId(null);
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Attachments
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && <>Cancel</>}
                    {!isEditing && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add a File
                        </>
                    )}
                   
                </Button>
            </div>
            {!isEditing && (
                <>
                    {initialData.attachments.length === 0 && (
                        <p className="text-sm text-slate-500 italic mt-2">
                            No attachments yets
                        </p>
                    )}
                </>
            ) }
            {
                initialData.attachments.length > 0 && (
                    <div className="space-y-2">
                        {initialData.attachments.map((attachment) => (
                            <div key={attachment.id} className="flex items-center w-full p-3 bg-sky-100 border-sky-200 border rounded-md text-sky-700">
                                 <File className="h-4 w-4 flex-shrink-0 mr-2"/>
                                 <p className="text-sm line-clamp-1">
                                    {attachment.name}
                                 </p>
                                 {deletingId === attachment.id && (
                                        <div className="ml-auto">
                                            <Loader2 className="w-4 h-4 animate-spin"/>
                                        </div>
                                )}
                                 {deletingId !== attachment.id && (
                                        <button onClick={() => onDelete(attachment.id)} className="transition ml-auto hover:opacity-75">
                                            <X className="w-4 h-4"/>
                                        </button>
                                )}
                            </div>
                        ))}
                    </div>
                )
            }

            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseAttachment"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Add anything your want to share with students for this course
                    </div>
                </div>
            )}
        </div>
    );
};