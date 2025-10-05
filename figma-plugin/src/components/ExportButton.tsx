import React from 'react';

interface ExportButtonProps {
  onExport: () => void;
  isExporting: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ onExport, isExporting }) => {
  return (
    <div className="export-section">
      <h2>Export Your Design</h2>
      <p>Select objects in Figma and click export to create NFTs</p>
      
      <button 
        className="export-btn"
        onClick={onExport}
        disabled={isExporting}
      >
        {isExporting ? 'Exporting...' : 'Export Selection'}
      </button>
      
      <div className="instructions">
        <h4>Instructions:</h4>
        <ol>
          <li>Select the art/design you want to turn into an NFT</li>
          <li>Click "Export Selection"</li>
          <li>Fill in the NFT details</li>
          <li>Mint your NFT on Polygon</li>
        </ol>
      </div>
    </div>
  );
};
