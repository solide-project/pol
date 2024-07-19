import { Collection, Document } from 'mongodb'

export interface UserSubmission {
    id: string  // Id of quest
    address: string // Id of user
    txHash: string // Transaction hash of submission
}

export class UserSubmissionCollection {
    collection: Collection<Document>
    constructor(collection: Collection<Document>) {
        this.collection = collection
    }

    async getUserSubmission(id: string, address: string): Promise<UserSubmission | null> {
        const submission = (await this.collection.findOne({ "$and": [{ "id": id }, { "address": address }] }) as unknown) as UserSubmission | null
        if (!submission) return null

        return submission
    }

    async save(data: UserSubmission) {
        return await this.collection.insertOne(data);
    }
}
