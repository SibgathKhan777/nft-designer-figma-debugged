import React, { useState, useEffect } from 'react';
import { ExportButton } from './ExportButton';
import { NFTForm } from './NFTForm';
import { MintingStatus } from './MintingStatus';
import { NFTMetadata } from '../types';

export const NFTDesignerUI: React.FC = () => {
  const [exportedData, setExportedData] = useState<any[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintingStatus, setMintingStatus] = useState<string>('');
  const [nftMetadata, setNftMetadata] = useState<NFTMetadata | null>(null);

  const handleExport = () => {
    setIsExporting(true);
    parent.postMessage({ pluginMessage: { type: 'export-selection' } }, '*');
  };

  const handleMint = async (metadata: NFTMetadata) => {
    setIsMinting(true);
    setNftMetadata(metadata);
    setMintingStatus('Generating AI metadata...');
    
    try {
      // Send to backend for processing
      const response = await fetch('http://localhost:3001/api/mint-nft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exportedData,
          metadata
        })
      });

      if (!response.ok) {
        throw new Error('Failed to mint NFT');
      }

      const result = await response.json();
      setMintingStatus(`NFT minted successfully! Token ID: ${result.tokenId}`);
      
    } catch (error: any) {
      setMintingStatus(`Error: ${error.message}`);
    } finally {
      setIsMinting(false);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, data, message } = event.data.pluginMessage || {};
      
      if (type === 'export-success') {
        setExportedData(data);
        setIsExporting(false);
      } else if (type === 'error') {
        setMintingStatus(`Error: ${message}`);
        setIsExporting(false);
        setIsMinting(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="nft-designer">
      <header className="header">
        <h1>NFT Designer</h1>
        <p>Export your Figma designs as NFTs</p>
      </header>

      <main className="main">
        {exportedData.length === 0 ? (
          <div className="export-section">
            <ExportButton 
              onExport={handleExport}
              isExporting={isExporting}
            />
          </div>
        ) : (
          <div className="mint-section">
            <div className="exported-preview">
              <h3>Exported Art ({exportedData.length} items)</h3>
              {exportedData.map((item, index) => (
                <div key={index} className="preview-item">
                  <img 
                    src={`data:image/png;base64,${btoa(String.fromCharCode(...item.pngData))}`}
                    alt={item.name}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>

            <NFTForm 
              onMint={handleMint}
              isMinting={isMinting}
            />

            {mintingStatus && (
              <MintingStatus 
                status={mintingStatus}
                isComplete={!isMinting}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
};
