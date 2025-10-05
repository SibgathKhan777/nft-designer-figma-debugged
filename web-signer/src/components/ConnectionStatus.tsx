import React from 'react';

interface ConnectionStatusProps {
  isConnected: boolean;
  account: string | null;
  chainId: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
  onSwitchNetwork: () => void;
  error: string | null;
  isLoading: boolean;
  isAmoyNetwork: boolean;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  isConnected,
  account,
  chainId,
  onConnect,
  onDisconnect,
  onSwitchNetwork,
  error,
  isLoading,
  isAmoyNetwork
}) => {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getChainName = (chainId: string | null) => {
    switch (chainId) {
      case '0x1':
      case '1':
        return 'Ethereum Mainnet';
      case '0x13882':
      case '80002':
        return 'Polygon Amoy';
      case '0x89':
      case '137':
        return 'Polygon Mainnet';
      default:
        return `Chain ID: ${chainId}`;
    }
  };

  return (
    <div className="connection-status">
      <h2>MetaMask Connection</h2>
      
      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {!isConnected ? (
        <div className="connection-prompt">
          <div className="connection-icon">🦊</div>
          <h3>Connect to MetaMask</h3>
          <p>
            To use the NFT Designer, you need to connect your MetaMask wallet.
            Make sure you have MetaMask installed in your browser.
          </p>
          
          <button
            className="connect-btn"
            onClick={onConnect}
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Connect MetaMask'}
          </button>
          
          <div className="requirements">
            <h4>Requirements:</h4>
            <ul>
              <li>MetaMask browser extension installed</li>
              <li>Polygon Amoy testnet added to MetaMask</li>
              <li>Some MATIC tokens for gas fees</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="connection-details">
          <div className="status-indicator connected">
            <span className="status-icon">✅</span>
            <span>Connected</span>
          </div>
          
          <div className="account-info">
            <h3>Account Details</h3>
            <div className="info-item">
              <span className="label">Address:</span>
              <span className="value">{formatAddress(account!)}</span>
            </div>
            <div className="info-item">
              <span className="label">Network:</span>
              <span className="value">{getChainName(chainId)}</span>
            </div>
          </div>

          {!isAmoyNetwork && (
            <div className="network-warning">
              <span className="warning-icon">⚠️</span>
              <div>
                <strong>Wrong Network</strong>
                <p>Please switch to Polygon Amoy testnet to use NFT Designer.</p>
                <button
                  className="switch-network-btn"
                  onClick={onSwitchNetwork}
                >
                  Switch to Amoy
                </button>
              </div>
            </div>
          )}

          {isAmoyNetwork && (
            <div className="network-success">
              <span className="success-icon">✅</span>
              <span>Connected to Polygon Amoy - Ready to mint NFTs!</span>
            </div>
          )}

          <div className="connection-actions">
            <button
              className="disconnect-btn"
              onClick={onDisconnect}
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
