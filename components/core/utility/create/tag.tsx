interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string,
    value: string,
    subValue?: string
}

export function Tag({ title, value, subValue }: TagProps) {
    return <div className="border-border-1 flex items-center justify-between gap-2 rounded border px-2.5 py-2">
        <div className="flex flex-col gap-0.5">
            <h2 className="uppercase text-xs text-type-2">{title}</h2>
            <div className="flex items-center gap-1">
                <div className="text-sm leading-none">
                    <span>{value}</span>
                </div>
            </div>
        </div>
        {subValue && <div className="text-type-2 text-sm leading-none">
            <span>{subValue}</span>
        </div>}
    </div>

    // return <div className="flex px-5 py-1 gap-x-1 text-sm">
    //     <div className="w-48 text-gray-400">Contract address:</div>
    //     <div className="break-all flex-1 leading-5 flex items-center gap-1">
    //         <div>0x11227e54f19934164a81d5add1ce5825d46b2271</div>
    //     </div>
    // </div>
}