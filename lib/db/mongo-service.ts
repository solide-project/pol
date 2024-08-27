import { Submission } from "./submission"
import { UserSubmission } from "./user-submission"

export interface SubmissionResponse {
    result: Submission
}

export const fetchSubmission = async (id: string): Promise<SubmissionResponse> => {
    const response = await fetch(`/api/db/submission?id=${id}`)
    if (!response.ok) {
        console.error("Failed to fetch", response.statusText)
        throw new Error("Failed to fetch")
    }

    const data = await response.json()
    return data;
}

export interface UserSubmissionResponse {
    result: UserSubmission & {
        completed: boolean
    }
}

export const fetchUserSubmission = async (id: string, address: `0x${string}`): Promise<UserSubmissionResponse | null> => {
    const response = await fetch(`/api/db/user-submission?id=${id}&address=${address}`)
    if (!response.ok) {
        console.error("Failed to fetch", response.statusText)
        return null
    }

    const data: UserSubmissionResponse = await response.json()
    if (!data.result.completed) {
        return null
    }

    return data;
}