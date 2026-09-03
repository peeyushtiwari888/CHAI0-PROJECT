import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-providers";
import { QueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider } from '@clerk/nextjs'
import { CommandPalette } from "@/components/layout/command-palette";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodePilot — AI-powered full-stack app builder",
  description: "CodePilot is an AI-powered full-stack app builder. Build, iterate, and deploy instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          appearance={{
            elements: {
              logoImage: "h-8 w-auto object-contain",
            },
            layout: {
              logoImageUrl: "/logo.png",
            }
          }}
        >
          <ThemeProvider
            defaultTheme="dark"
          >
          <QueryProvider>
            {children}
            <CommandPalette />
            <Toaster richColors position="top-center" />
          </QueryProvider>
        </ThemeProvider>
      </ClerkProvider>
      </body>
    </html>
  );
}
