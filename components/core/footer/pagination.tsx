"use client"

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuest } from "@/components/providers/quest-provider";
import { flatten, generateQuestIdByQuestStructureItem } from "@/lib/quest";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function QuestPagination({ className }: QuestPaginationProps) {
    const quest = useQuest()
    const [navLength, setNavLength] = useState<number>(0)

    useEffect(() => {
        setNavLength(flatten(quest.questStructure).length)
    }, [quest.questStructure])

    const foundIndex = () => {
        if (!quest.selectedQuest) return

        const questId = generateQuestIdByQuestStructureItem(quest.selectedQuest);
        const nav = flatten(quest.questStructure)
        const index = nav.findIndex((item) => item.id === questId)

        return { index, nav }
    }

    const handlePrev = () => {
        const { index, nav }: any = foundIndex()


        if (index <= 0) return

        quest.handleSetQuestStructure(nav[index - 1])
    }

    const handleNext = () => {
        const { index, nav }: any = foundIndex()

        if (index === -1) return
        if (index + 1 >= nav.length) return

        quest.handleSetQuestStructure(nav[index + 1])
    }

    return <div className={cn("flex items-center space-x-2", className)}>
        <Button variant="ghost" className="flex items-center gap-1"
            onClick={handlePrev} disabled={quest.navIndex <= 0} >
            <ArrowBigLeft />
            <div className="hidden md:block">Back</div>
        </Button>
        <div>{quest.navIndex}</div>
        <Button variant="ghost" className="flex items-center gap-1"
            onClick={handleNext} disabled={quest.navIndex + 1 >= navLength} >
            <div className="hidden md:block">Next</div>
            <ArrowBigRight />
        </Button>
    </div>
}