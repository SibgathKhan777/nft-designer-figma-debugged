import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

interface MetaMaskContextType {
  isConnected: boolean;
  account: string | null;
  chainId: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchToAmoy: () => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

const MetaMaskContext = createContext<MetaMaskContextType | undefined>(undefined);

interface MetaMaskProviderProps {
  children: ReactNode;
}

export const MetaMaskProvider: React.FC<MetaMaskProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Polygon Amoy testnet configuration (replaces deprecated Mumbai)
  const AMOY_CHAIN_ID = '0x13882'; // 80002 in hex
  const AMOY_RPC_URL = 'https://polygon-amoy.g.alchemy.com/v2/N7ISZhjj9D_9X5FiNy4XG';
  const AMOY_CHAIN_CONFIG = {
    chainId: AMOY_CHAIN_ID,
    chainName: 'Polygon Amoy',
    rpcUrls: [AMOY_RPC_URL],
    blockExplorerUrls: ['https://amoy.polygonscan.com/'],
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  };

  const connect = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please connect to MetaMask.');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      const address = await signer.getAddress();

      setProvider(provider);
      setSigner(signer);
      setAccount(address);
      setChainId(network.chainId.toString());
      setIsConnected(true);

      console.log('Connected to MetaMask:', {
        address,
        chainId: network.chainId.toString(),
        network: network.name,
      });

    } catch (err: any) {
      console.error('Connection failed:', err);
      setError(err.message || 'Failed to connect to MetaMask');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setAccount(null);
    setChainId(null);
    setProvider(null);
    setSigner(null);
    setError(null);
  };

  const switchToAmoy = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      // Check if Amoy is already added
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: AMOY_CHAIN_ID }],
        });
      } catch (switchError: any) {
        // If the chain is not added, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [AMOY_CHAIN_CONFIG],
          });
        } else {
          throw switchError;
        }
      }

      // Update chain ID after switching
      const network = await provider?.getNetwork();
      if (network) {
        setChainId(network.chainId.toString());
      }

    } catch (err: any) {
      console.error('Failed to switch to Amoy:', err);
      setError(err.message || 'Failed to switch to Amoy network');
    }
  };

  // Check connection status on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });

          if (accounts.length > 0) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const network = await provider.getNetwork();
            const address = await signer.getAddress();

            setProvider(provider);
            setSigner(signer);
            setAccount(address);
            setChainId(network.chainId.toString());
            setIsConnected(true);
          }
        } catch (err) {
          console.error('Failed to check connection:', err);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        setAccount(accounts[0]);
      }
    };

    // Listen for chain changes
    const handleChainChanged = (chainId: string) => {
      setChainId(chainId);
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, []);

  const value: MetaMaskContextType = {
    isConnected,
    account,
    chainId,
    provider,
    signer,
    connect,
    disconnect,
    switchToAmoy,
    error,
    isLoading,
  };

  return (
    <MetaMaskContext.Provider value={value}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = (): MetaMaskContextType => {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error('useMetaMask must be used within a MetaMaskProvider');
  }
  return context;
};
