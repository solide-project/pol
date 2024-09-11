import { QuestSchema } from "../db/quest"

export interface QuestPagination {
    page: number
    pageSize: number
    total: number
    result: QuestInformation[]
}

export interface QuestInformation {
    result: QuestSchema
    user: {
        image: string
    }
}