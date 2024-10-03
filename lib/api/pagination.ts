import { Course } from "../db/course"

export interface QuestPagination {
    page: number
    pageSize: number
    total: number
    result: QuestInformation[]
}

export interface QuestInformation {
    result: Course
    user: {
        image: string
    }
}