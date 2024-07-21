import { Homepage } from "@/components/core/home/homepage";
import { Footer } from "@/components/core/shared/footer";

export default async function Home() {
  // Here we are letting the client query the quests
  return <>
    <Homepage />
    <Footer />
  </>
}
