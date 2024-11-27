"use client"

import React, { useEffect } from "react";
import { MarkdownViewer } from "@/components/core/quest/markdown-viewer";
import { GithubTreeInfo } from "@/lib/git";
import { useQuest } from "@/components/providers/quest-provider";
import { QuestFooter } from "@/components/core/footer/quest-footer";
import { flatten, folderItems, generateQuestContractPath, generateQuestId, generateQuestIdByQuestStructureItem, generateQuestPath, joinUri, QuestStructure, QuestTitle, stripBase } from "@/lib/quest";
import { IDEViewer } from "./ide-viewer";
import { cn } from "@/lib/utils";
import { Course } from "@/lib/db/course";

interface QuestViewerProps extends React.HTMLAttributes<HTMLDivElement> {
    owner: string,
    name: string,
    tree: GithubTreeInfo
    metadata?: Course
}

export function QuestViewer({ tree, owner, name, metadata }: QuestViewerProps) {
    const quest = useQuest()

    const generateQuest = (item: QuestTitle, owner: string, name: string, parent?: QuestTitle) => {
        const questItem = { name: item }
        questItem.name.path = generateQuestPath(item, owner, name, parent)
        questItem.name.playground = generateQuestContractPath(item, owner, name, parent)
        questItem.name.id = generateQuestIdByQuestStructureItem(questItem)

        return questItem
    }

    useEffect(() => {
        (async () => {
            console.log("QuestViewer mounted")

            const structure: QuestStructure = {} as QuestStructure
            // Get all folders under /content and remove /content from the path
            const trees = stripBase(tree.tree, "content/")
            const base = folderItems(trees)

            base.forEach(item => {
                const quest = generateQuest(item, owner, name)
                structure[item.number] = quest

                const subTrees = stripBase(trees, `${item.name}/`)
                const subItems = folderItems(subTrees)
                const subStructure = {} as QuestStructure
                subItems.forEach(subItem => {
                    const subQuest = generateQuest(subItem, owner, name, item);
                    subStructure[subItem.number] = subQuest
                })
                if (Object.keys(subStructure).length > 0) {
                    structure[item.number].children = subStructure
                }
            })

            // console.log("structure", structure)
            // console.log("metadata", metadata)

            const nav = flatten(structure)
            quest.manualSetQuestStructure({ name: nav[0].name })

            // Set the quest structure
            quest.setQuestStructure(structure)
            quest.setQuestOwner(owner)
            quest.setQuestName(name)
            quest.setQuestPoap(metadata)
        })()
    }, [])

    return <>
        <div className="grid grid-cols-12">
            <div className={cn("col-span-12 mt-8", quest.showIDE ? "lg:col-span-5" : "")}>
                <MarkdownViewer />
            </div>
            <div className={cn(quest.showIDE ? "sticky top-0 col-span-12 lg:col-span-7 h-screen flex items-center justify-between" : "invisible")}>
                {owner && name &&
                    <IDEViewer uri={`https://solide0x.tech?url=https://github.com/${owner}/${name}/blob/master/contracts/Import.sol`} />}
            </div>
        </div>
        <QuestFooter className="sticky bottom-2 mx-4" />
    </>
}