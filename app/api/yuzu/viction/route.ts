
import { YuzuUserData } from "@/lib/db/yuzu";
import { POLPoapContract } from "@/lib/poap";
import { POLMongoService } from "@/lib/util/mongo";
import { NextRequest, NextResponse } from "next/server";
import { getAddress } from "viem";

const reason = "viction limited"
export async function POST(request: NextRequest) {
    const body = await request.json()
    const address = getAddress(body.address)

    const service = new POLMongoService();
    await service.connectYuzu();
    try {
        // If the spots are filled, only 88 can claim
        const limited = await service.yuzu?.collection.countDocuments({ reason }) || 0
        if (limited >= 88) throw new Error("Sorry limited spots filled")

        // If user has claimed
        const canClaim = (await service.yuzu?.collection.countDocuments({ address, reason }) || 0) > 0
        if (canClaim) throw new Error("Already Claimed")

        const poapContract = new POLPoapContract({})
        const poaps = await poapContract.getOwnedTokenIds(address)

        const hasAll = [BigInt(3)].every(x => poaps.includes(x));
        if (!hasAll) throw new Error("User hasn't finished all courses")

        const data: YuzuUserData = {
            address: address,
            reason,
            points: 500,
            timestamp: Math.floor(new Date().getTime() / 1000)
        }

        await service.yuzu?.insert(data)

        return NextResponse.json({
            result: {
                result: data.points || 0
            }
        })
    } catch (error: any) {
        console.error(error.message)
        return NextResponse.json({ message: error.message }, { status: 400 })
    } finally {
        await service.disconnect();
    }
}
