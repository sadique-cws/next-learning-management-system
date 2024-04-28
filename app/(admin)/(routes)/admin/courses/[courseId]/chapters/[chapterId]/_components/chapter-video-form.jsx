"use client";

import { useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/file-upload";

import toast from "react-hot-toast";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import MuxPlayer from "@mux/mux-player-react";



export const ChapterVideoForm = ({ initialData,muxData, courseId, chapterId }) => {

    console.log("mux", muxData);
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values) => {
        try {
            await axios.patch(`/api/course/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter updated");
            toggleEdit();
            // Refreshes the server component fetching the new data from the db
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter Video
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && <>Cancel</>}
                    {!isEditing && !initialData.videoUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add an Video
                        </>
                    )}
                    {!isEditing && initialData.videoUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Video
                        </>
                    )}
                </Button>
            </div>
            {!isEditing &&
                (!initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <VideoIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                      <MuxPlayer streamType="on-demand" playbackId={muxData?.playbackId || ""}/>
                    </div>
                ))}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="chapterVideo"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoUrl: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Upload this Chapter&apos;s video
                    </div>
                </div>
            )}
            {
                initialData.videoUrl && !isEditing && (
                    <div className="text-xs text-muted-foreground mt-2">
                        Video can take a few minutes to process. Refresh the page if video does not appear. 
                    </div>
                )
                
            }
        </div>
    );
};