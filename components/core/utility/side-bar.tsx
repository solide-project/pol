import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Fingerprint, Hash, LayoutTemplate, TestTubeDiagonal, TicketCheck } from "lucide-react";

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
    return <aside className="w-14 py-4 flex-col justify-between rounded-lg bg-grayscale-025">
        <div className="flex flex-col items-center space-y-4">
            {Object.entries(SideBarItems).map(([key, value], index) => {
                return <Tooltip key={index}>
                    <TooltipTrigger onClick={() => handleOnSelect(value)}>
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