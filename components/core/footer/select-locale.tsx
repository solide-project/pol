import { useLocale } from "@/components/providers/locale-provider"
import { useQuest } from "@/components/providers/quest-provider"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"

const localeToCountryCode = (code: string) => {
    if (code.toLocaleLowerCase() === "hi") {
        return "in"
    }

    return code.toLocaleLowerCase()
}

interface SelectLocaleProps extends React.HTMLAttributes<HTMLDivElement> {
    callback?: Function
}

export function SelectLocale({ callback }: SelectLocaleProps) {
    const { questlocales, selectedLocale, setSelectedLocale } = useLocale()
    const { questOwner, questName } = useQuest()

    const router = useRouter()
    const handleLocaleChange = (value: string) => {
        console.log(value)
        setSelectedLocale(value.toLowerCase())
        router.push(`/q/${questOwner}/${questName}?l=${value}`)
        callback && callback()
    }

    return <Select onValueChange={handleLocaleChange}>
        <SelectTrigger className="w-full">
            <div className="flex items-center space-x-8">
                <div className="flex -space-x-4 rtl:space-x-reverse">
                    {questlocales.slice(0, 10)
                        .map((locale, index) => {
                            return <div key={index} className="">
                                <div>
                                    <LocaleFlag locale={locale} />
                                </div>
                            </div>
                        })}
                </div>

                <div>
                    Available in {questlocales.length || 0} languages
                </div>
            </div>
        </SelectTrigger>
        <SelectContent className="h-max-[256px] overflow-auto">
            {questlocales.slice(0, 10)
                .map((locale, index) => {
                    return <SelectItem key={index} value={locale.toLocaleLowerCase()} className="p-0 px-4 py-1 rounded-sm cursor-pointer">
                        <div className="flex flex-row items-center gap-2 cursor-pointer">
                            <div>
                                <LocaleFlag locale={locale} />
                            </div>
                            <div>{locale}</div>
                        </div>
                    </SelectItem>
                })}
        </SelectContent>
    </Select>
}

interface LocaleFlagProps {
    locale: string
}

function LocaleFlag({ locale }: LocaleFlagProps) {
    return <img src={`https://flagicons.lipis.dev/flags/4x3/${localeToCountryCode(locale)}.svg`}
        className="h-6 rounded" alt={locale} />
}