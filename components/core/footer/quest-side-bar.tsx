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
import { Menu } from "lucide-react";

interface QuestSideBarProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function QuestSideBar({ className }: QuestSideBarProps) {
    const { selectedQuest, questStructure } = useQuest()
    const [sheetOpen, setSheetOpen] = useState(false);

    useEffect(() => {
        // If directory, keep the sidebar open
        if (!selectedQuest?.children) {
            setSheetOpen(false)
        }
    }, [selectedQuest])

    return <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger className="flex items-center space-x-2 hover:text-primary">
            <Menu />
            <div className="hidden md:block">
                {selectedQuest?.name.number} - {selectedQuest?.name.title}
            </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-[400px] sm:w-[540px] rounded-r-lg">
            <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div>
                {Object.keys(questStructure).map((key, index) => {
                    return <SideBarItem key={index} quest={questStructure[key]} isExpanded={sheetOpen} />
                })}
            </div>
        </SheetContent>
    </Sheet>
}