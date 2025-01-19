import { MongoClient, } from 'mongodb'
import { Course, CourseCollection } from './course';
import { SubmissionType, SubmissionCollection } from './submission';
import { UserSubmission, UserSubmissionCollection } from './user-submission';
import { User, UserCollection } from './user';
import { AnalyticData, AnalyticsCollection } from './analytic';
import { YuzuCollection, YuzuUserData } from './yuzu';

export interface POLMongoConfig {
    connectionString: string
    database: string
    collections: {
        submission: string
        userSubmission: string
        course: string
        user: string
        analytics: string
        yuzu: string
    }
}

export class POLMongo {
    private client: MongoClient
    private config: POLMongoConfig

    public courses?: CourseCollection
    public submissions?: SubmissionCollection
    public userSubmissions?: UserSubmissionCollection
    public users?: UserCollection
    public analytics?: AnalyticsCollection
    public yuzu?: YuzuCollection

    constructor(config: POLMongoConfig = {} as POLMongoConfig) {
        this.config = config;
        this.client = new MongoClient(config.connectionString);
    }

    db(dbName: string = this.config.database) { return this.client.db(dbName) }

    async connect() {
        await this.client.connect();
        await this.connectSubmission();
        await this.connectUserSubmission();
        await this.connectCourse();
        await this.connectAnalytics();
        await this.connectYuzu();
        // await this.connectUser();
    }

    async disconnect() {
        await this.client.close();
    }

    async ping() {
        try {
            await this.client.db(this.config.database).command({ ping: 1 });
            return true;
        } catch (e: any) {
            return false;
        } finally {
            await this.client.close();
        }
    }

    async connectSubmission() {
        const collection = this.db()
            .collection<SubmissionType>(this.config.collections.submission);
        await collection.createIndex({ id: 1 }, { unique: true });

        this.submissions = new SubmissionCollection(collection)
    }

    async connectUserSubmission() {
        const collection = this.db()
            .collection<UserSubmission>(this.config.collections.userSubmission);

        this.userSubmissions = new UserSubmissionCollection(collection)
    }

    async connectCourse() {
        const collection = this.db()
            .collection<Course>(this.config.collections.course);
        await collection.createIndex({ owner: 1, name: 1 }, { unique: true });

        this.courses = new CourseCollection(collection)
    }

    async connectUser() {
        const collection = this.db()
            .collection<User>(this.config.collections.user);
        await collection.createIndex({ evmAddress: 1 }, { unique: true });
        await collection.createIndex({ suiAddress: 1 }, { unique: true });

        this.users = new UserCollection(collection)
    }

    async connectAnalytics() {
        const collection = this.db()
            .collection<AnalyticData>(this.config.collections.user);
        await collection.createIndex({ key: 1 }, { unique: true });

        this.analytics = new AnalyticsCollection(collection)
    }

    async connectYuzu() {
        const collection = this.db()
            .collection<YuzuUserData>(this.config.collections.yuzu);

        this.yuzu = new YuzuCollection(collection)
    }
}