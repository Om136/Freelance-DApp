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
      className="gap-2"
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
            <span className="text-xs">
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
