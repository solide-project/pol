import { QuestViewer } from "@/components/core/quest/quest-viewer";
import { QuestProvider } from "@/components/providers/quest-provider";
import { POLMongoService } from "@/lib/util/mongo";
import { githubTrees, isTree } from "@/lib/git";
import { POLPoapContract } from "@/lib/poap";
import { validateTree } from "@/lib/quest";

interface SearchParams {
    params: { owner: string; name: string }
}
export default async function Page({ params, }: SearchParams) {
    const owner = params.owner
    const name = params.name

    if (!owner || !name) {
        return <div>Invalid Quest</div>
    }

    const tree = await githubTrees(owner, name)
    const isValid = validateTree(tree)

    if (!isValid) {
        return <div>Invalid Quest</div>
    }

    // Attempt to find the quest and its poap
    const service = new POLMongoService()
    await service.connectCourse()
    let course = await service.courses?.getByRepo(owner, name) || undefined

    if (course) {
        const contract = new POLPoapContract({})
        const poapData = await contract.uri(course.tokenId.toString())
    }

    return <QuestProvider>
        <QuestViewer tree={tree} owner={owner} name={name} metadata={course || undefined} />
    </QuestProvider >
}
