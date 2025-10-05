# 🔗 MetaMask Setup for Local Blockchain

## 📋 Quick Setup Steps

### 1. 🏠 Add Local Network to MetaMask

1. **Open MetaMask** and click the network dropdown (top of extension)
2. **Click "Add network"** → "Add network manually"
3. **Fill in these details:**
   - **Network Name**: `NFT Designer Local`
   - **RPC URL**: `http://localhost:8545`
   - **Chain ID**: `31337`
   - **Currency Symbol**: `ETH`
   - **Block Explorer**: Leave empty

### 2. 🔑 Import Your Wallet

1. **Copy your private key**: `f667d6816b3a806d00b2c62729f7031552e9d8528e803780335d0658b47b1c23`
2. **In MetaMask**: Click account icon → "Import Account"
3. **Paste private key** and import
4. **Your wallet address**: `0x8280F650A613f9c4F939d01FA4bcea6F780E1473`

### 3. 💰 Get Test ETH

The local Hardhat network gives you **10,000 ETH** automatically! Your wallet should show a balance.

### 4. 🎯 Test NFT Minting

1. **Open your Figma plugin**
2. **Select a frame** and click "Select Frame from Canvas"
3. **Fill in the form**:
   - Title: "My Test NFT"
   - Description: "Testing real blockchain minting"
   - Network: "polygon-mumbai" (the plugin will use local network)
   - Wallet: Your address will auto-fill
4. **Click "Mint NFT"**
5. **Check MetaMask** - you should see the NFT!

## 🎉 What Happens

- ✅ **Real blockchain transaction** (local network)
- ✅ **Real gas fees** (free on local network)
- ✅ **Real NFT in your wallet**
- ✅ **Mock IPFS storage** (for testing)
- ✅ **Mock AI enhancement** (for testing)

## 🔍 View Your NFT

1. **In MetaMask**: Go to "NFTs" tab
2. **You should see your NFT** with the image and metadata
3. **Click on it** to view details

## 🚨 Troubleshooting

- **"Insufficient funds"**: The local network gives you free ETH automatically
- **"Network error"**: Make sure the Hardhat node is running
- **"Contract not found"**: The contract is deployed automatically to address `0x5FbDB2315678afecb367f032d93F642f64180aa3`

## 🎯 Next Steps

Once this works, we can:
1. **Deploy to real Mumbai testnet** (with real MATIC)
2. **Set up real IPFS storage**
3. **Enable AI metadata enhancement**

**Ready to test? Let's mint your first real NFT!** 🚀
