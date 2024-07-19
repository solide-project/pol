"use client"

import React from "react";
import { QuestSideBar } from "./quest-side-bar";
import { QuestPagination } from "./pagination";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useQuest } from "@/components/providers/quest-provider";
import { SubmissionButton } from "@/components/core/footer/submission-btn";
import { MintingQuest } from "@/components/core/footer/minting-quest";
import { Terminal } from "lucide-react";

interface QuestFooterProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function QuestFooter({ className }: QuestFooterProps) {
    const { showIDE, setShowIDE } = useQuest()

    const handleShowPlayground = () => {
        setShowIDE(!showIDE)
    }

    return <div className={cn("px-4 py-2 flex items-center justify-between rounded-lg bg-grayscale-025 z-50", className)}>
        <div>
            <QuestSideBar />
        </div>
        <div className="flex items-center space-x-1 md:space-x-2">
            <MintingQuest />
            <SubmissionButton />
            <Button className="gap-2" variant="ghost" onClick={handleShowPlayground}>
                <div className="hidden md:block">IDE</div>
                <Terminal />
            </Button>
            <QuestPagination />
        </div>
    </div>
}