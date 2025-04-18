import { useQuest } from "@/components/providers/quest-provider";
import { QuestStructure, QuestStructureItem } from "@/lib/quest";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SideBarItemProps extends React.HTMLAttributes<HTMLDivElement> {
    quest: QuestStructureItem,
    isExpanded?: boolean
    depth?: number
    main?: number
}

export function SideBarItem({ quest, isExpanded = false, depth = 1, main }: SideBarItemProps) {
    const { handleSetQuestStructure } = useQuest();
    const [expanded, setExpanded] = useState(false);

    const handleOnClick = (item: QuestStructureItem) => {
        handleSetQuestStructure(item);
    };

    const toggleExpand = () => {
        setExpanded(prev => !prev);
    };

    return <>
        <li className="mb-4 ms-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-grayscale-025 rounded-[16px] -start-3">
                <div className="text-sm">{main ? `${main}.${quest.name.number}` : `${quest.name.number}.0`}</div>
            </span>
            <h3 className="flex items-center space-x-2 mb-1">
                <div className="truncate capitalize cursor-pointer hover:text-primary" onClick={(e) => handleOnClick(quest)}>{quest.name.title}</div>
                {quest.children && (
                    <div onClick={toggleExpand} className="cursor-pointer">
                        {expanded ? <ChevronUp size={16} strokeWidth={3} /> : <ChevronDown size={16} strokeWidth={3} />}
                    </div>
                )}
            </h3>
        </li>
        {expanded && quest.children && Object.keys(quest.children || {}).map((key, index) => (
            <SideBarItem
                key={index}
                quest={(quest.children as QuestStructure)[key]}
                depth={depth + 1}
                main={quest.name.number}
            />
        ))}
    </>
}