import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/theme-provider";
import { Web3ModalProvider } from "@/context/web3-modal";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Java Smart City | Digital Land & Smart City Ecosystem",
  description:
    "Java Smartcity bridges real-world assets and digital land into a unified smart city ecosystem, enabling innovation, efficiency, and sustainable growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Web3ModalProvider>
            <NextTopLoader color="#00FE01" />
            {children}
          </Web3ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
