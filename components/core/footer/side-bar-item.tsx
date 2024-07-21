import { useQuest } from "@/components/providers/quest-provider";
import { QuestStructure, QuestStructureItem } from "@/lib/quest";
import { useEffect } from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ArrowDown, ArrowLeft } from "lucide-react";


interface SideBarItemProps extends React.HTMLAttributes<HTMLDivElement> {
    quest: QuestStructureItem,
    isExpanded?: boolean
    depth?: number
}

export function SideBarItem({ quest, isExpanded = false, depth = 1 }: SideBarItemProps) {
    const { handleSetQuestStructure } = useQuest()

    const handleOnClick = (item: QuestStructureItem) => {
        handleSetQuestStructure(item)
    }

    return <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between">
            <div className="hover:cursor-pointer hover:text-primary" onClick={(e) => handleOnClick(quest)}>
                {quest.name.number} - {quest.name.title}
            </div>
            {quest.children && <div>
                {isExpanded ? <ArrowDown /> : <ArrowLeft />}
            </div>}
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-4">
            {quest.children && Object.keys(quest.children || {}).map((key, index) => {
                return <SideBarItem key={index} quest={(quest.children as QuestStructure)[key]} depth={depth + 1} />
            })}
        </CollapsibleContent>
    </Collapsible >
}