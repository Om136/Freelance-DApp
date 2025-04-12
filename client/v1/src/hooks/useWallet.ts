"use client";
import { useConnectWallet } from "@web3-onboard/react";
import { BrowserProvider, formatEther } from "ethers";
import { useEffect, useState, useCallback } from "react";

export const useWallet = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [ethersProvider, setEthersProvider] = useState<BrowserProvider | null>(
    null
  );
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const resetStates = useCallback(() => {
    setEthersProvider(null);
    setAddress(null);
    setChainId(null);
    setBalance(null);
  }, []);

  useEffect(() => {
    if (!wallet) {
      resetStates();
    }
  }, [wallet, resetStates]);

  useEffect(() => {
    let provider: BrowserProvider | null = null;
    let mounted = true;

    const handleAccountsChanged = async (accounts: string[]) => {
      if (!mounted) return;
      const newAddress = accounts[0] || null;
      setAddress(newAddress);
      if (newAddress && provider) {
        try {
          const balance = await provider.getBalance(newAddress);
          setBalance(formatEther(balance));
        } catch (err) {
          console.error("Error updating balance:", err);
          setBalance(null);
        }
      } else {
        setBalance(null);
      }
    };

    const handleChainChanged = async (newChainId: string) => {
      if (!mounted) return;
      setChainId(parseInt(newChainId));
      if (address && provider) {
        try {
          const balance = await provider.getBalance(address);
          setBalance(formatEther(balance));
        } catch (err) {
          console.error("Error updating balance:", err);
          setBalance(null);
        }
      }
    };

    const setupWallet = async () => {
      if (wallet?.provider && mounted) {
        provider = new BrowserProvider(wallet.provider);
        setEthersProvider(provider);

        try {
          const signer = await provider.getSigner();
          const addr = await signer.getAddress();
          if (mounted) {
            setAddress(addr);

            const network = await provider.getNetwork();
            setChainId(Number(network.chainId));

            const bal = await provider.getBalance(addr);
            setBalance(formatEther(bal));
            console.log({ walletAddress: addr});
            try {
              const response = await fetch(
                "http://localhost:8080/user/walletSetup",
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                  body: JSON.stringify({
                    walletAddress: addr,
                  }),
                  credentials: "include",
                }
              );

              if (!response.ok) {
                throw new Error("Failed to update wallet address");
              }
            } catch (error) {
              console.error("Error updating wallet address:", error);
            }
          }
        } catch (err) {
          console.error("Error initializing wallet:", err);
          if (mounted) {
            resetStates();
          }
        }

        wallet.provider.on("accountsChanged", handleAccountsChanged);
        wallet.provider.on("chainChanged", handleChainChanged);
      }
    };

    setupWallet();

    return () => {
      mounted = false;
      if (wallet?.provider) {
        wallet.provider.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        wallet.provider.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [wallet, resetStates]);

  const wrappedDisconnect = useCallback(
    async (options: any) => {
      try {
        await disconnect(options);
        resetStates();
      } catch (error) {
        console.error("Error during disconnect:", error);
        resetStates();
      }
    },
    [disconnect, resetStates]
  );

  return {
    connect,
    disconnect: wrappedDisconnect,
    connecting,
    wallet,
    address,
    chainId,
    balance,
    ethersProvider,
  };
};
