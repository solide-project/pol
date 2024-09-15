import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createPublicClient, http, isAddress, sha256 } from "viem";
import { Header } from "./components/header";
import { ChainType, ChainTypeProps } from "./components/select-type";
import { SelectNetwork } from "./components/select-chain";
import { ChainID, getIconByChainId, getNetworkNameFromChainID, getRPC } from "@/lib/chains";
import { ChainID as MoveChainID } from "@/lib/chains/move/chain-id";
import { getNetworkNameFromChainID as getMoveNetworkNameFromChainID } from "@/lib/chains/move/name";
import { getIconByChainId as getMoveIconByChainId } from "@/lib/chains/move/icon";
import { getCode } from "@/lib/move/sui";
import { Button } from "@/components/ui/button";

interface DeploymentIDProps extends React.HTMLAttributes<HTMLDivElement>, ChainTypeProps {
}

export function DeploymentID({ type }: DeploymentIDProps) {
    const [selectedChain, setSelectedChain] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)

    const [value, setValue] = useState<string>("0x33ae13314a500e18b1376ec1a5a54885c368a4dbde08168290d2406c97d49eb3")
    const [output, setOutput] = useState<string>("")

    const handleContractHash = async () => {
        try {
            setIsLoading(true)
            const hash = await doContractHash();
            setOutput(hash)
        } catch (error: any) {
            console.error(error)
            setOutput(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const doContractHash = async () => {
        let bytecode: `0x${string}` = "0x"
        if (type === ChainType.EVM) {
            if (!isAddress(value))
                throw Error(`Contract does not exist with ID ${value}`)

            const rpc = getRPC(selectedChain)
            const client = createPublicClient({
                transport: http(rpc),
            })

            bytecode = await client.getCode(
                { address: value as `0x${string}` }) as `0x${string}`
        } else if (type === ChainType.MOVE) {
            bytecode = await getCode(selectedChain, value);
        }

        return sha256(bytecode)
    }

    return <div>
        <Header title="Bytecode Hash"
            description="Generate the Bytecode Hash for Deployment Quest" />

        <div className="flex items-center gap-4 my-2">
            <Input value={value} placeholder="0x"
                onChange={(e) => setValue(e.target.value)} />
            <SelectNetwork
                chainId={type === ChainType.EVM ? ChainID : MoveChainID}
                defaultValue={type === ChainType.EVM ? ChainID.ETHEREUM_MAINNET : MoveChainID.SUI_TESTNET}
                onValueSelect={setSelectedChain}
                getNetworkNameFromChainID={type === ChainType.EVM ? getNetworkNameFromChainID : getMoveNetworkNameFromChainID}
                getIconByChainId={type === ChainType.EVM ? getIconByChainId : getMoveIconByChainId}
            />
        </div>

        <div className="flex flex-col">
            <Button onClick={handleContractHash} disabled={isLoading}>{isLoading ? "Generating..." : "Generate"}</Button>
            {output && <div className="my-2">{output}</div>}
        </div>
    </div>
}