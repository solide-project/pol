import Image from "next/image";
import Link from "next/link";

interface MediaCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    description?: string
    image?: string
    link?: string
    linkText?: string
}

export function MediaCard({ title, description, image, link, linkText }: MediaCardProps) {
    const size = 49
    return <div className="flex flex-col rounded-[24px] bg-white p-[40px] text-black">
        {image && <Image src={image} alt="icon" width={size} height={size} />}
        <h2 className="text-3xl font-medium my-8">{title}</h2>
        <div className="text-gray-500 my-4">{description}</div>

        {link && <Link className="hover:text-blue-800 hover:underline" href={link} target="_blank">
            {linkText}
        </Link>}
    </div>
}