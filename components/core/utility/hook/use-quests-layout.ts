import { useState } from "react";

const isValidFilename = (filename: string) => {
    return /^\d+_[a-zA-Z0-9-_]+$/.test(filename);
}

export const useQuestsLayout = () => {
    const [questLayout, setQuestLayout] = useState<{
        [key: string]: string[];
    }>({})


    const handleAddQuest = () => {
        setQuestLayout({
            ...questLayout,
            ["00_resource"]: []
        })
    }

    const handleRenameQuest = (oldName: string, newName: string) => {
        if (!isValidFilename(newName)) {
            throw Error("Invalid name. Format as {number}_{title}")
        }

        if (oldName === newName) {
            return
        }

        const prev = { ...questLayout }

        if (!(oldName in prev)) {
            return
        }

        if (newName in prev) {
            throw Error("Existing name")
        }

        prev[newName] = prev[oldName]
        delete prev[oldName]

        setQuestLayout(prev);
    };

    const handleRenameSubQuest = (quest: string, oldName: string, newName: string) => {
        if (!isValidFilename(newName)) {
            throw Error("Invalid name. Format as {number}_{title}")
        }

        if (oldName === newName) {
            return
        }

        const prev = { ...questLayout }

        if (!(quest in prev)) {
            return prev;
        }

        const updatedSubQuests = prev[quest].map(subQuest =>
            subQuest === oldName ? newName : subQuest
        );

        setQuestLayout({ ...prev, [quest]: updatedSubQuests });
    };

    const handleDeleteQuest = (name: string) => {
        setQuestLayout((prevLayout) => {
            const { [name]: _, ...rest } = prevLayout;
            return rest;
        });
    };

    const handleDeleteSubQuest = (quest: string, name: string) => {
        setQuestLayout((prevLayout) => {
            if (!(quest in prevLayout)) {
                return prevLayout;
            }

            const updatedSubQuests = prevLayout[quest].filter(subQuest => subQuest !== name);

            return { ...prevLayout, [quest]: updatedSubQuests };
        });
    };

    const handleAddSubQuest = (quest: string, name: string) => {
        setQuestLayout((prevLayout) => {
            if (!(quest in prevLayout)) {
                return { ...prevLayout, [quest]: [name] };
            }

            if (prevLayout[quest].includes(name)) {
                return { ...prevLayout };
            }

            return { ...prevLayout, [quest]: [...prevLayout[quest], name] };
        });
    };

    return {
        questLayout,
        setQuestLayout,

        handleRenameQuest,
        handleRenameSubQuest,
        handleDeleteQuest,
        handleDeleteSubQuest,

        handleAddQuest,
        handleAddSubQuest,
    }
} 