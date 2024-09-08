"use client"

import React, { useState } from "react";
import { SideBar, SideBarItems } from "@/components/core/utility/side-bar";
import { HashMessage } from "./hash-message";
import { Sha256Utility } from "./sha256";
import { QuestValidator } from "./quest-validator";
import { QuestTest } from "./quest-test";
import { CreateQuest } from "./create-quest";

interface UtilityDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function UtilityDashboard({ className }: UtilityDashboardProps) {
    const [tab, setTab] = useState<string>("")

    const generateSelectedTab = (tab: string) => {
        switch (tab) {
            case SideBarItems.QUEST_ID:
                return <HashMessage />
            case SideBarItems.BYTECODE_HASH:
                return <Sha256Utility />
            case SideBarItems.QUEST_VALIDATOR:
                return <QuestValidator />
            case SideBarItems.QUEST_TESTER:
                return <QuestTest />
            default:
                return <CreateQuest />
        }
    }

    return <div className="p-4">
        <div className="h-[87vh] max-h-[87vh] flex w-full flex-col sm:flex-row">
            <SideBar handleOnSelect={(value: string) => setTab(value)} />
            <div className="relative flex-1 p-8">
                {generateSelectedTab(tab)}
            </div>
        </div>
    </div>
}