import { POLMongo, POLMongoConfig } from "../db/client";

export const defaultConfig: POLMongoConfig = {
    connectionString: process.env.MONGO_URI || "",
    database: process.env.DB_NAME || "",
    collections: {
        submission: process.env.SUBMISSION_COLLECTION_NAME || "",
        userSubmission: process.env.USER_SUBMISSION_COLLECTION_NAME || "",
        course: process.env.QUEST_COLLECTION_NAME || "",
        user: process.env.QUEST_USER_NAME || "",
        analytics: process.env.ANALYTICS_COLLECTION_NAME || "",
        yuzu: process.env.YUZU_COLLECTION_NAME || "",
    }
}

export class POLMongoService extends POLMongo {
    constructor() {
        super(defaultConfig)
    }
}