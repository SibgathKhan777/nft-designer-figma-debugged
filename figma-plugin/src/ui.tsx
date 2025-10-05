import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.css';

const App = () => {
  return (
    <div className="nft-designer">
      <header className="header">
        <h1>NFT Designer</h1>
        <p>Export your Figma designs as NFTs</p>
      </header>
      <main className="main">
        <div className="export-section">
          <h2>Welcome to NFT Designer!</h2>
          <p>Select some elements in Figma and click Export to get started.</p>
          <button 
            className="export-btn"
            onClick={() => {
              parent.postMessage({ pluginMessage: { type: 'export-selection' } }, '*');
            }}
          >
            Export Selection
          </button>
          <div className="instructions">
            <h4>How to use:</h4>
            <ol>
              <li>Select elements in Figma that you want to turn into an NFT</li>
              <li>Click "Export Selection" to capture the design</li>
              <li>Fill out the NFT metadata form</li>
              <li>Mint your NFT on the blockchain!</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
};

console.log('NFT Designer UI: Starting to mount React app...');

const container = document.getElementById('react-page');
console.log('Container found:', container);

if (container) {
  console.log('Creating React root...');
  const root = createRoot(container);
  console.log('Rendering App component...');
  root.render(<App />);
  console.log('NFT Designer UI: React app mounted successfully!');
} else {
  console.error('NFT Designer UI: Could not find react-page container');
  // Fallback: try to create the container
  const fallbackContainer = document.createElement('div');
  fallbackContainer.id = 'react-page';
  document.body.appendChild(fallbackContainer);
  
  console.log('Created fallback container, mounting React app...');
  const root = createRoot(fallbackContainer);
  root.render(<App />);
  console.log('NFT Designer UI: React app mounted on fallback container!');
}
