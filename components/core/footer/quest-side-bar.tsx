"use client"

import React, { useEffect, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useQuest } from "@/components/providers/quest-provider";
import { SideBarItem } from "@/components/core/footer/side-bar-item";
import { BookOpen, Github, Menu } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";
import { SelectLocale } from "./select-locale";

interface QuestSideBarProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function QuestSideBar({ }: QuestSideBarProps) {
    const { questOwner, questName, selectedQuest, questStructure } = useQuest()
    const [sheetOpen, setSheetOpen] = useState(false);

    useEffect(() => {
        // If directory, keep the sidebar open
        if (!selectedQuest?.children) {
            setSheetOpen(false)
        }
    }, [selectedQuest])

    return <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger className="flex items-center space-x-2 font-medium hover:text-primary">
            <Menu />
            <div className="hidden md:block capitalize font-">
                {selectedQuest?.name.title || "No Quest Selected"}
            </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-[400px] sm:w-[540px] rounded-r-lg flex flex-col justify-between">
            <div>
                <SheetHeader>
                    <SheetTitle className="mb-4">{questName || "Menu"}</SheetTitle>
                </SheetHeader>
                <ol className="relative border-s border-gray-200 dark:border-gray-700 ml-2">
                    {Object.keys(questStructure).map((key, index) => {
                        return <SideBarItem key={index} quest={questStructure[key]} isExpanded={sheetOpen} />
                    })}
                </ol>
            </div>

            <div className="flex flex-col gap-4">
                <SelectLocale callback={() => setSheetOpen(false)} />
                <div className="flex items-center gap-2">
                    <a className="flex items-center gap-2 cursor-pointer hover:text-primary"
                        target="_blank" href={selectedQuest?.name.path}>
                        <BookOpen /> Resource
                    </a>
                    <a className="flex items-center gap-2 cursor-pointer hover:text-primary"
                        target="_blank" href={`https://github.com/${questOwner}/${questName}/discussions`}>
                        <Github /> Discussion
                    </a>
                    {/* <div>
                        {selectedQuest?.name.id || "No Quest Id"}
                    </div> */}
                </div>
            </div>
        </SheetContent>
    </Sheet>
}