import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Fingerprint, Hash, LayoutTemplate, TestTubeDiagonal, TicketCheck } from "lucide-react";
import { useState } from "react";

interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
    handleOnSelect: (e: string) => void
}

export enum SideBarItems {
    QUEST_TEMPLATE = "quest-template",
    QUEST_ID = "quest-id",
    BYTECODE_HASH = "bytecode-hash",
    QUEST_VALIDATOR = "quest-validator",
    QUEST_TESTER = "quest-tester",
}

export const icons: Record<SideBarItems, JSX.Element> = {
    [SideBarItems.QUEST_TEMPLATE]: <LayoutTemplate />,
    [SideBarItems.QUEST_ID]: <Fingerprint />,
    [SideBarItems.BYTECODE_HASH]: <Hash />,
    [SideBarItems.QUEST_VALIDATOR]: <TicketCheck />,
    [SideBarItems.QUEST_TESTER]: <TestTubeDiagonal />,
}
// Convert string to title case and remove - and _
export const toTitleCase = (str: string) => {
    return str.replace(/-|_/g, " ").replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export function SideBar({ className, handleOnSelect }: SideBarProps) {
    const [selectedValue, setSelectedValue] = useState("")
    const handleOnClick = (value: string) => {
        handleOnSelect(value)
        setSelectedValue(value)
    }

    return <aside className="w-full h-14 py-0 sm:w-14 sm:h-max sm:py-4 flex-col justify-between rounded-lg bg-grayscale-025">
        <div className="flex flex-row sm:flex-col justify-center items-center gap-2">
            {Object.entries(SideBarItems).map(([key, value], index) => {
                return <Tooltip key={index}>
                    <TooltipTrigger onClick={() => handleOnClick(value)}
                        className={`${selectedValue && selectedValue === value ? "bg-secondary rounded-lg p-2" : "p-2"}`}>
                        {icons[value]}
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        {toTitleCase(value)}
                    </TooltipContent>
                </Tooltip>
            })}
        </div>
    </aside>
}