import { MongoClient } from 'mongodb'

interface Read {
    address: `0x${string}`
    repo: string
    read: boolean
}

export const getRepoRead = async (address: string, repo: string): Promise<Read> => {
    const client = new MongoClient(process.env.MONGO_URI || "");

    return {
        address: `0x${address}`,
        repo,
        read: true,
    }
}


export const hasRead = async (address: string, repo: string): Promise<Read> => {
    const client = new MongoClient(process.env.MONGO_URI || "");

    return {
        address: `0x${address}`,
        repo,
        read: true,
    }
}

export const markRead = async (address: string, repo: string): Promise<Read> => {
    return {
        address: `0x${address}`,
        repo,
        read: true,
    }
}
