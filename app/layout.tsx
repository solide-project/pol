import type { Metadata } from "next";
import { NavBar } from "@/components/core/nav/nav-bar";
import { aeonik } from "@/lib/fonts";
import { Provider } from "@/components/provider";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "@/components/theme/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAnalytics } from '@next/third-parties/google'

import "./globals.css";
import '@mysten/dapp-kit/dist/index.css';
import { Banner } from "@/components/core/home/banner";

export const metadata: Metadata = {
  title: "Proof of Learn | Earn NFTs by Mastering Blockchain Skills",
  description: "Join Proof of Learn, the ultimate educational platform where you can learn about blockchain, smart contracts, and Web3, and earn valuable NFT rewards for your achievements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en">
    <body className={`${aeonik.variable} font-sans`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider delayDuration={0}>
          <Provider>
            <Banner />
            <NavBar />
            {children}
            <Toaster />
          </Provider>
        </TooltipProvider>
      </ThemeProvider>
    </body>
    <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS || ""} />
  </html>
}
