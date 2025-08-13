"use client"

interface EarnProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Earn({ }: EarnProps) {
  return <div className="my-10 text-center flex flex-col items-center justify-center">
    <div className="w-[40%]">
      <h2 className="scroll-m-20 text-4xl my-2 font-bold tracking-tight text-center">
        How to Earn Yuzu
      </h2>
      <div className="text-xl text-center h-full my-4 lg:my-0">
        Earn Yuzu by engaging with our platform. Complete quests, participate in challenges,
        and contribute to the community. The more you interact, learn, and share, the more Yuzu
        you collect, unlocking exclusive rewards and experiences.
      </div>
    </div>
  </div>
}