'use client';

import { useEffect } from 'react';
import { LoginCallBack, useOCAuth } from '@opencampus/ocid-connect-js';

interface RedirctCallBackProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function RedirctCallBack({ children }: RedirctCallBackProps) {
    const { authState, ocAuth } = useOCAuth();

    useEffect(() => {
        console.log(authState)
        console.log(ocAuth)
    }, [])

    const loginSuccess = () => { }

    return <LoginCallBack customErrorComponent={CustomErrorComponent}
        customLoadingComponent={CustomLoadingComponent}
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