import { Homepage } from "@/components/core/home/homepage";

interface SearchParams {
  params: { slug: string }
  searchParams?: { [key: string]: string | undefined }
}
export default async function Home({ searchParams }: SearchParams) {

  // Here we are letting the client query the quests
  return <Homepage />
}
