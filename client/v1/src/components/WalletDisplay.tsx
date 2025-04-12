"use client";

import { useWallet } from "@/hooks/useWallet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ChevronDown,
  Power,
  ExternalLink,
  Copy,
  AlertCircle,
} from "lucide-react";
import { useCallback, useState } from "react";

const NETWORK_NAMES: { [key: number]: string } = {
  1: "Ethereum Mainnet",
  11155111: "Sepolia",
};

export function WalletDisplay() {
  const { connect, disconnect, connecting, address, balance, chainId, wallet } =
    useWallet();
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);

  const handleDisconnectClick = () => {
    setShowDisconnectDialog(true);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setShowDisconnectDialog(false);
    }
  };

  const handleCancelClick = () => {
    setShowDisconnectDialog(false);
  };

  const handleConfirmDisconnect = async () => {
    try {
     await disconnect({ label: wallet?.label || "" });
      setShowDisconnectDialog(false);
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  const handleConnect = async () => {
    if (!address) {
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
        className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 btn-glow"
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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border-emerald-500/30 text-zinc-300 hover:bg-emerald-500/10 hover:border-emerald-500/50 flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            {balance && (
              <span className="text-xs text-zinc-300">
                {parseFloat(balance).toFixed(4)} ETH
              </span>
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[240px] text-sinc-300 hover:bg-emerald-500/10"
        >
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
          <DropdownMenuItem
            className="text-emerald-500 hover:text-emerald-400"
            onClick={() => setShowDisconnectDialog(true)}
          >
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={showDisconnectDialog}
        onOpenChange={setShowDisconnectDialog}
      >
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-zinc-100">
              Disconnect Wallet
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Are you sure you want to disconnect your wallet?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between sm:justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowDisconnectDialog(false)}
              className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border-zinc-700"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDisconnect}
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
