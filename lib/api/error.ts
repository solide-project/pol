import { NextResponse } from "next/server"

export interface ErrorResponse {
    message: string
    status?: number
}

export const generateErrorResponse = (message: string, status: number = 400): NextResponse => {
    return NextResponse.json({ message, status } as ErrorResponse, { status })
}