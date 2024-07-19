import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Poap } from "@/lib/poap"
import { ipfsGateway } from "@/lib/poap/ipfs"
import Image from "next/image"

interface BadgeCardProps extends React.HTMLAttributes<HTMLDivElement> {
    poap: Poap
}

export function BadgeCard({ poap }: BadgeCardProps) {
    return <Dialog>
        <DialogTrigger asChild>
            <div>
                <div className="flex items-center justify-center">
                    <Image src={`${poap.metadata.image.replace("ipfs://", ipfsGateway)}`} alt="badge" width={270} height={270}
                        className="transform transition duration-500 hover:scale-110" />
                </div>
                <Button variant="outline">Edit Profile {JSON.stringify(poap.metadata.name)}</Button>
            </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Edit your profile information
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                Profile Badge Earn on X
            </div>
            <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}
