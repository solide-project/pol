import { validateStoreRequest, generateErrorResponse } from "@/lib/api";
import { convertImportToMongo } from "@/lib/quest/converter";
import { POLMongoService } from "@/lib/util/mongo";
import { validate } from "@/lib/quest/validate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    // Validate body
    const body = await validateStoreRequest(await request.json())
    if (typeof body === "string") return generateErrorResponse(body)


    const service = new POLMongoService();
    await service.connect();

    try {
        const submissionItems = convertImportToMongo(validate(body.data))

        const questIds = submissionItems.map((item) => item.id);
        const query = { id: { $in: questIds } };
        const eixstings = await service.submissions?.collection.find(query).toArray();
        if (!eixstings) return generateErrorResponse("Error fetching existing submissions")

        // Update existing submissions
        if (eixstings.length > 0) {
            const updatePromises = eixstings.map(async (existing) => {
                console.log("Updating", existing.id)
                const updatedIndex = submissionItems.findIndex(submission => submission.id === existing.id);
                if (updatedIndex === -1) {
                    throw new Error("Missing updated data for existing submission");
                }
                const updated = submissionItems.splice(updatedIndex, 1).pop();
                if (!updated) {
                    throw new Error("Missing updated data for existing submission");
                }
                const result = await service.submissions?.collection.updateOne({ _id: existing._id }, { $set: updated });
            });

            await Promise.all(updatePromises);
        }

        // Insert new submissions
        console.log("Inserting", submissionItems.length)
        if (submissionItems.length > 0) {
            const result = await service.submissions?.collection.insertMany(submissionItems);
            console.log("Result", result?.insertedIds)
        }

        return NextResponse.json({ result: true })
    } catch (error: any) {
        console.error(error.message)
        return generateErrorResponse(error.message.toString())
    } finally {
        await service.disconnect();
    }
}