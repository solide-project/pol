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

export const metadata: Metadata = {
  title: "Proof of Learn",
  description: "Rewarding learning with NFTs",
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
            <div className="bg-primary">
              Live on Mainet
            </div>
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
