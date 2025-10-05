# 🔧 Environment Variables Setup Guide

## Quick Setup Checklist

### 1. **Alchemy API Key** (for Polygon RPC)
- Go to [Alchemy.com](https://www.alchemy.com/)
- Sign up → Create App → Polygon → Mumbai
- Copy the HTTPS URL

### 2. **OpenAI API Key** (for AI enhancement)
- Go to [OpenAI Platform](https://platform.openai.com/)
- Sign up → API Keys → Create new secret key
- Copy the key (starts with `sk-`)

### 3. **NFT.Storage API Key** (for IPFS)
- Go to [NFT.Storage](https://nft.storage/)
- Sign up → API Keys → Create API Key
- Copy the JWT token

### 4. **Private Key** (your wallet key)
- Open MetaMask → Account Details → Export Private Key
- Copy the key (remove `0x` prefix)

### 5. **Contract Address** (after deployment)
- Deploy contracts first: `npm run deploy:contracts`
- Copy the deployed contract address

## Complete .env File Example

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-key-here

# NFT.Storage Configuration  
NFT_STORAGE_API_KEY=your-nft-storage-key-here

# Blockchain Configuration
POLYGON_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/your-alchemy-key
PRIVATE_KEY=your-private-key-here
CONTRACT_ADDRESS=0x1234567890abcdef...

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://figma.com
```

## Setup Commands

```bash
# 1. Copy environment template
cp env.example .env

# 2. Edit with your values
nano .env

# 3. Deploy contracts to get contract address
cd contracts
npm run deploy:mumbai

# 4. Update .env with contract address
# 5. Start development
npm run dev:backend
```
