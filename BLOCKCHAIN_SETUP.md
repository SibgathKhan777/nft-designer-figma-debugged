# 🚀 Real Blockchain Minting Setup Guide

## 📋 Required Credentials

To enable real NFT minting, you need to set up the following services:

### 1. 🔑 Blockchain Setup

#### Option A: Use Your Existing Wallet (Recommended)
1. **Export Private Key from MetaMask:**
   - Open MetaMask
   - Click on account details (three dots)
   - Select "Account details"
   - Click "Show private key"
   - Copy the private key (without 0x prefix)

#### Option B: Create a New Dedicated Wallet
1. Create a new MetaMask wallet specifically for contract interactions
2. Fund it with Mumbai MATIC tokens (get from [Polygon Faucet](https://faucet.polygon.technology/))
3. Export the private key

### 2. 🌐 RPC Configuration

#### Get Alchemy API Key (Free)
1. Go to [Alchemy](https://www.alchemy.com/)
2. Create account and new app
3. Select "Polygon Mumbai" network
4. Copy the HTTPS URL

### 3. 📁 IPFS Storage

#### NFT.Storage (Free - Recommended)
1. Go to [NFT.Storage](https://nft.storage/)
2. Sign up with GitHub/Email
3. Create API key
4. Copy the API key

### 4. 🤖 AI Service

#### OpenAI (Paid - Best Quality)
1. Go to [OpenAI](https://platform.openai.com/)
2. Create account and add billing
3. Generate API key
4. Copy the API key

## ⚙️ Configuration Steps

1. **Set Environment Variables:**
   ```bash
   # In your .env file, add:
   PRIVATE_KEY=your_private_key_without_0x_prefix
   POLYGON_MUMBAI_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
   NFT_STORAGE_API_KEY=your_nft_storage_api_key
   OPENAI_API_KEY=your_openai_api_key
   MOCK_MINTING=false
   ```

2. **Deploy Smart Contract:**
   ```bash
   cd contracts
   npx hardhat run scripts/deploy.js --network mumbai
   ```

3. **Update Backend Configuration:**
   - Copy the deployed contract address
   - Add `CONTRACT_ADDRESS_MUMBAI=deployed_address` to .env

4. **Test Real Minting:**
   - Use your Figma plugin
   - Select a frame and mint NFT
   - Check your MetaMask wallet for the new NFT!

## 💰 Cost Estimate

- **Deployment:** ~$0.50-2.00 (one-time)
- **Per NFT Mint:** ~$0.01-0.05 (gas fees)
- **IPFS Storage:** Free (NFT.Storage)
- **AI Enhancement:** ~$0.001 per request

## 🎯 Quick Start (Minimal Setup)

For immediate testing with minimal cost:

1. **Use existing wallet private key**
2. **Get free Alchemy RPC URL**
3. **Use free NFT.Storage**
4. **Skip AI enhancement** (set MOCK_AI=true)

This will cost only gas fees (~$0.01-0.05 per NFT)!

## 🆘 Troubleshooting

- **"Insufficient funds":** Add Mumbai MATIC to your wallet
- **"Contract not found":** Deploy contract first
- **"Invalid private key":** Remove 0x prefix from private key
- **"RPC error":** Check Alchemy URL and network

## 📞 Support

If you need help with any step, let me know and I'll guide you through it!
