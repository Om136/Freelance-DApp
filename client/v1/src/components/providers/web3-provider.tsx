"use client";

import injectedModule from "@web3-onboard/injected-wallets";
import { Web3OnboardProvider, init } from "@web3-onboard/react";

const chains = [
  {
    id: 11155111,
    token: "ETH",
    label: "Sepolia",
    rpcUrl: "https://rpc.sepolia.org/",
  },
  {
    id: 1,
    token: "ETH",
    label: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/",
  },
];

const wallets = [injectedModule()];

const web3Onboard = init({
  wallets,
  chains,
  appMetadata: {
    name: "DeciFreelance",
    icon: "<svg>...</svg>",
    logo: "<svg>...</svg>",
    description:
      "A decentralized freelancing platform connecting global talent",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase Wallet", url: "https://wallet.coinbase.com/" },
    ],
  },
  connect: {
    autoConnectLastWallet: true,
    showSidebar: true,
    disableClose: false,
    removeWhereIsMyWalletWarning: true,
  },
  // Disable the default account center
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      {children}
    </Web3OnboardProvider>
  );
}
