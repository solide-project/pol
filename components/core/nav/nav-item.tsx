import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
    title: any
}

export function NavItem({ className, title, children, ...props }: NavItemProps) {

    return (
        <li className="col-span-12">
            <NavigationMenuLink>
                <div
                    className={cn(
                        "block select-none space-y-1 leading-none no-underlin p-3 py-4 rounded-[18px] outline-none transition-colors bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer dark:text-black",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                </div>
            </NavigationMenuLink>
        </li>
    )
}