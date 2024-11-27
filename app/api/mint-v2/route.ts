
import { generateErrorResponse } from "@/lib/api";
import { ChainID, getRPC } from "@/lib/chains";
import { Deployment, Transaction } from "@/lib/db/submission";
import { UserSubmission } from "@/lib/db/user-submission";
import { selectedNetwork } from "@/lib/poap/chain";
import { POLMongoService } from "@/lib/util/mongo";
import { uploadJSONToIPFS } from "@/lib/util/pinata";
import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, createWalletClient, http, keccak256, encodePacked, toBytes } from "viem";
import { privateKeyToAccount } from "viem/accounts";

// Requires Github owner and name
export async function POST(request: NextRequest) {
    const body = await request.json()

    if (!body.address) {
        return generateErrorResponse("Failed Validation: address")
    }

    // Verify address,
    // Set RPC for querying the chain
    const address = body.address as `0x${string}`
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

    const owner = body.owner
    const name = body.name

    const service = new POLMongoService();
    await service.connect();
    try {
        // Get the Course from Mongo
        const quest = await service.courses?.getByRepo(owner, name);
        if (!quest) return generateErrorResponse("Error fetching quests")

        // From the quests ids in Course, see if users has them
        const query = {
            id: { $in: quest.quests },
            address: { $regex: new RegExp(`^${address}$`, 'i') } // Case-insensitive regex for userID
        };
        const userSubmissions = await service.userSubmissions?.collection.find(query).toArray();

        if (userSubmissions?.length !== quest.quests.length)
            return generateErrorResponse("User has not completed all quests")

        const usersSubDict = userSubmissions?.reduce((acc, item) => {
            acc[item.id] = item; // Use the `id` field as the key
            return acc;
        }, {} as Record<string, UserSubmission>);

        const query2 = {
            id: { $in: quest.quests },
        };
        const submissions = await service.submissions?.collection.find(query2).toArray();
        if (submissions?.length !== quest.quests.length)
            return generateErrorResponse("Fail to generation via, please open dicussion")

        const subDict = submissions?.reduce((acc, item) => {
            acc[item.id] = item; // Use the `id` field as the key
            return acc;
        }, {} as Record<string, Deployment | Transaction>);


        const verification: any = {
            quest: {
                version: "1.0.0",
                owner,
                name,
                completed: Math.floor(new Date().getTime() / 1000),
            },
            proof: []
        }

        quest.quests.forEach(quest => {
            const userSub = usersSubDict[quest]
            const sub = subDict[quest]
            verification.proof.push({
                id: sub.id,
                chain: sub.chain,
                type: sub.type,
                hash: userSub.txHash
            })
        })

        const verifcationResponse = await uploadJSONToIPFS({
            data: verification, 
            name: "verification"
        });
        console.log(verifcationResponse.IpfsHash)

        if (!verifcationResponse.IpfsHash)
            return generateErrorResponse("Fail to publish verification, please open dicussion")

        // Can mint the POAP
        const encodedMessage = keccak256(encodePacked(['address', 'uint256'], [address, BigInt(quest.tokenId)]));
        const message = toBytes(encodedMessage);

        const minter = privateKeyToAccount(process.env.MINTER_SK || "0x" as any)
        const client = createWalletClient({
            account: minter,
            chain: selectedNetwork,
            transport: http(rpc)
        })
        const signature = await client.signMessage({
            message: { raw: message },
        });

        return NextResponse.json({
            signature,
            verificationHash: verifcationResponse.IpfsHash,
            tokenId: quest.tokenId,
        })
    } catch (error: any) {
        console.error(error.message)
        return NextResponse.json({ message: "Failed to mint for user. If you are sure you completed the all of the quest, then do a PR" }, { status: 400 })
    } finally {
        await service.disconnect();
    }
}