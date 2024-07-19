
import { githubTrees } from "@/lib/git";
import { folderItems, generateQuestId, generateQuestIdByQuestStructureItem, generateQuestPath, stripBase, validateTree } from "@/lib/quest";
import { NextRequest, NextResponse } from "next/server";

// Requires Github owner and name
export async function POST(request: NextRequest) {
    const body = await request.json()

    if (!body.owner) {
        return NextResponse.json({ result: false, message: "Missing param: owner" })
    }

    if (!body.name) {
        return NextResponse.json({ result: false, message: "Missing param: name" })
    }

    const tree = await githubTrees(body.owner, body.name)
    const isValid = validateTree(tree)

    if (!isValid) {
        return NextResponse.json({ result: false, message: "Invalid Quest" })
    }

    const owner = body.owner
    const name = body.name

    const trees = stripBase(tree.tree, "content/")
    const base = folderItems(trees)

    const questIds: string[] = []
    base.forEach(item => {
        const questId = generateQuestIdByQuestStructureItem({
            name: {
                ...item,
                path: generateQuestPath(item, owner, name)
            },
        })
        questIds.push(questId)

        const subTrees = stripBase(trees, `${item.name}/`)
        const subItems = folderItems(subTrees)
        subItems.forEach(subItem => {
            const subQuestId = generateQuestIdByQuestStructureItem({
                name: {
                    ...subItem,
                    path: generateQuestPath(subItem, owner, name, item)

                }
            })
            questIds.push(subQuestId)
        })
    })

    // Note this will return all the quest ids for repo, even if most quest don't have submission

    return NextResponse.json({ result: true, message: "", quests: questIds })

}