
import { generateErrorResponse } from "@/lib/api";
import { ChainID, getRPC } from "@/lib/chains";
import { MongoService } from "@/lib/db/client";
import { githubTrees } from "@/lib/git";
import { POLPoapContract } from "@/lib/poap";
import { openCampusCodex } from "@/lib/poap/chain";
import { folderItems, generateQuestId, generateQuestIdByQuestStructureItem, generateQuestPath, stripBase, validateTree } from "@/lib/quest";
import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";

// Requires Github owner and name
export async function POST(request: NextRequest) {
    const body = await request.json()

    if (!body.signature) {
        return generateErrorResponse("Failed Validation: signature")
    }

    if (!body.address) {
        return generateErrorResponse("Failed Validation: address")
    }

    // Verify address,
    // Set RPC for querying the chain
    const signature = body.signature
    const address = body.address
    const rpc = getRPC(ChainID.OPEN_CAMPUS_CODEX)
    const publicClient = createPublicClient({
        transport: http(rpc),
    })
    // console.log("Address", address)
    // console.log("Signature", signature)
    // const valid = await client.verifyMessage({
    //     address,
    //     message: "0x9B6089b63BEb5812c388Df6cb3419490b4DF4d54",
    //     signature,
    // })

    // if (!valid) {
    //     return generateErrorResponse("Failed Validation")
    // }

    if (!body.owner) {
        return generateErrorResponse("Missing param: owner")
    }

    if (!body.name) {
        return generateErrorResponse("Missing param: name")
    }

    const tree = await githubTrees(body.owner, body.name)
    const isValid = validateTree(tree)

    if (!isValid) {
        return generateErrorResponse("Invalid Quest")
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


    const service = new MongoService();
    await service.connect();

    try {
        const quest = await service.quests?.getByRepo(owner, name);
        if (!quest) return generateErrorResponse("Error fetching quests")

        // console.log("Quest", quest.quests)
        // console.log("QuestIds", questIds)

        const query = {
            id: { $in: quest.quests },
            address: { $regex: new RegExp(`^${address}$`, 'i') } // Case-insensitive regex for userID
        };
        const userSubmissions = await service.userSubmissions?.collection.find(query).toArray();

        if (userSubmissions?.length !== quest.quests.length)
            return generateErrorResponse("User has not completed all quests")

        // Can mint the POAP
        const minter = privateKeyToAccount(process.env.MINTER_SK || "0x" as any)
        const client = createWalletClient({
            account: minter,
            chain: openCampusCodex,
            transport: http(rpc)
        })
        const poapContract = new POLPoapContract({ client })


        const { result } = await publicClient.simulateContract({
            address: poapContract.contract.address,
            abi: poapContract.contract.abi,
            functionName: 'mint',
            args: [address, quest.tokenId.toString(), "0x"],
            account: minter,
        })

        const hash = await poapContract.mint(address, quest.tokenId.toString())
        console.log("transactionHash", hash)

        return NextResponse.json({
            result: hash,
        })
    } catch (error: any) {
        console.error(error.message)
        return NextResponse.json({ message: "Failed to mint for user. If you are sure you completed the all of the quest, then do a PR" }, { status: 400 })
    } finally {
        await service.close();
    }
}