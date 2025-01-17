import { Collection, ObjectId } from 'mongodb'

export const ANALYTICS_KEY_TOTAL = "TOTAL_TRANSACTIONS"

export interface AnalyticData {
    key: string
    value: any
}

type AnalyticDataNullable = AnalyticData | null

/**
 * Will be store key, and value of type any
 */
export class AnalyticsCollection {
    constructor(public collection: Collection<AnalyticData>) { }

    async get(key: string): Promise<AnalyticDataNullable> {
        return this.collection.findOne({ key })
    }

    async find(query: any) {
        return await this.collection.find(query) || []
    }

    async insert(data: AnalyticData) {
        return await this.collection.insertOne(data);
    }

    async update(id: ObjectId, data: AnalyticData) {
        return await this.collection.updateOne({ _id: id }, { $set: data });
    }
}