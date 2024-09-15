import { Deployment, Transaction } from "../db/submission";
import { SuiClient } from "@mysten/sui/client";
import { getCode, getPackageByDigest } from "../move/sui";
import { sha256 } from "viem";
import { defaultOpts, SubmissionBody, SubmissionOpt, SubmissionReceipt } from "./api";

export const processDeploymentSubmission = async (
    client: SuiClient,
    payload: SubmissionBody,
    submission: Deployment,
    opts: SubmissionOpt = defaultOpts
): Promise<SubmissionReceipt> => {
    const transaction = await client.getTransactionBlock({
        digest: payload.transactionHash,
        options: {
            showEffects: true,
            showInput: false,
            showEvents: false,
            showObjectChanges: false,
            showBalanceChanges: false,
        },
    });

    console.log(transaction)

    const data = await getPackageByDigest(client, transaction.digest);
    if (!data?.packageId)
        throw new Error(`Invalid digest`)

    const chainHex = await client.getChainIdentifier()
    const chainId = parseInt(chainHex, 16).toString()
    const bytecode = await getCode(chainId, data?.packageId)

    const bytehash = sha256(bytecode as `0x${string}`)
    if (bytehash !== submission.bytecode)
        throw new Error("Invalid Transaction Hash")

    // Typically if decodeFunctionData is successful, we can assume the transaction is correct
    return { result: true };
}

export const processDeployTransaction = async (
    client: SuiClient,
    payload: SubmissionBody,
    submission: Transaction,
    opts: SubmissionOpt = defaultOpts
): Promise<SubmissionReceipt> => {
    const transaction = await client.getTransactionBlock({
        digest: payload.transactionHash,
        options: {
            showEffects: true,
            showInput: false,
            showEvents: false,
            showObjectChanges: false,
            showBalanceChanges: false,
        },
    });

    //TODO

    // Typically if decodeFunctionData is successful, we can assume the transaction is correct
    return { result: true };
}

function arraysEqual(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
            if (!arraysEqual(arr1[i], arr2[i])) return false;
        } else if (typeof arr2[i] === "bigint") {
            if (arr1[i] !== arr2[i].toString()) return false;
        } else if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}