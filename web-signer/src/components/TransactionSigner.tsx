import React, { useState } from 'react';
import { ethers } from 'ethers';

interface TransactionSignerProps {
  account: string | null;
  chainId: string | null;
  isAmoyNetwork: boolean;
}

export const TransactionSigner: React.FC<TransactionSignerProps> = ({
  account,
  chainId,
  isAmoyNetwork
}) => {
  const [transactionData, setTransactionData] = useState({
    to: '',
    data: '',
    value: '0',
    gasLimit: '21000'
  });
  const [isSigning, setIsSigning] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setTransactionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const signTransaction = async () => {
    if (!window.ethereum || !account) {
      setError('MetaMask not connected');
      return;
    }

    try {
      setIsSigning(true);
      setError(null);
      setSignature(null);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create transaction object
      const transaction = {
        to: transactionData.to,
        data: transactionData.data,
        value: ethers.parseEther(transactionData.value),
        gasLimit: transactionData.gasLimit
      };

      // Sign the transaction
      const signedTx = await signer.signTransaction(transaction);
      setSignature(signedTx);

      console.log('Transaction signed:', signedTx);

    } catch (err: any) {
      console.error('Signing failed:', err);
      setError(err.message || 'Failed to sign transaction');
    } finally {
      setIsSigning(false);
    }
  };

  const signMessage = async () => {
    if (!window.ethereum || !account) {
      setError('MetaMask not connected');
      return;
    }

    try {
      setIsSigning(true);
      setError(null);
      setSignature(null);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const message = 'NFT Designer - Sign to mint your NFT';
      const signature = await signer.signMessage(message);
      setSignature(signature);

      console.log('Message signed:', signature);

    } catch (err: any) {
      console.error('Message signing failed:', err);
      setError(err.message || 'Failed to sign message');
    } finally {
      setIsSigning(false);
    }
  };

  if (!isAmoyNetwork) {
    return (
      <div className="transaction-signer">
        <div className="network-warning">
          <span className="warning-icon">⚠️</span>
          <div>
            <strong>Wrong Network</strong>
            <p>Please switch to Polygon Amoy testnet to sign transactions.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-signer">
      <h2>Transaction Signer</h2>
      
      <div className="signer-section">
        <h3>Sign Message</h3>
        <p>Sign a message to authorize NFT minting:</p>
        <button
          className="sign-btn"
          onClick={signMessage}
          disabled={isSigning}
        >
          {isSigning ? 'Signing...' : 'Sign Message'}
        </button>
      </div>

      <div className="signer-section">
        <h3>Sign Transaction</h3>
        <p>Sign a custom transaction:</p>
        
        <div className="form-group">
          <label htmlFor="to">To Address:</label>
          <input
            id="to"
            type="text"
            value={transactionData.to}
            onChange={(e) => handleInputChange('to', e.target.value)}
            placeholder="0x..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="data">Data (hex):</label>
          <input
            id="data"
            type="text"
            value={transactionData.data}
            onChange={(e) => handleInputChange('data', e.target.value)}
            placeholder="0x..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="value">Value (ETH):</label>
          <input
            id="value"
            type="text"
            value={transactionData.value}
            onChange={(e) => handleInputChange('value', e.target.value)}
            placeholder="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gasLimit">Gas Limit:</label>
          <input
            id="gasLimit"
            type="text"
            value={transactionData.gasLimit}
            onChange={(e) => handleInputChange('gasLimit', e.target.value)}
            placeholder="21000"
          />
        </div>

        <button
          className="sign-btn"
          onClick={signTransaction}
          disabled={isSigning || !transactionData.to}
        >
          {isSigning ? 'Signing...' : 'Sign Transaction'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">❌</span>
          <span>{error}</span>
        </div>
      )}

      {signature && (
        <div className="signature-result">
          <h3>Signature Result</h3>
          <div className="signature-box">
            <code>{signature}</code>
          </div>
          <button
            className="copy-btn"
            onClick={() => navigator.clipboard.writeText(signature)}
          >
            Copy Signature
          </button>
        </div>
      )}
    </div>
  );
};
