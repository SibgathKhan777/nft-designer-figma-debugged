# NFT Designer Plugin - Setup Guide

This guide will walk you through setting up the complete NFT Designer Plugin for Figma on your Mac OS Intel system.

## 🖥️ System Requirements

- **Operating System**: macOS (Intel chip)
- **Node.js**: Version 16.0.0 or higher
- **npm**: Version 8.0.0 or higher
- **Git**: Latest version
- **Figma Desktop App**: Latest version
- **MetaMask Browser Extension**: Latest version
- **VS Code**: Recommended IDE

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] Node.js and npm installed
- [ ] Git installed and configured
- [ ] Figma Desktop App installed
- [ ] MetaMask browser extension installed
- [ ] VS Code or preferred IDE
- [ ] Internet connection for API calls

## 🚀 Step-by-Step Setup

### Step 1: Clone the Repository

```bash
# Navigate to your desired directory
cd /Users/sibgath/designer

# Clone the repository
git clone https://github.com/nft-designer/figma-plugin.git nft-designer-figma
cd nft-designer-figma
```

### Step 2: Install Dependencies

```bash
# Install all dependencies (this may take a few minutes)
npm run install:all
```

If you encounter any issues, install dependencies individually:

```bash
npm run install:figma
npm run install:backend
npm run install:contracts
npm run install:web-signer
npm run install:shared
```

### Step 3: Environment Configuration

```bash
# Copy the environment template
cp env.example .env

# Open the .env file in your editor
code .env
```

Fill in the following required values in your `.env` file:

```env
# OpenAI API Key (required for AI enhancement)
OPENAI_API_KEY=your_openai_api_key_here

# NFT.Storage API Key (required for IPFS storage)
NFT_STORAGE_API_KEY=your_nft_storage_api_key_here

# Alchemy API Key (required for Polygon RPC)
POLYGON_MUMBAI_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/your_alchemy_key

# Private key for contract interactions
PRIVATE_KEY=your_private_key_here

# PolygonScan API Key (for contract verification)
POLYGONSCAN_API_KEY=your_polygonscan_api_key_here
```

### Step 4: Get Required API Keys

#### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

#### NFT.Storage API Key
1. Go to [NFT.Storage](https://nft.storage/)
2. Sign up with your email
3. Go to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

#### Alchemy API Key
1. Go to [Alchemy](https://www.alchemy.com/)
2. Sign up for a free account
3. Create a new app for Polygon Mumbai
4. Copy the API key to your `.env` file

#### Private Key
1. Open MetaMask
2. Go to Account Details → Export Private Key
3. Copy the private key (without 0x prefix)
4. **⚠️ Never share this key or commit it to version control**

#### PolygonScan API Key
1. Go to [PolygonScan](https://polygonscan.com/)
2. Sign up for an account
3. Go to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

### Step 5: Deploy Smart Contracts

```bash
# Navigate to contracts directory
cd contracts

# Compile contracts
npm run compile

# Deploy to Mumbai testnet
npm run deploy:mumbai
```

After deployment, you'll see output like:
```
✅ Contract deployed successfully!
📍 Contract address: 0x1234567890abcdef...
```

Copy the contract address and add it to your `.env` file:
```env
CONTRACT_ADDRESS_MUMBAI=0x1234567890abcdef...
```

### Step 6: Start the Backend API

```bash
# From the root directory
npm run dev:backend
```

The backend will start on `http://localhost:3001`

### Step 7: Start the Web Signer

```bash
# In a new terminal window
npm run dev:web-signer
```

The web signer will start on `http://localhost:3000`

### Step 8: Build the Figma Plugin

```bash
# In a new terminal window
npm run build:figma
```

### Step 9: Load Plugin in Figma

1. Open Figma Desktop App
2. Go to **Plugins** → **Development** → **Import plugin from manifest**
3. Navigate to the `figma-plugin` folder
4. Select `manifest.json`
5. Click **Open**

The plugin will now appear in your plugins list.

### Step 10: Test the Complete Flow

1. **Open Web Signer**: Go to `http://localhost:3000`
2. **Connect MetaMask**: Click "Connect MetaMask"
3. **Switch to Mumbai**: Ensure you're on Polygon Mumbai testnet
4. **Get Test MATIC**: Use a faucet to get test MATIC tokens
5. **Test in Figma**: Create some art and test the plugin

## 🔧 Development Commands

### Daily Development

```bash
# Start backend (Terminal 1)
npm run dev:backend

# Start web signer (Terminal 2)
npm run dev:web-signer

# Build figma plugin (Terminal 3)
npm run dev:figma
```

### Building for Production

```bash
# Build all projects
npm run build:all

# Test contracts
npm run test:contracts
```

### Troubleshooting

```bash
# Clean all build artifacts
npm run clean

# Reinstall dependencies
npm run install:all

# Check TypeScript
npm run type-check
```

## 🧪 Testing Your Setup

### 1. Test Backend API

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Test Web Signer

1. Open `http://localhost:3000`
2. Click "Connect MetaMask"
3. Verify connection status

### 3. Test Figma Plugin

1. Open Figma
2. Create a simple design
3. Run the NFT Designer plugin
4. Try exporting your design

### 4. Test Smart Contracts

```bash
cd contracts
npm run test
```

## 🚨 Common Issues & Solutions

### Issue: "Module not found" errors
**Solution**: Run `npm run install:all` to ensure all dependencies are installed

### Issue: "Contract deployment failed"
**Solution**: 
1. Check your private key in `.env`
2. Ensure you have test MATIC in your wallet
3. Verify your Alchemy API key

### Issue: "MetaMask connection failed"
**Solution**:
1. Ensure MetaMask is installed and unlocked
2. Check that you're on the correct network
3. Try refreshing the web signer page

### Issue: "IPFS upload failed"
**Solution**:
1. Verify your NFT.Storage API key
2. Check your internet connection
3. Ensure the image size is within limits

### Issue: "AI enhancement failed"
**Solution**:
1. Verify your OpenAI API key
2. Check your OpenAI account has credits
3. Ensure the API key has the correct permissions

## 📱 Mobile Testing

For mobile testing of the web signer:

1. Find your computer's IP address: `ifconfig | grep inet`
2. Update the web signer URL in your mobile browser
3. Connect MetaMask mobile app

## 🔄 Updates and Maintenance

### Updating Dependencies

```bash
# Update all dependencies
npm update

# Update specific workspace
cd figma-plugin && npm update
```

### Updating Smart Contracts

```bash
cd contracts
npm run compile
npm run deploy:mumbai
```

### Updating Environment Variables

Always update your `.env` file when:
- API keys expire
- Contract addresses change
- New services are added

## 📞 Getting Help

If you encounter issues:

1. **Check the logs**: Look at terminal output for error messages
2. **Verify configuration**: Ensure all API keys are correct
3. **Test components**: Test each component individually
4. **Check documentation**: Refer to the main README.md
5. **GitHub Issues**: Create an issue on GitHub

## 🎉 Success!

Once everything is set up, you should be able to:

- ✅ Export art from Figma
- ✅ Generate AI-enhanced metadata
- ✅ Upload to IPFS
- ✅ Mint NFTs on Polygon Mumbai
- ✅ View transactions on PolygonScan

Congratulations! You now have a complete NFT Designer Plugin setup running on your Mac OS Intel system.
