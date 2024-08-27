'use client';

import { useEffect, useState } from 'react';
import { LoginCallBack, useOCAuth } from '@opencampus/ocid-connect-js';
import { useRouter } from 'next/navigation';

interface RedirctCallBackProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function RedirctCallBack({ children }: RedirctCallBackProps) {
    const [error, setError] = useState("")
    const { authState, ocAuth } = useOCAuth();
    const router = useRouter();

    useEffect(() => {
        if (authState.isAuthenticated) {
            router.push("/")
            return 
        }

        setError("Oops. Fail to authenticate")
    }, [authState.isAuthenticated])

    const loginSuccess = () => { }

    return <LoginCallBack customErrorComponent={<CustomErrorComponent />}
        customLoadingComponent={<CustomLoadingComponent />}
        successCallback={loginSuccess} />
}

function CustomLoadingComponent() {
    return (
        <div>Loading ...</div>
    );
}

export default function CustomErrorComponent() {
    const { authState, ocAuth } = useOCAuth();

    return (
        <div>{authState?.error?.message || "Oops. You can not suppose to be here :)"}</div>
    );
}