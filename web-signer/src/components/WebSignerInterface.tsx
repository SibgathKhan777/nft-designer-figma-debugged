import React, { useState } from 'react';
import { useMetaMask } from '../hooks/useMetaMask';
import { ConnectionStatus } from './ConnectionStatus';
import { TransactionSigner } from './TransactionSigner';
import { NetworkInfo } from './NetworkInfo';

export const WebSignerInterface: React.FC = () => {
  const {
    isConnected,
    account,
    chainId,
    connect,
    disconnect,
    switchToAmoy,
    error,
    isLoading
  } = useMetaMask();

  const [activeTab, setActiveTab] = useState<'connect' | 'sign' | 'info'>('connect');

  const isAmoyNetwork = chainId === '0x13882' || chainId === '80002';

  return (
    <div className="web-signer">
      <header className="header">
        <h1>NFT Designer Web Signer</h1>
        <p>Connect MetaMask to sign NFT minting transactions</p>
      </header>

      <nav className="nav-tabs">
        <button
          className={`tab ${activeTab === 'connect' ? 'active' : ''}`}
          onClick={() => setActiveTab('connect')}
        >
          Connection
        </button>
        <button
          className={`tab ${activeTab === 'sign' ? 'active' : ''}`}
          onClick={() => setActiveTab('sign')}
          disabled={!isConnected}
        >
          Sign Transaction
        </button>
        <button
          className={`tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Network Info
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'connect' && (
          <ConnectionStatus
            isConnected={isConnected}
            account={account}
            chainId={chainId}
            onConnect={connect}
            onDisconnect={disconnect}
            onSwitchNetwork={switchToAmoy}
            error={error}
            isLoading={isLoading}
            isAmoyNetwork={isAmoyNetwork}
          />
        )}

        {activeTab === 'sign' && isConnected && (
          <TransactionSigner
            account={account}
            chainId={chainId}
            isAmoyNetwork={isAmoyNetwork}
          />
        )}

        {activeTab === 'info' && (
          <NetworkInfo
            chainId={chainId}
            isAmoyNetwork={isAmoyNetwork}
          />
        )}
      </main>

      <footer className="footer">
        <p>
          This web signer allows you to connect MetaMask and sign NFT minting transactions
          for the NFT Designer Figma plugin.
        </p>
        <p>
          Make sure you're connected to Polygon Amoy testnet for testing.
        </p>
      </footer>
    </div>
  );
};
