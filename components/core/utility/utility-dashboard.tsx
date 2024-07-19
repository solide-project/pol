"use client"

import React, { useState } from "react";
import { SideBar, SideBarItems, toTitleCase } from "@/components/core/utility/side-bar";
import { HashMessage } from "./hash-message";
import { Sha256Utility } from "./sha256";
import { SideBarHeader } from "@/components/core/utility/side-bar-header";
import { QuestValidator } from "./quest-validator";
import { QuestTest } from "./quest-test";

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
                return <HashMessage />
        }
    }

    return <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-4">
            <SideBar handleOnSelect={(value: string) => setTab(value)} />
        </div>
        <div className="col-span-12 lg:col-span-8">
            <SideBarHeader className="my-4">{toTitleCase(tab)}</SideBarHeader>
            {generateSelectedTab(tab)}
        </div>
    </div>
}