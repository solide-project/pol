"use client"

import { MobileNavBar } from "./mobile-nav-bar"
import { MainNavBar } from "./main-nav-bar"

export function NavBar() {
    return (
        <div className="sticky top-6 mx-4 z-50">
            <div className="hidden sm:block">
                <MainNavBar />
            </div>
            <div className="block sm:hidden">
                <MobileNavBar />
            </div>
        </div>
    )
}