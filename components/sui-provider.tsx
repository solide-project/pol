"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

interface SuiProviderProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function SuiProvider({ children }: SuiProviderProps) {
    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
};