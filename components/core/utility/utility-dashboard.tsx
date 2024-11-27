"use client"

import React, { useState } from "react";
import { SideBar, SideBarItems } from "@/components/core/utility/side-bar";
import { HashMessage } from "./hash-message";
import { DeploymentID } from "./deployment-id";
import { QuestValidator } from "./quest-validator";
import { QuestTester } from "./quest-tester";
import { CreateQuest } from "./create-quest";
import { SelectType } from "./components/select-type";
import { buttonVariants } from "@/components/ui/button";

enum ChainType {
    EVM,
    MOVE,
}

interface UtilityDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function UtilityDashboard({ className }: UtilityDashboardProps) {
    const [type, setType] = useState<ChainType>(ChainType.EVM)
    const [tab, setTab] = useState<string>("")

    const generateSelectedTab = (tab: string) => {
        switch (tab) {
            case SideBarItems.QUEST_ID:
                return <HashMessage type={type} />
            case SideBarItems.BYTECODE_HASH:
                return <DeploymentID type={type} />
            case SideBarItems.QUEST_VALIDATOR:
                return <QuestValidator />
            case SideBarItems.QUEST_TESTER:
                return <QuestTester type={type} />
            default:
                return <CreateQuest />
        }
    }

    return <div className="p-4">
        <div className="h-[87vh] max-h-[87vh] flex w-full flex-col sm:flex-row">
            <SideBar handleOnSelect={(value: string) => setTab(value)} />
            <div className="relative flex-1 p-8">
                <div className="flex items-center justify-between mb-4">
                    <a href="https://docs.solide0x.tech/docs/pol/intro" target="_blank"
                        className={buttonVariants({ variant: "default" })}>
                        Full Documentation
                    </a>
                    <SelectType onValueChange={setType} />
                </div>
                {generateSelectedTab(tab)}
            </div>
        </div>
    </div>
}