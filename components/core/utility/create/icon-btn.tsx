import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface IconBtnProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string,
    content?: string
    icon?: JSX.Element
}

export function IconBtn({ title, content, icon, onClick }: IconBtnProps) {
    return <Tooltip>
        <TooltipTrigger>
            <div className="flex items-center text-sm hover:text-primary hover:cursor-pointer gap-2" onClick={onClick}>
                {icon && icon}
                {title && <div>{title}</div>}
            </div>
        </TooltipTrigger>
        <TooltipContent>
            {content && <p>{content}</p>}
        </TooltipContent>
    </Tooltip>
}