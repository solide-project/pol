
import { POLMongoService } from "@/lib/util/mongo";
import { NextRequest, NextResponse } from "next/server";
import { getAddress } from "viem";
import { YuzuUserData } from "@/lib/db/yuzu";
import { YUZU_POINTS } from "@/lib/util/constants";
import { POLPoapContract } from "@/lib/poap/contract";

// Requires Github owner and name
export async function POST(request: NextRequest) {
    const body = await request.json();

    const tokenId: number = parseInt(body.token)

    const address: `0x${string}` = getAddress(body.address)
    if (!address) return NextResponse.json({ message: "Invalid Address" }, { status: 400 })

    const service = new POLMongoService();
    await service.connectYuzu();
    try {
        const point = YUZU_POINTS[tokenId]
        if (!point) throw new Error("Invalid Token")

        const poapContract = new POLPoapContract({})
        const verification = poapContract.getVerification(address, tokenId)
        if (!verification) throw new Error("Haven't completed the course. Get learning :)")

        const hasClaimed = await service.yuzu?.hasClaimed(address, tokenId.toString())
        if (hasClaimed) throw new Error("Already Claimed")

        const data: YuzuUserData = {
            address: address,
            reason: tokenId.toString(),
            points: point.points,
            timestamp: Math.floor(new Date().getTime() / 1000)
        }
        if (point.multiply) data.multiply = point.multiply

        await service.yuzu?.insert(data)
        return NextResponse.json({
            result: true
        })
    } catch (error: any) {
        console.error(error.message)
        return NextResponse.json({ message: error.message }, { status: 400 })
    } finally {
        await service.disconnect();
    }
}
