"use client"

import { createContext, useContext, useState } from "react"

export function LocaleProvider({ children }: LocaleProviderProps) {
    const [questlocales, setQuestLocales] = useState<string[]>([])

    const [selectedLocale, setSelectedLocale] = useState<string>("")

    return (
        <LocaleContext.Provider
            value={{
                questlocales,
                setQuestLocales,
                selectedLocale,
                setSelectedLocale,
            }}
        >
            {children}
        </LocaleContext.Provider>
    )
}

interface LocaleProviderProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const LocaleContext = createContext({
    questlocales: [] as string[],
    setQuestLocales: (locales: string[]) => { },

    selectedLocale: "",
    setSelectedLocale: (locale: string) => { },
})

export const useLocale = () => useContext(LocaleContext)