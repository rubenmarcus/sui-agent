"use client"

import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@mysten/dapp-kit/dist/index.css";
import { JSX } from "react";

export const SuiProvider = ({ children }): JSX.Element => {
  const { networkConfig } = createNetworkConfig({
    localnet: { url: getFullnodeUrl("localnet") },
    mainnet: { url: getFullnodeUrl("mainnet") },
  });
  const queryClient = new QueryClient();
  return(
  <QueryClientProvider client={queryClient}>
    <SuiClientProvider networks={networkConfig} defaultNetwork="localnet">
      <WalletProvider>{children}</WalletProvider>
    </SuiClientProvider>
  </QueryClientProvider>);
};
