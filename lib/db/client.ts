import { MongoClient } from 'mongodb'
import { SubmissionCollection } from './submission';
import { UserSubmissionCollection } from './user-submission';
import { QuestCollection } from './quest';

export const uri = process.env.MONGO_URI || "";
export const dbName = process.env.DB_NAME || "";
export const submissionCollectionName = process.env.SUBMISSION_COLLECTION_NAME || "";
export const userSubmissionCollectionName = process.env.USER_SUBMISSION_COLLECTION_NAME || "";
export const questCollectionName = process.env.QUEST_COLLECTION_NAME || "";

export class MongoService {
    private client: MongoClient;
    public submissions?: SubmissionCollection
    public userSubmissions?: UserSubmissionCollection
    public quests?: QuestCollection

    constructor() {
        this.client = new MongoClient(uri);
    }

    async connect() {
        await this.client.connect();
        this.submissions = new SubmissionCollection(await this.getSubmissionCollection());
        this.userSubmissions = new UserSubmissionCollection(await this.getUserSubmissionCollection());
        this.quests = new QuestCollection(await this.getQuestCollection());
    }

    async close() {
        await this.client.close();
    }

    async disconnect() {
        await this.client.close();
    }

    async ping() {
        try {
            await this.client.db(dbName).command({ ping: 1 });
            return true;
        } catch (e: any) {
            return false;
        } finally {
            await this.client.close();
        }

    }

    private async getDb(dbName: string) {
        return this.client.db(dbName);
    }

    private async getCollection(dbName: string, collectionName: string) {
        return this.client.db(dbName).collection(collectionName);
    }

    async getSubmissionCollection() {
        const collection = this.client.db(dbName).collection(submissionCollectionName);
        // Makes sure the id field is unique
        await collection.createIndex({ id: 1 }, { unique: true });
        return collection
    }

    async getUserSubmissionCollection() {
        const collection = this.client.db(dbName).collection(userSubmissionCollectionName);
        return collection
    }

    async getQuestCollection() {
        const collection = this.client.db(dbName).collection(questCollectionName);
        collection.createIndex({ tokenId: 1 }, { unique: true })
        return collection
    }
}