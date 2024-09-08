import { useEffect, useRef, useState } from "react";
import { isAddress } from "viem";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useQuestsLayout } from "./hook/use-quests-layout";
import toast from "react-hot-toast";
import { CreateQuestCode } from "./create-quest-code";
import { useQuestItems } from "./hook/use-quests-items"
import { Tag } from "./create/tag";
import { Plus, ReceiptText, Save, ScanLine, Share, Trash } from "lucide-react";
import { IconBtn } from "./create/icon-btn";
import { SubmissionInput } from "./create/submission-input";
import { UtilHeader } from "./util-header";

interface CreateQuestProps extends React.HTMLAttributes<HTMLDivElement> {
}

enum QuestType {
    TRANSACTION,
    DEPLOY,
}

export function CreateQuest({ }: CreateQuestProps) {
    const { questLayout, handleAddQuest, handleAddSubQuest,
        handleDeleteQuest, handleDeleteSubQuest,
        handleRenameQuest, handleRenameSubQuest,
    } = useQuestsLayout()
    const { questItems, handleCreateQuest,
        handleRemoveQuestItem, handleRenameQuestItem,
        handleUpdateQuestItem } = useQuestItems()

    // Tuple: [main, sub]
    const [selectedItem, setSelectedItem] = useState<[string, string]>(["", ""])
    const [selectedItemData, setSelectedItemData] = useState<any>({})

    const parse = (filename: string): { number: string; title: string } | null => {
        const regex = /^(\d+)_([a-zA-Z0-9-_]+)$/;
        const match = filename.match(regex);

        if (match) {
            const number = match[1];
            const title = match[2];
            return { number, title };
        }

        return null;
    }

    useEffect(() => {
        try {
            setSelectedItemData(null)
            setOutput({})
            setQuestType(QuestType.TRANSACTION)
            const questParts = parse(selectedItem[0])
            const subParts = parse(selectedItem[1])

            if (!questParts) {
                throw Error("Invalid Parts")
            }

            const data = {
                main: questParts,
                sub: subParts
            }

            // Handle Quest that has been made for this resource
            const key = selectedItem.filter(i => i).join("/")
            if (questItems[key]) {
                const output = { ...questItems[key] }
                if (output.abi) {
                    output.abi = JSON.stringify(output.abi)
                }
                console.log(output, questItems[key].type === "transaction"
                    ? QuestType.TRANSACTION : QuestType.DEPLOY)
                setOutput(output)
                setQuestType(questItems[key].type === "transaction"
                    ? QuestType.TRANSACTION : QuestType.DEPLOY)
            }

            setSelectedItemData(data)
        } catch (e: any) {
            toast.error(e.message)

        }
    }, [selectedItem])

    // Layout
    const doCreateQuest = (quest: string, sub: string = "") => {
        try {
            handleCreateQuest(quest, sub)
            setSelectedItem([quest, sub])
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    const doRenameQuest = (oldName: string, newName: string) => {
        try {
            handleRenameQuest(oldName, newName)
            setSelectedItem([newName, ""])

            // Make sure to update the questItem AND its sub questItems as well if exist
            handleRenameQuestItem(oldName, newName, "", "")
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    const doRenameSubQuest = (quest: string, oldName: string, newName: string) => {
        try {
            handleRenameSubQuest(quest, oldName, newName)
            setSelectedItem([quest, newName])

            // Make sure to update the questItem as well if exist
            handleRenameQuestItem(quest, quest, oldName, newName)
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    const doDeleteSubQuest = (quest: string, name: string) => {
        try {
            handleDeleteSubQuest(quest, name)
            setSelectedItem(["", ""])
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    const doDeleteQuest = (quest: string) => {
        try {
            handleDeleteQuest(quest)
            setSelectedItem(["", ""])
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    // Quest
    const [questType, setQuestType] = useState<QuestType>(QuestType.TRANSACTION)
    const [output, setOutput] = useState<any>({

    })

    const updateQuestItemDeployment = (value: string) => {
        setOutput({
            ...output,
            bytecode: value
        })
    }

    const updateQuestItemTransactionArgs = (value: string) => {
        setOutput({
            ...output,
            args: value
        })
    }

    const updateQuestItemTransactionABI = (value: string) => {
        setOutput({
            ...output,
            abi: value
        })
    }

    const updateQuestItemTransactionContract = (value: string) => {
        setOutput({
            ...output,
            contract: value
        })
    }

    const handleSaveQuestItem = () => {
        try {
            // Validate transaction
            let value: any = {}
            if (questType === QuestType.TRANSACTION) {
                if (output.contract && !isAddress(output.contract)) {
                    throw Error("Contract is not valid")
                }

                value = { ...output, type: "transaction" }
                value.abi = JSON.parse(output.abi)
            } else if (questType === QuestType.DEPLOY) {
                if (!output.bytecode.startsWith("0x")) {
                    throw Error("Contract is not valid")
                }

                value = { ...output, type: "deployment" }
            } else {
                throw Error("Unable to obtain type")
            }

            handleUpdateQuestItem(selectedItem[0], selectedItem[1], value)
            toast.success("Saved")
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    return <div>
        <UtilHeader title="Quest Builder (Beta)"
            description="Design and structure a POL resource and configure quests" />

        <div className="grid grid-cols-1 lg:grid-cols-4">
            <div className="col-span-1 lg:col-span-2">
                <div className="flex items-center gap-1">
                    <IconBtn icon={<Plus size={18} />} onClick={handleAddQuest} content="Add new resource" />
                    <IconBtn icon={<Share size={18} />} onClick={() => { }} content="Download template" />
                    <CreateQuestCode layout={questLayout} quests={questItems} />
                </div>

                {/* {JSON.stringify(questLayout)} */}
                {questLayout && Object.entries(questLayout).map(([key, val], index) => (
                    <div key={index}>
                        <QuestContext name={key}
                            onRename={(name) => doRenameQuest(key, name)}
                            onDelete={() => doDeleteQuest(key)}
                            onQuestAdd={() => handleAddSubQuest(key, "00_resource")}
                            onItemSelect={() => setSelectedItem([key, ""])}
                            onCreateQuest={questItems[[key, ""].filter(i => i).join("/")] ? undefined : () => doCreateQuest(key)} />

                        <div className="ml-4">
                            {val.map(item => (
                                <div key={item}>
                                    <QuestContext name={item}
                                        onRename={(name) => doRenameSubQuest(key, item, name)}
                                        onDelete={() => doDeleteSubQuest(key, item)}
                                        onItemSelect={() => setSelectedItem([key, item])}
                                        onCreateQuest={questItems[[key, item].filter(i => i).join("/")] ? undefined : () => doCreateQuest(key, item)} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="col-span-1 lg:col-span-2">
                {selectedItemData && <div>
                    {!!!selectedItem[1]
                        ? <Tag title="Title" value={selectedItemData.main?.title} subValue={selectedItemData.main?.number} />
                        : <Tag title="Title" value={selectedItemData.sub?.title} subValue={selectedItemData.sub?.number} />}
                    <Tag title="Quest Path" value={[selectedItem[0], selectedItem[1]].filter(i => i).join("/")} />
                </div>}

                {/* {JSON.stringify(output)} */}
                {selectedItem.filter(i => i).join("/") in questItems &&
                    <div>
                        <div className="flex items-center justify-center gap-2 my-2">
                            <IconBtn icon={<ScanLine size={18} />} title="Transaction"
                                content="This could be contract interaction, sending token"
                                onClick={() => { setQuestType(QuestType.TRANSACTION); setOutput({}) }} />
                            <IconBtn icon={<ReceiptText size={18} />} title="Deployment"
                                content="This is for smart contract deployment"
                                onClick={() => { setQuestType(QuestType.DEPLOY); setOutput({}); }} />
                        </div>
                        <div>
                            <div className="flex flex-col gap-2">
                                {questType === QuestType.TRANSACTION
                                    ? <>
                                        <SubmissionInput title="ABI" value={output?.abi}
                                            onChange={(e) => updateQuestItemTransactionABI(e.target.value)} />
                                        <SubmissionInput title="Contract" value={output?.contract}
                                            onChange={(e) => updateQuestItemTransactionContract(e.target.value)} />
                                        <SubmissionInput title="Args" value={output?.args}
                                            onChange={(e) => updateQuestItemTransactionArgs(e.target.value)} />
                                    </>
                                    : <>
                                        <SubmissionInput title="Bytcodes Hash" value={output?.bytecode}
                                            onChange={(e) => updateQuestItemDeployment(e.target.value)} />
                                    </>}
                            </div>
                            <div className="flex gap-2 my-2">
                                <IconBtn icon={<Save size={18} />} onClick={handleSaveQuestItem} />
                                <IconBtn icon={<Trash size={18} />} onClick={() => handleRemoveQuestItem(selectedItem[0], selectedItem[1])} />
                            </div>
                        </div>
                    </div>}
            </div>
        </div>

        {questItems && <div>
            <div>Total Quests: {Object.keys(questItems).length}</div>

            {Object.keys(questItems).map((item, index) => (
                <div key={index}>
                    {JSON.stringify(item)}
                </div>
            ))}
        </div>}

        {questItems && <div>
            {JSON.stringify(questItems)}
        </div>}
    </div>
}

interface QuestContextProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string
    onRename: (name: string) => void
    onQuestAdd?: () => void
    onCreateQuest?: () => void
    onItemSelect: () => void
    onDelete: () => void
}

export function QuestContext({ name,
    onRename, onQuestAdd, onItemSelect, onCreateQuest, onDelete }: QuestContextProps) {
    const [text, setText] = useState(name)
    const [isEditing, setIsEditing] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus()
            setText(name)
        }
    }, [isEditing])

    const handleRename = () => {
        onRename(text)
        setIsEditing(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleRename()
        }
    }

    const handleOnClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        onItemSelect()
    }

    return <ContextMenu>
        <ContextMenuTrigger onClick={handleOnClick}>{isEditing ? (
            <input
                ref={inputRef}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={handleRename}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        ) : <div className="hover:cursor-pointer">{name}</div>}</ContextMenuTrigger>
        <ContextMenuContent>
            <ContextMenuItem onClick={() => setIsEditing(true)}>Rename</ContextMenuItem>
            {onQuestAdd &&
                <ContextMenuItem onClick={onQuestAdd}>Add Quest</ContextMenuItem>}
            {onCreateQuest &&
                <ContextMenuItem onClick={onCreateQuest}>Create Quest</ContextMenuItem>}
            <ContextMenuItem onClick={onDelete}>Delete</ContextMenuItem>
        </ContextMenuContent>
    </ContextMenu>
}