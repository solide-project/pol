
import { generateErrorResponse } from "@/lib/api";
import { Deployment, Transaction } from "@/lib/db/submission";
import { UserSubmission } from "@/lib/db/user-submission";
import { getRPC, selectedNetwork } from "@/lib/poap";
import { POLMongoService } from "@/lib/util/mongo";
import { upload } from "@/lib/util/ipfs";
import { NextRequest, NextResponse } from "next/server";
import { createWalletClient, http, keccak256, encodePacked, toBytes } from "viem";
import { privateKeyToAccount } from "viem/accounts";

// Requires Github owner and name
export async function POST(request: NextRequest) {
    const body = await request.json();

    const requiredFields = ["address", "owner", "name"] as const;
    for (const field of requiredFields) {
        if (!body[field]) {
            return generateErrorResponse(`Missing or invalid parameter: ${field}`);
        }
    }

    let { address, owner, name } = body as {
        address: `0x${string}`;
        owner: string;
        name: string;
    };

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

        const verifcationResponse = await upload({
            data: verification,
            name: "verification"
        });
        console.log(verifcationResponse.IpfsHash)

        if (!verifcationResponse.IpfsHash)
            return generateErrorResponse("Fail to publish verification, please open dicussion")

        // Create signature for address to sign for successful mint
        const { signature } = await signMintingMessage(address, quest.tokenId);

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

const signMintingMessage = async (address: `0x${string}`, tokenId: number) => {
    const encodedMessage = keccak256(encodePacked(['address', 'uint256'], [address, BigInt(tokenId)]));
    const message = toBytes(encodedMessage);

    const minter = privateKeyToAccount(process.env.MINTER_SK || "0x" as any)
    const client = createWalletClient({
        account: minter,
        chain: selectedNetwork,
        transport: http(getRPC(selectedNetwork.id.toString()))
    })
    const signature = await client.signMessage({
        message: { raw: message },
    });

    return { signature }
}