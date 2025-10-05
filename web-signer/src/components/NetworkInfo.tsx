import React from 'react';

interface NetworkInfoProps {
  chainId: string | null;
  isAmoyNetwork: boolean;
}

export const NetworkInfo: React.FC<NetworkInfoProps> = ({
  chainId,
  isAmoyNetwork
}) => {
  const getNetworkDetails = (chainId: string | null) => {
    switch (chainId) {
      case '0x1':
      case '1':
        return {
          name: 'Ethereum Mainnet',
          explorer: 'https://etherscan.io',
          currency: 'ETH',
          rpcUrl: 'https://mainnet.infura.io/v3/your-project-id'
        };
      case '0x13882':
      case '80002':
        return {
          name: 'Polygon Amoy Testnet',
          explorer: 'https://amoy.polygonscan.com',
          currency: 'MATIC',
          rpcUrl: 'https://polygon-amoy.g.alchemy.com/v2/N7ISZhjj9D_9X5FiNy4XG'
        };
      case '0x89':
      case '137':
        return {
          name: 'Polygon Mainnet',
          explorer: 'https://polygonscan.com',
          currency: 'MATIC',
          rpcUrl: 'https://polygon-mainnet.g.alchemy.com/v2/your-alchemy-key'
        };
      default:
        return {
          name: 'Unknown Network',
          explorer: '',
          currency: 'Unknown',
          rpcUrl: ''
        };
    }
  };

  const networkDetails = getNetworkDetails(chainId);

  return (
    <div className="network-info">
      <h2>Network Information</h2>
      
      <div className="network-status">
        <div className={`status-indicator ${isAmoyNetwork ? 'connected' : 'disconnected'}`}>
          <span className="status-icon">
            {isAmoyNetwork ? '✅' : '❌'}
          </span>
          <span>
            {isAmoyNetwork ? 'Connected to Amoy' : 'Not on Amoy Network'}
          </span>
        </div>
      </div>

      <div className="network-details">
        <h3>Current Network</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Network Name:</span>
            <span className="value">{networkDetails.name}</span>
          </div>
          <div className="info-item">
            <span className="label">Chain ID:</span>
            <span className="value">{chainId || 'Not connected'}</span>
          </div>
          <div className="info-item">
            <span className="label">Currency:</span>
            <span className="value">{networkDetails.currency}</span>
          </div>
          <div className="info-item">
            <span className="label">Explorer:</span>
            <span className="value">
              {networkDetails.explorer ? (
                <a href={networkDetails.explorer} target="_blank" rel="noopener noreferrer">
                  {networkDetails.explorer}
                </a>
              ) : (
                'N/A'
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="amoy-info">
        <h3>Polygon Amoy Testnet</h3>
        <p>
          NFT Designer requires Polygon Amoy testnet for testing NFT minting.
          Amoy is a test network where you can mint NFTs without spending real money.
        </p>
        
        <div className="amoy-details">
          <h4>Amoy Testnet Details:</h4>
          <ul>
            <li><strong>Chain ID:</strong> 80002 (0x13882)</li>
            <li><strong>Currency:</strong> MATIC (test tokens)</li>
            <li><strong>Explorer:</strong> <a href="https://amoy.polygonscan.com" target="_blank" rel="noopener noreferrer">amoy.polygonscan.com</a></li>
            <li><strong>RPC URL:</strong> https://polygon-amoy.g.alchemy.com/v2/N7ISZhjj9D_9X5FiNy4XG</li>
          </ul>
        </div>

        <div className="faucet-info">
          <h4>Getting Test MATIC:</h4>
          <p>You need test MATIC tokens to pay for gas fees on Amoy:</p>
          <ul>
            <li><a href="https://faucet.polygon.technology/" target="_blank" rel="noopener noreferrer">Polygon Faucet</a></li>
            <li><a href="https://faucets.chain.link/amoy" target="_blank" rel="noopener noreferrer">Chainlink Faucet</a></li>
          </ul>
        </div>
      </div>

      {!isAmoyNetwork && (
        <div className="switch-instructions">
          <h3>How to Switch to Amoy</h3>
          <ol>
            <li>Click the "Switch to Amoy" button in the Connection tab</li>
            <li>If Amoy is not added to MetaMask, it will be added automatically</li>
            <li>Confirm the network switch in MetaMask</li>
            <li>Get test MATIC from a faucet if needed</li>
          </ol>
        </div>
      )}
    </div>
  );
};
