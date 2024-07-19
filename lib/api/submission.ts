export interface StoreBody {
    data: string
}

export const validateStoreRequest = async (body: any): Promise<StoreBody | string> => {
    if (!body.data) return "Missing data"

    return {
        data: body.data,
    }
}

export const validateSubmitRequest = async (body: any): Promise<SubmitBody | string> => {
    if (!body.id) return "Missing id"
    if (!body.payload) return "Missing payload"
    if (!body.address) return "Missing address"

    return {
        id: body.id,
        transactionHash: body.payload,
        user: body.address
    }
}

export interface SubmitBody {
    id: `0x${string}`
    transactionHash: `0x${string}`
    user: `0x${string}`
}
