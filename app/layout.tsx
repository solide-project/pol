import type { Metadata } from "next";
import { NavBar } from "@/components/core/nav";
import { aeonik } from "@/lib/fonts";
import { Provider } from "@/components/provider";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "@/components/theme/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAnalytics } from '@next/third-parties/google'

import "./globals.css";
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
            <Banner
              message={"📣 New Course Live as it wins Arbitrum hackathon 🎉. Stylish Course to Stylus. Start learning now!"}
              href="/q/polearn/stylish-guide-to-stylus" />
            <NavBar />
            {children}

            <div className="hidden p-5 max-w-80 w-80 bg-grayscale-000 cursor-not-allowed bg-green-100 text-green-800"></div>
            <Toaster />
          </Provider>
        </TooltipProvider>
      </ThemeProvider>
    </body>
    <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS || ""} />
  </html>
}
