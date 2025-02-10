"use client";

import { ConnectButton } from "@mysten/dapp-kit";

import "@mysten/dapp-kit/dist/index.css";
import TerminalChat from "./components/chat";



export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end animate-gradient">
      <header className="m-auto w-full max-w-3xl text-center text-terminal-text font-bold font-mono p-4  rounded-lg overflow-hidden">
      <h1 className="text-3xl">Sui AI Image Generator  &  NFT Minter</h1>
        <ConnectButton className="bg-black border-terminal" />
      </header>
      <TerminalChat />
    </div>
  );
}
