import { useEffect, useState } from "react";
import { VerificationSchema } from "@/lib/poap/verification";
import { ipfsGateway } from "@/lib/util/ipfs";
import { getIconByChainId, getRPC, getTransactionExplorer } from "@/lib/chains";
import { epochToFormattedDate, mask } from "@/lib/quest";
import { CopyText } from "@/components/core/shared/copy-text";
import { BookMarked, Calendar, Database, ExternalLink } from "lucide-react";
import { createPublicClient, http } from "viem";
import { PopoverMask } from "@/components/core/shared/mask-popover";
import { Badge } from "@/components/ui/badge";
import { ProfileBadge } from "@/components/core/profile/badge";

interface VerificationContentProps {
    cid: string;
    name: string;
}

export function VerificationContent({ cid, name }: VerificationContentProps) {
    const [verification, setVerification] = useState<
        VerificationSchema | undefined
    >(undefined);
    const [transactionVerifications, setTransactionVerifications] = useState<{
        [key: string]: any;
    }>({});

    useEffect(() => {
        (async () => {
            const response = await fetch(`${ipfsGateway}${cid}`);

            if (!response.ok) return;
            const verification: VerificationSchema = await response.json();
            setVerification(verification);
        })();
    }, []);

    useEffect(() => {
        const fetchAllTransactions = async () => {
            if (!verification?.verification) return;

            const verifications = await Promise.all(
                verification.verification.map(async (proof) => {
                    if (proof.chain && proof.hash) {
                        try {
                            const rpc = getRPC(proof.chain);
                            const client = createPublicClient({
                                transport: http(rpc),
                            });
                            const transaction =
                                await client.getTransactionReceipt({
                                    hash: proof.hash,
                                });
                            return { [proof.id]: transaction };
                        } catch (e: any) {
                            console.log(e);
                        }
                    }

                    return {};
                }),
            );

            // Remove nulls
            const filteredVerifications = verifications.reduce(
                (acc, curr) => ({ ...acc, ...curr }),
                {},
            );
            setTransactionVerifications(filteredVerifications);
        };

        if (verification) fetchAllTransactions();
    }, [verification]);

    return (
        <div>
            <div className="flex flex-wrap items-center gap-2">
                <ProfileBadge icon={<Calendar />}>
                    {/* Completed on:{" "} */}
                    {epochToFormattedDate(verification?.quest?.completed || 0)}
                </ProfileBadge>
                {/* {verification?.quest.version && (
                    <ProfileBadge>{verification?.quest.version}</ProfileBadge>
                )} */}
                <ProfileBadge icon={<Database />}>{mask(cid)}</ProfileBadge>
                <ProfileBadge icon={<BookMarked />}>
                    Course: {name || verification?.quest.name}
                </ProfileBadge>
            </div>

            {verification && (
                <div>
                    {verification.verification.map((proof, index) => {
                        return (
                            <div key={index}>
                                {!proof.chain ? (
                                    <div>Unknown Verification</div>
                                ) : (
                                    <div className="rounded-lg border p-3 my-4 flex items-center justify-between truncate">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={getIconByChainId(
                                                    proof.chain,
                                                )}
                                                alt="chain"
                                                className="h-10 w-10"
                                            />

                                            <div className="max-w-[100%]">
                                                {/* <div className="flex items-center gap-2">
                                                    <div className="text-ellipsis text-sm text-muted-foreground">Quest ID {proof.id}</div>
                                                </div> */}
                                                <PopoverMask text={proof.id} />
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-2 truncate">
                                                    <PopoverMask
                                                        href={getTransactionExplorer(
                                                            proof.chain,
                                                            proof.hash,
                                                        )}
                                                        text={proof.hash}
                                                    />

                                                    <CopyText
                                                        className="h-4 w-4"
                                                        payload={proof.hash}
                                                    />

                                                    <div className="flex items-center gap-1">
                                                        {transactionVerifications[
                                                            proof.id
                                                        ] && (
                                                                <Badge
                                                                    variant="outline"
                                                                    className="capitalize"
                                                                >
                                                                    {transactionVerifications[
                                                                        proof.id
                                                                    ]?.blockNumber.toString()}
                                                                </Badge>
                                                            )}
                                                        <Badge
                                                            variant="outline"
                                                            className="capitalize"
                                                        >
                                                            {proof.type}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <a
                                                href={getTransactionExplorer(
                                                    proof.chain,
                                                    proof.hash,
                                                )}
                                                target="_blank"
                                            >
                                                <ExternalLink className="h-4 w-4 cursor-pointer" />
                                            </a>
                                            <CopyText
                                                className="h-4 w-4"
                                                payload={proof.hash}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
