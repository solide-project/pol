"use client"

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface IDEViewerProps extends React.HTMLAttributes<HTMLDivElement> {
    uri: string
}

export function IDEViewer({ uri, className }: IDEViewerProps) {
    const [url, setUrl] = useState("")
    useEffect(() => {
        setUrl(uri)
    }, [])

    const iframeRef = useRef<HTMLIFrameElement>(null);
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         try {
    //             if (iframeRef.current && iframeRef.current.contentWindow) {
    //                 const currentUrl = iframeRef.current.contentWindow.location.href;
    //                 console.log('Current iframe URL:', currentUrl);
    //             }
    //         } catch (error) {
    //             console.error('Cannot access iframe URL due to cross-origin restrictions:', error);
    //         }
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, []);

    return <div className={cn("container", className)}>
        <a className="text-center" href={url} target="_blank">
            If you&apos;re experiencing issues with the IDE, click here to open it in a new tab.
        </a>
        <iframe
            className="rounded-lg"
            ref={iframeRef}
            src={url}
            width="100%"
            height="500px"
            allow="clipboard-write"
        />
    </div>
}