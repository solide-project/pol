import { Footer } from "@/components/core/shared/footer";
import { YuzuPage } from "@/components/core/yuzu";
import { POLMongoService } from "@/lib/util/mongo";

export default async function Page() {
    const service = new POLMongoService();
    await service.connectYuzu();

    const total = await service.yuzu?.getTotal()

    return <>
        <YuzuPage total={total} />
        <Footer />
    </>
}