"use client";

import { useEffect, useState } from "react";
import { LoginCallBack } from "@opencampus/ocid-connect-js";
import { useRouter } from "next/navigation";
import { useWallet } from "./wallet-provider";
import { WalletConnectorEnum } from "./hooks/wallet-connector";

interface RedirctCallBackProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RedirctCallBack({ children }: RedirctCallBackProps) {
    const [error, setError] = useState("");
    const router = useRouter();
    const wallet = useWallet();

    useEffect(() => {
        if (wallet.walletProvider === WalletConnectorEnum.OCID) {
            router.push("/");
            return;
        }

        setError("Oops. Fail to authenticate");
    }, [wallet.walletProvider]);

    const loginSuccess = () => {};

    return (
        <LoginCallBack
            customErrorComponent={<CustomErrorComponent />}
            customLoadingComponent={<CustomLoadingComponent />}
            successCallback={loginSuccess}
        />
    );
}

function CustomLoadingComponent() {
    return <div>Loading ...</div>;
}

export default function CustomErrorComponent() {
    return <div>{"Oops. You can not suppose to be here :)"}</div>;
}
