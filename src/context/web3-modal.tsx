"use client";

import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, arbitrum, base, polygon } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, type Config } from "wagmi";
import React, { type ReactNode } from "react";
import { cookieStorage, createStorage } from "wagmi";

// 0. Setup QueryClient
const queryClient = new QueryClient();

// 1. Get projectId from env
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// 2. Create wagmiConfig
const metadata = {
  name: "Jog Smart City",
  description: "Jogja Smart City Blockchain App",
  url: "https://jog-smart-city.vercel.app", // standard placeholder
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const networks = [mainnet, base, polygon, arbitrum];

const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

const config = wagmiAdapter.wagmiConfig as Config;

// 3. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: networks as any,
  projectId,
  metadata,
  features: {
    analytics: true,
    email: false,
    socials: [],
  },
});

export function Web3ModalProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
