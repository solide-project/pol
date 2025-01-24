import { Collection, ObjectId } from 'mongodb'

export interface YuzuUserData {
    address: `0x${string}`
    reason: string
    multiply?: number
    points: number
    timestamp: number
}

type YuzuUserDataNullable = YuzuUserData | null

/**
 * Will be store key, and value of type any
 */
export class YuzuCollection {
    constructor(public collection: Collection<YuzuUserData>) { }

    async get(key: string): Promise<YuzuUserDataNullable> {
        return this.collection.findOne({ key })
    }

    async find(query: any) {
        return await this.collection.find(query) || []
    }

    async getHistory(address: `0x${string}`) {
        return await this.collection.find({ address }) || []
    }

    async insert(data: YuzuUserData) {
        return await this.collection.insertOne(data);
    }

    getStartOfToday(): number {
        const now = new Date();
        now.setUTCHours(0, 0, 0, 0);
        return Math.floor(now.getTime()/1000);
    }

    async canClaimDaily(address: `0x${string}`, tokenId: string): Promise<boolean> {
        const startOfToday = this.getStartOfToday();

        const existingRecord = await this.collection.findOne({
          address,
          reason: tokenId,
          timestamp: { $gte: startOfToday }, // Record must be from the start of today onwards
        });
      
        return !existingRecord;
    }

    async latest(address: `0x${string}`, tokenId: string) {
        const latestData = await this.collection.findOne(
            { address, reason: tokenId },
            {
                sort: { timestamp: -1 },
            }
        );
        return latestData;
    }

    async getTotalAddress(address: `0x${string}`) {
        const result = await this.collection.aggregate([
            {
                $match: { address }, // Match the given address
            },
            {
                $project: {
                    totalPoints: {
                        $cond: {
                            if: { $gt: [{ $ifNull: ['$multiply', 1] }, 1] }, // Check if multiply exists and is greater than 1
                            then: { $multiply: ['$points', '$multiply'] }, // Apply multiply
                            else: '$points', // Otherwise, just use points
                        },
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalPoints: { $sum: '$totalPoints' }, // Sum the total points
                },
            },
        ]).toArray();

        return result.length > 0 ? result[0].totalPoints : 0;
    }

    async getTotal() {
        const result = await this.collection.aggregate([
            {
                $project: {
                    totalPoints: {
                        $cond: {
                            if: { $gt: [{ $ifNull: ['$multiply', 1] }, 1] }, // Check if multiply exists and is greater than 1
                            then: { $multiply: ['$points', '$multiply'] }, // Apply multiply
                            else: '$points', // Otherwise, just use points
                        },
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalPoints: { $sum: '$totalPoints' }, // Sum the total points
                },
            },
        ]).toArray();

        return result.length > 0 ? result[0].totalPoints : 0;
    }

    async update(id: ObjectId, data: YuzuUserData) {
        return await this.collection.updateOne({ _id: id }, { $set: data });
    }
}