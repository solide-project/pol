"use client"

import { Course } from "@/lib/db/course"
import { flatten, QuestStructure, QuestStructureItem } from "@/lib/quest"
import { createContext, useContext, useState } from "react"

export function QuestProvider({ children }: QuestProviderProps) {
    const [questOwner, setQuestOwner] = useState<string>("")
    const [questName, setQuestName] = useState<string>("")

    const [questStructure, setQuestStructure] = useState<QuestStructure>({} as QuestStructure)
    const [questPoap, setQuestPoap] = useState<Course | undefined>()

    const [selectedQuest, setSelectedQuest] = useState<QuestStructureItem | null>(null)

    // This is used to navigate the quest via pagination
    const [navIndex, setNavIndex] = useState<number>(0)

    const [showIDE, setShowIDE] = useState<boolean>(true)

    const handleSetQuestStructure = (uri: QuestStructureItem) => {
        const nav = flatten(questStructure)
        const index = nav.findIndex((item) => item.id === uri.name.id)
        if (index !== -1) {
            setNavIndex(index)
            setSelectedQuest(uri)
        }
    }

    // This is not recommended to be used, but for now, this is the only way to properly set the quest structure 
    // at the beginning
    const manualSetQuestStructure = (uri: QuestStructureItem, index: number = 0) => {
        setNavIndex(index)
        setSelectedQuest(uri)
    }

    return (
        <QuestContext.Provider
            value={{
                questOwner,
                setQuestOwner,
                questName,
                setQuestName,
                questPoap,
                setQuestPoap,
                questStructure,
                setQuestStructure,
                selectedQuest,
                handleSetQuestStructure,
                manualSetQuestStructure,
                navIndex,
                setNavIndex,
                showIDE,
                setShowIDE
            }}
        >
            {children}
        </QuestContext.Provider>
    )
}

interface QuestProviderProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const QuestContext = createContext({
    questOwner: "",
    setQuestOwner: (owner: string) => { },
    questName: "",
    setQuestName: (name: string) => { },
    questPoap: undefined as Course | undefined,
    setQuestPoap: (poap: Course | undefined) => { },
    questStructure: {} as QuestStructure,
    setQuestStructure: (structure: QuestStructure) => { },
    selectedQuest: null as QuestStructureItem | null,
    handleSetQuestStructure: (file: QuestStructureItem) => { },
    manualSetQuestStructure: (file: QuestStructureItem, index?: number) => { },
    navIndex: 0,
    setNavIndex: (index: number) => { },
    showIDE: false,
    setShowIDE: (show: boolean) => { }
})

export const useQuest = () => useContext(QuestContext)