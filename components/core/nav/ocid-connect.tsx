'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOCAuth } from '@opencampus/ocid-connect-js';
import { Button } from '../../ui/button';
import { ProfileMenu } from './profile-menu';
import Image from 'next/image';

interface OCIDConnectProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function OCIDConnect({ children }: OCIDConnectProps) {
    const { ocAuth, authState } = useOCAuth();

    useEffect(() => {
        if (authState.isAuthenticated) {
            // console.log(ocAuth)
            // console.log(authState)
        }
    }, [authState.isAuthenticated]);

    const handleLogin = async () => {
        try {
            await ocAuth.signInWithRedirect({ state: 'opencampus' });
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return <>
        {authState.isAuthenticated
            ? <ProfileMenu address="0x" />
            : <Button onClick={handleLogin}
                className="flex items-center space-x-2">
                <Image src="icons/open-campus.svg" alt="logo" height={32} width={32} />
                <div className="font-semibold">Connect OCID</div>
            </Button>}
    </>
}