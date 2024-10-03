import { generateErrorResponse } from '@/lib/api/error';
import { POLMongoService } from "@/lib/util/mongo";
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    // Validate body
    const body = await request.json()

    const service = new POLMongoService();
    await service.connect();

    try {
        // create a client connected to devnet
        const client = new SuiClient({ url: getFullnodeUrl('testnet') });

        const txn = await client.getTransactionBlock({
            digest: 'AGzzKMLY7dGGthFMrscUFwK8dcyha7JEdU6NF6MBoADg=',
            options: {
                showEffects: true,
                showInput: false,
                showEvents: false,
                showObjectChanges: false,
                showBalanceChanges: false,
            },
        });
        console.log(txn)
        return NextResponse.json({ result: body, submission: "" })
    } catch (error: any) {
        console.error(error.message)
        return generateErrorResponse(error.message.toString())
    } finally {
        await service.disconnect();
    }
}

