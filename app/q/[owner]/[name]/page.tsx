import { QuestViewer } from "@/components/core/quest/quest-viewer";
import { QuestProvider } from "@/components/providers/quest-provider";
import { POLMongoService } from "@/lib/util/mongo";
import { githubTrees, isTree } from "@/lib/git";
import { POLPoapContract } from "@/lib/poap";
import { validateTree } from "@/lib/quest";
import { branches } from "@/lib/git/branches";
import { LocaleProvider } from "@/components/providers/locale-provider";

const findLocales = (items: string[]) => {
    const r = /^locales\/([a-zA-Z]{2})$/i;
    return items
        .map((x) => {
            const match = x.match(r);
            return match ? match[1].toUpperCase() : null;
        })
        .filter((x) => x !== null);
}

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

    const ghBranches = await branches(owner, name)
    const locales = findLocales(ghBranches.map(b => b.name))
    console.log(course)
    
    return <QuestProvider>
        <LocaleProvider>
            <QuestViewer tree={tree} owner={owner} name={name} metadata={course || undefined} locales={locales} />
        </LocaleProvider>
    </QuestProvider >
}
