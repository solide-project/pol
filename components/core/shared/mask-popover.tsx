import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { mask } from "@/lib/quest"
import { cn } from "@/lib/utils"

interface PopoverMaskProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string
    depth?: number
    href?: string
}

export const PopoverMask = ({ text, depth = 12, href, className }: PopoverMaskProps) => {
    return <Popover>
        <PopoverTrigger className={cn(className, "font-semibold")}>{!href
            ? <>{mask(text, depth)} </>
            : <a className="text-link truncate underline hover:cursor-pointer hover:text-primary" href={href} target="_blank">{mask(text, depth)}</a>
        }</PopoverTrigger>
        <PopoverContent className="p-2 px-3 rounded-sm w-fit">{text}</PopoverContent>
    </Popover>
}