import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CodeSnippet } from "../shared/code-snippet"
import { CopyText } from "../shared/copy-text"
import { useEffect, useState } from "react"
import { QuestItemInterface } from "./hook/use-quests-items"

interface CreateQuestCodeProps extends React.HTMLAttributes<HTMLDivElement> {
    layout: object
    quests: QuestItemInterface
}

export function CreateQuestCode({ layout, quests }: CreateQuestCodeProps) {
    const [config, setConfig] = useState<any>({})

    useEffect(() => {
        const questsConfig: any[] = Object.entries(quests).map(([key, val]) => {
            return {
                path: key,
                ...val
            }
        });
        setConfig({
            metadata: {
                owner: "{REPO_OWNER}",
                name: "{REPO_NAME}",
                chain: "{DEFAULT_CHAINID}",
                title: "{RESOURCE_TITLE}",
                description: "{RESOURCE_DESCRIPTION}",
                image: "{RESOURCE_COVER_PAGE}"
            },
            quests: questsConfig
        })
    }, [quests])

    return <Dialog>
        <DialogTrigger>Copy Quest</DialogTrigger>
        <DialogContent className="h-[75vh]">
            <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
            </DialogHeader>

            <div className="overflow-auto">
                <CodeSnippet language="json">
                    {JSON.stringify(config, null, 2)}
                </CodeSnippet>
                <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-8 rounded-md px-3 text-xs absolute right-4 top-4 bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground">
                    <CopyText payload={JSON.stringify(config)} />
                </button>
            </div>
        </DialogContent>
    </Dialog>
}