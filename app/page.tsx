import { Home } from "@/components/core/home";
import { Footer } from "@/components/core/shared/footer";

/**
 * Here we are letting the client query the quests
 * In future, when more course, may need to call db for courses 
 */
export default async function Page() {
  return <>
    <Home />
    <Footer />
  </>
}
