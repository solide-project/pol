import { OCConnect } from "@opencampus/ocid-connect-js"
import { WalletProvider } from "./wallet-provider"

interface ProviderProps extends React.HTMLAttributes<HTMLDivElement> {
    ocredirectUri: string
}

export function Provider({ ocredirectUri, children }: ProviderProps) {
    return <OCConnect opts={{ redirectUri: ocredirectUri || "" }} sandboxMode={true}>
        <WalletProvider>
            {children}
        </WalletProvider>
    </OCConnect>
}