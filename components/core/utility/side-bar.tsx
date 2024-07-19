import {
    LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SideBarHeader } from "@/components/core/utility/side-bar-header";

interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
    handleOnSelect: (e: string) => void
}

export enum SideBarItems {
    QUEST_ID = "quest-id",
    BYTECODE_HASH = "bytecode-hash",
    QUEST_VALIDATOR = "quest-validator",
    QUEST_TESTER = "quest-tester",
}

// Convert string to title case and remove - and _
export const toTitleCase = (str: string) => {
    return str.replace(/-|_/g, " ").replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export function SideBar({ className, handleOnSelect }: SideBarProps) {
    return <div className={cn(className)}>
        <div className="space-y-4 py-4">
            <div className="px-4 py-2">
                <SideBarHeader>Utility</SideBarHeader>
                <div className="flex sm:block items-center space-y-1">
                    {Object.entries(SideBarItems).map(([key, value], index) => {
                        return <Button key={index}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => handleOnSelect(value)}
                        >
                            <LayoutGrid className="mr-2 h-4 w-4" />
                            {toTitleCase(value)}
                        </Button>
                    })}
                </div>
            </div>
        </div>
    </div>
}