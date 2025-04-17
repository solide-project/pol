"use client"

import { NavDesktop } from "./nav-desktop"
import { NavMenu } from "./nav-menu"
import { NavMobile } from "./nav-mobile"

export function NavBar() {
    return (
        <div className="sticky top-6 z-50">
            <div className="hidden sm:block">
                <div className="flex items-center justify-center w-100%">
                    <NavDesktop />
                    {/* <NavMenu /> */}
                </div>
            </div>
            <div className="block sm:hidden">
                <NavMobile />
            </div>
        </div>
    )
}