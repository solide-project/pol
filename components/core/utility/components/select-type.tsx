import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export enum ChainType {
    EVM,
    MOVE,
}

export interface ChainTypeProps {
    type: ChainType
}

interface SelectTypeProps extends React.HTMLAttributes<HTMLDivElement> {
    onValueChange: (value: ChainType) => void
}

export function SelectType({ onValueChange }: SelectTypeProps) {
    const onChange = (e: string) => {
        let type = ChainType.EVM;
        if (e === ChainType[ChainType.MOVE]) {
            type = ChainType.MOVE
        }

        onValueChange(type)
    }

    return <Select onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="EVM" />
        </SelectTrigger>
        <SelectContent>
            {Object.keys(ChainType)
                .filter((v) => isNaN(Number(v)))
                .map((item, index) => (
                    <SelectItem key={item} value={item as string} className="capitalize">{item}</SelectItem>
                ))}
        </SelectContent>
    </Select>
}