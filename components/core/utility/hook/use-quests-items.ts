import { useState } from "react";

export interface QuestItemInterface {
    [key: string]: any // Transaction | Deployment
}

export const useQuestItems = () => {
    const [questItems, setQuestItems] = useState<QuestItemInterface>({})

    const handleCreateQuest = (quest: string, sub: string = "") => {
        const key = [quest, sub].filter(i => i).join("/")

        setQuestItems({
            ...questItems,
            [key]: {}
        })
    }

    const handleRemoveQuestItem = (quest: string, sub: string = "") => {
        const key = [quest, sub].filter(i => i).join("/")

        if (!(key in questItems)) {
            return
        }

        const prev = { ...questItems }
        delete prev[key]

        setQuestItems(prev)
    }

    const handleRenameQuestItem = (oldQuest: string, newQuest: string,
        oldSub: string = "", newSub: string = ""
    ) => {
        const oldKey = [oldQuest, oldSub].filter(i => i).join("/")
        const newKey = [newQuest, newSub].filter(i => i).join("/")

        if (!(oldQuest || newQuest || oldSub || newSub)) {
            return
        }

        if (oldKey === newKey) {
            return
        }


        if (!(oldKey in questItems)) {
            return
        }

        const prev = { ...questItems }
        prev[newKey] = { ...prev[oldKey] }
        delete prev[oldKey]

        // Rename sub questItems only if its a rename on a main subquest. Note main and sub are determine
        // if the sub quest names are empty
        if (!(oldSub || newSub)) {
            Object.keys(prev).forEach(item => {
                if (item.startsWith(`${oldQuest}/`)) {
                    const newKey = item.replace(`${oldQuest}/`, `${newQuest}/`)
                    console.log(newKey)
                    prev[newKey] = { ...prev[item] }
                    delete prev[item];
                }
            })

        }
        console.log(prev)
        setQuestItems(prev)
    }

    const handleUpdateQuestItem = (quest: string, sub: string, value: any) => {
        const key = [quest, sub].filter(i => i).join("/")

        if (!(key in questItems)) {
            return
        }

        const prev = { ...questItems }
        prev[key] = value

        setQuestItems(prev)
    }

    return {
        questItems,
        handleCreateQuest,
        handleRemoveQuestItem,
        handleRenameQuestItem,
        handleUpdateQuestItem
    }
}