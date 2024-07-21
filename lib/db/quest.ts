import { Collection, Document, ObjectId } from 'mongodb'

export interface QuestSchema {
    owner: string
    name: string
    title: string
    image: string
    description: string
    tokenId: number     // Token ID used for minting NFT
    quests: string[]    // List of quest IDs
}

export class QuestCollection {
    collection: Collection<Document>
    constructor(collection: Collection<Document>) {
        this.collection = collection
    }

    async get(id: number): Promise<QuestSchema | null> {
        const item = (await this.collection.findOne({ "tokenId": id }) as unknown) as QuestSchema | null
        if (!item) return null

        return item as QuestSchema
    }

    async getByRepo(owner: string, name: string): Promise<QuestSchema | null> {
        const item = (await this.collection.findOne({ "owner": owner, "name": name }) as unknown) as any
        if (!item) return null

        delete item._id
        return item as QuestSchema
    }

    async find(query: any) {
        return await this.collection.find(query) || []
    }

    async save(data: QuestSchema) {
        return await this.collection.insertOne(data);
    }

    async update(id: ObjectId, data: QuestSchema) {
        return await this.collection.updateOne({ _id: id }, { $set: data });
    }

    async getQuests(page: number = 1, pageSize: number = 25) {
        const skip = (page - 1) * pageSize;

        const results = await this.collection.find({})
            .sort({ _id: 1 }) // Assuming you want to sort by _id; change as necessary
            .skip(skip)
            .limit(pageSize)
            .toArray() as unknown;

        return results as QuestSchema[] | null
    }
}