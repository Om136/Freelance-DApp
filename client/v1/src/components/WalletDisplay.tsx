"use client";

import { useWallet } from "@/hooks/useWallet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronDown, Power, ExternalLink, Copy } from "lucide-react";
import { useCallback } from "react";

const NETWORK_NAMES: { [key: number]: string } = {
  1: "Ethereum Mainnet",
  11155111: "Sepolia",
};

export function WalletDisplay() {
  const { connect, disconnect, connecting, address, balance, chainId } =
    useWallet();

  const handleConnect = async () => {
    if (address) {
      await disconnect({ label: address });
    } else {
      await connect();
    }
  };

  const copyAddress = useCallback(() => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  }, [address]);

  const openEtherscan = useCallback(() => {
    if (address) {
      const baseUrl =
        chainId === 1 ? "https://etherscan.io" : "https://sepolia.etherscan.io";
      window.open(`${baseUrl}/address/${address}`, "_blank");
    }
  }, [address, chainId]);

  if (!address) {
    return (
      <Button
        onClick={handleConnect}
        disabled={connecting}
        className="bg-purple hover:bg-purple-deepdark flex items-center gap-2 btn-glow"
      >
        {connecting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          "Connect Wallet"
        )}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-purple/30 text-white hover:bg-purple/10 hover:border-purple/50 flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          {balance && (
            <span className="text-xs">
              {parseFloat(balance).toFixed(4)} ETH
            </span>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px]">
        <div className="px-2 py-1.5 text-sm font-medium">
          Network: {NETWORK_NAMES[chainId || 1] || "Unknown"}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyAddress}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openEtherscan}>
          <ExternalLink className="mr-2 h-4 w-4" />
          View on Etherscan
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleConnect} className="text-red-500">
          <Power className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
