"use client"
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2, Lock } from "lucide-react"
import { useState } from "react"

export const VideoPlayer = ({
    playbackId,
    courseId,
    chapterId,
    nextChapterId,
    isLocked,
    completeOnEnd,
    title,
}) => {

    const [isReady, setIsReady] = useState(false);

    return ( 
        <div className="relative aspect-video">
            {!isReady && !isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                        <Loader2 className="h-8 w-8 animate-spin text-secondary"/>
                    </div>
                )}
            {
                isLocked && (
                    <div className="absolute inset-0 items-center justify-center flex bg-slate-800 flex-col gap-y-2 text-secondary">
                        <Lock className="w-8 h-8"/>
                        <span className="text-sm font-medium">This chapter is locked</span>    
                    </div>
                )}

            {!isLocked && (
                <MuxPlayer 
                title={title} 
                className={cn(!isReady && "hidden")}
                onCanPlay={() => setIsReady(true)}
                onEnded={() => {}}
                autoPlay
                playbackId={playbackId}
                />
            )}
        </div>
    )
}