import { ipfsGateway } from "@/lib/util/ipfs";
import Image from "next/image"

interface IPFSImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    width?: number;
    height?: number;
    src: `ipfs://${string}`;
}

export function IPFSImage({ src, alt = "", ...props }: IPFSImageProps) {
    return <Image src={src.replace("ipfs://", ipfsGateway)} alt={alt} {...props} />
}