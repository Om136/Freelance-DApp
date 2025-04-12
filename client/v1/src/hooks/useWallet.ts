"use client";
import { useConnectWallet } from "@web3-onboard/react";
import { BrowserProvider, formatEther } from "ethers";
import { useEffect, useState } from "react";

export const useWallet = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [ethersProvider, setEthersProvider] = useState<BrowserProvider | null>(
    null
  );
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    let provider: BrowserProvider | null = null;

    const handleAccountsChanged = async (accounts: string[]) => {
      setAddress(accounts[0] || null);
      if (accounts[0] && provider) {
        const balance = await provider.getBalance(accounts[0]);
        setBalance(formatEther(balance));
      } else {
        setBalance(null);
      }
    };

    const handleChainChanged = async (newChainId: string) => {
      setChainId(parseInt(newChainId));
      if (address && provider) {
        const balance = await provider.getBalance(address);
        setBalance(formatEther(balance));
      }
    };

    if (wallet?.provider) {
      provider = new BrowserProvider(wallet.provider);
      setEthersProvider(provider);

      // Get initial wallet state
      const initializeWallet = async () => {
        const signer = await provider!.getSigner();
        const addr = await signer.getAddress();
        setAddress(addr);

        const network = await provider!.getNetwork();
        setChainId(Number(network.chainId));

        const bal = await provider!.getBalance(addr);
        setBalance(formatEther(bal));
      };

      initializeWallet().catch(console.error);

      // Setup event listeners
      wallet.provider.on("accountsChanged", handleAccountsChanged);
      wallet.provider.on("chainChanged", handleChainChanged);

      // Cleanup function
      return () => {
        if (wallet?.provider) {
          wallet.provider.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
          wallet.provider.removeListener("chainChanged", handleChainChanged);
        }
      };
    } else {
      setEthersProvider(null);
      setAddress(null);
      setChainId(null);
      setBalance(null);
    }
  }, [wallet]);

  return {
    connect,
    disconnect,
    connecting,
    wallet,
    address,
    chainId,
    balance,
    ethersProvider,
  };
};
