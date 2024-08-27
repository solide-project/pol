import { Collection, Document } from 'mongodb'
import { AbiFunction } from 'viem'

export interface Submission {
    path?: string   // Path is not important, but is used adding to db
    id: string
    chain: string
    type: "deployment" | "transaction"
    description?: string
}

export interface Deployment extends Submission {
    type: "deployment"
    bytecode: string // Note this is a sha256 of the bytecode
}

export interface Transaction extends Submission {
    type: "transaction"
    abi: AbiFunction[]
    contract?: string
    args: any[]
}

export class SubmissionCollection {
    collection: Collection<Document>
    constructor(collection: Collection<Document>) {
        this.collection = collection
    }

    async getSubmission(id: string): Promise<Deployment | Transaction | null> {
        const item = (await this.collection.findOne({ "id": id }) as unknown) as Deployment | Transaction | null
        if (!item) return null

        if (item.type === "deployment") return item as Deployment
        return item as Transaction
        // return deploymentContract     // For local development
    }

    async find(query: any) {
        return await this.collection.find(query) || []
    }

    async save(id: string): Promise<Deployment | Transaction | null> {
        const item = (await this.collection.findOne({ "id": id }) as unknown) as Deployment | Transaction | null
        if (!item) return null

        if (item.type === "deployment") return item as Deployment
        return item as Transaction
        // return deploymentContract     // For local development
    }
}