import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { Loader2 } from "lucide-react";

export function ConnectWallet() {
  const { connect, disconnect, connecting, address, balance } = useWallet();

  const handleConnect = async () => {
    if (address) {
      await disconnect({ label: address });
    } else {
      await connect();
    }
  };

  return (
    <Button
      onClick={handleConnect}
      disabled={connecting}
      variant={address ? "outline" : "default"}
      className={address 
        ? "gap-2 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50" 
        : "gap-2 bg-emerald-600 text-white hover:bg-emerald-700"}
    >
      {connecting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : address ? (
        <>
          <span>
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          {balance && (
            <span className="text-xs text-zinc-300">
              ({parseFloat(balance).toFixed(4)} ETH)
            </span>
          )}
        </>
      ) : (
        "Connect Wallet"
      )}
    </Button>
  );
}
