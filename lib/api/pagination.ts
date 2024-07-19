import { QuestSchema } from "../db/quest"

export interface QuestPagination {
    page: number
    pageSize: number
    total: number
    result: QuestSchema[]
}