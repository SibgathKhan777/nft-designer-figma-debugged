import React from 'react';

interface MintingStatusProps {
  status: string;
  isComplete: boolean;
}

export const MintingStatus: React.FC<MintingStatusProps> = ({ status, isComplete }) => {
  return (
    <div className={`minting-status ${isComplete ? 'complete' : 'processing'}`}>
      <div className="status-icon">
        {isComplete ? '✅' : '⏳'}
      </div>
      <div className="status-text">
        {status}
      </div>
      {isComplete && (
        <div className="success-actions">
          <button 
            className="view-nft-btn"
            onClick={() => {
              // Open NFT in explorer or marketplace
              window.open('https://mumbai.polygonscan.com/', '_blank');
            }}
          >
            View on Polygon Explorer
          </button>
        </div>
      )}
    </div>
  );
};
