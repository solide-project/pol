
import { generateErrorResponse } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";
import { isAddress, verifyMessage } from "viem";
import { isValidSuiAddress } from "@mysten/sui/utils";
import { verifyPersonalMessageSignature } from '@mysten/sui/verify';
import { ACCOUNT_LINK_MESSAGE } from "@/lib/quest/utils";
import { POLMongoService } from "@/lib/util/mongo";

export async function POST(request: NextRequest) {
    const body = await request.json()
    if (!isAddress(body.evm || ""))
        return generateErrorResponse("Invalid Address")

    if (!body.evmSign)
        return generateErrorResponse("Invalid EVM Signature")

    if (!isValidSuiAddress(body.sui || ""))
        return generateErrorResponse("Invalid Sui Address")

    if (!body.suiSign)
        return generateErrorResponse("Invalid Sui Signature")

    const valid = await verifyMessage({
        address: body.evm,
        message: ACCOUNT_LINK_MESSAGE,
        signature: body.evmSign,
    })

    if (!valid)
        return generateErrorResponse("Invalid EVM Verify")

    const message = new TextEncoder().encode(ACCOUNT_LINK_MESSAGE);
    const publicKey = await verifyPersonalMessageSignature(message, body.suiSign);

    if (publicKey.toSuiAddress() !== body.sui)
        return generateErrorResponse("Invalid Sui Verify")

    // If all Valid need to check in Mongo, DB if these address exist.
    const service = new POLMongoService();
    await service.connectUser();

    // If one of them exist then return error, as they have been linked
    const user = await service.users?.doesUserExist({
        evmAddress: body.evm,
        suiAddress: body.sui
    })
    console.log(user)
    if (user) {
        return generateErrorResponse("An Account exist")

    }

    // If not store to MongoDB
    service.users?.insert({
        evmAddress: body.evm,
        suiAddress: body.sui
    })

    return NextResponse.json({
        result: "Account Linked",
    } as any)
}