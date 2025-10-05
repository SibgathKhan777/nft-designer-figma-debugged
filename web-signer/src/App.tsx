import React from 'react';
import { MetaMaskProvider } from './hooks/useMetaMask';
import { WebSignerInterface } from './components/WebSignerInterface';
import './App.css';

function App() {
  return (
    <MetaMaskProvider>
      <div className="App">
        <WebSignerInterface />
      </div>
    </MetaMaskProvider>
  );
}

export default App;
