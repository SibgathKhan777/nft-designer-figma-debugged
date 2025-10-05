# 🎨 NFT Designer Plugin for Figma

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Polygon](https://img.shields.io/badge/Polygon-8247E5?logo=polygon&logoColor=white)](https://polygon.technology/)

> **Transform your Figma designs into blockchain NFTs with AI-enhanced metadata, IPFS storage, and Polygon minting - all in one seamless workflow!**

## 🚀 Live Demo

[![Demo Video](https://img.youtube.com/vi/demo/0.jpg)](https://youtube.com/watch?v=demo)

**Try it now**: Load the plugin in Figma and start creating NFTs!

## 🚀 Features

- **Figma Integration**: Export selected art as PNG/SVG directly from Figma
- **AI Enhancement**: Generate enhanced metadata using OpenAI or similar AI models
- **IPFS Storage**: Upload images and metadata to IPFS using NFT.Storage
- **Blockchain Minting**: Mint ERC-721 tokens on Polygon Mumbai testnet
- **MetaMask Integration**: Web signer for user-signed transactions
- **Batch Processing**: Support for multiple NFT minting
- **Custom Attributes**: Add custom traits and properties
- **Analytics**: Track minting statistics and performance

## 📁 Project Structure

```
nft-designer-figma/
├── figma-plugin/           # Figma plugin (React + TypeScript)
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── types/          # TypeScript types
│   │   ├── styles/         # CSS styles
│   │   └── code.ts         # Figma plugin code
│   ├── public/             # Static assets
│   ├── manifest.json       # Figma plugin manifest
│   └── package.json
├── backend/                # Node.js + Express API
│   ├── src/
│   │   ├── controllers/   # API controllers
│   │   ├── services/       # Business logic
│   │   ├── middleware/       # Express middleware
│   │   └── types/          # TypeScript types
│   └── package.json
├── contracts/              # Hardhat + Solidity smart contracts
│   ├── contracts/          # Solidity contracts
│   ├── scripts/            # Deployment scripts
│   ├── test/               # Contract tests
│   └── package.json
├── web-signer/            # MetaMask integration web page
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
│   └── package.json
├── shared/                # Shared types and utilities
│   ├── src/
│   │   ├── types/          # Shared TypeScript types
│   │   ├── constants/      # Application constants
│   │   └── utils/          # Utility functions
│   └── package.json
└── package.json           # Root package.json with workspaces
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 16+ and npm 8+
- Figma Desktop App
- MetaMask browser extension
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/nft-designer/figma-plugin.git
cd nft-designer-figma
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm run install:all

# Or install individually
npm run install:figma
npm run install:backend
npm run install:contracts
npm run install:web-signer
npm run install:shared
```

### 3. Environment Configuration

```bash
# Copy environment template
cp env.example .env

# Edit .env with your configuration
nano .env
```

### 4. Required API Keys

You'll need to obtain the following API keys:

- **OpenAI API Key**: For AI metadata enhancement
- **NFT.Storage API Key**: For IPFS storage
- **Alchemy API Key**: For Polygon RPC access
- **PolygonScan API Key**: For contract verification

## 🚀 Quick Start

### 1. Start the Backend API

```bash
npm run dev:backend
```

The backend will run on `http://localhost:3001`

### 2. Start the Web Signer

```bash
npm run dev:web-signer
```

The web signer will run on `http://localhost:3000`

### 3. Build the Figma Plugin

```bash
npm run build:figma
```

### 4. Deploy Smart Contracts

```bash
# Deploy to Mumbai testnet
npm run deploy:contracts
```

### 5. Load Plugin in Figma

1. Open Figma Desktop App
2. Go to Plugins → Development → Import plugin from manifest
3. Select the `figma-plugin/manifest.json` file
4. The plugin will appear in your plugins list

## 🔧 Development

### Available Scripts

```bash
# Install all dependencies
npm run install:all

# Build all projects
npm run build:all

# Development servers
npm run dev:backend      # Backend API
npm run dev:web-signer   # Web signer
npm run dev:figma        # Figma plugin (watch mode)

# Testing
npm run test:contracts   # Smart contract tests

# Deployment
npm run deploy:contracts # Deploy contracts to Mumbai

# Type checking
npm run type-check       # Check all TypeScript

# Clean up
npm run clean            # Remove all build artifacts
```

### Development Workflow

1. **Backend Development**: Start with `npm run dev:backend`
2. **Web Signer Development**: Start with `npm run dev:web-signer`
3. **Figma Plugin Development**: Use `npm run dev:figma` for watch mode
4. **Contract Development**: Use `npm run test:contracts` for testing

## 📚 Usage Guide

### 1. Using the Figma Plugin

1. **Select Art**: In Figma, select the art/design you want to turn into an NFT
2. **Open Plugin**: Run the NFT Designer plugin
3. **Export**: Click "Export Selection" to process your art
4. **Fill Details**: Enter NFT name, description, and attributes
5. **Mint**: Click "Mint NFT" to create your NFT

### 2. Using the Web Signer

1. **Connect MetaMask**: Open the web signer and connect your wallet
2. **Switch Network**: Ensure you're on Polygon Mumbai testnet
3. **Sign Transactions**: Use the signer to authorize NFT minting

### 3. Backend API Endpoints

- `POST /api/mint-nft` - Mint a new NFT
- `GET /api/collections` - Get user collections
- `GET /api/analytics` - Get minting analytics
- `GET /health` - Health check

## 🔐 Security Considerations

- **Private Keys**: Never commit private keys to version control
- **API Keys**: Store sensitive keys in environment variables
- **Network Security**: Use HTTPS in production
- **Rate Limiting**: Implement rate limiting for API endpoints
- **Input Validation**: Validate all user inputs

## 🧪 Testing

### Smart Contract Testing

```bash
cd contracts
npm run test
```

### Backend Testing

```bash
cd backend
npm test
```

### End-to-End Testing

1. Deploy contracts to Mumbai testnet
2. Start backend and web signer
3. Load plugin in Figma
4. Test complete NFT minting flow

## 📦 Deployment

### 1. Smart Contract Deployment

```bash
# Deploy to Mumbai testnet
npm run deploy:contracts

# Deploy to Polygon mainnet (production)
cd contracts
npm run deploy:polygon
```

### 2. Backend Deployment

```bash
# Build backend
npm run build:backend

# Deploy to your hosting service
# Update CONTRACT_ADDRESS in environment variables
```

### 3. Figma Plugin Distribution

1. Build the plugin: `npm run build:figma`
2. Package the `dist/` folder
3. Submit to Figma Community or distribute privately

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [https://docs.nft-designer.com](https://docs.nft-designer.com)
- **Issues**: [GitHub Issues](https://github.com/nft-designer/figma-plugin/issues)
- **Discord**: [NFT Designer Community](https://discord.gg/nft-designer)
- **Email**: support@nft-designer.com

## 🙏 Acknowledgments

- Figma for the amazing design platform
- Polygon for the fast and cheap blockchain
- OpenZeppelin for secure smart contract libraries
- NFT.Storage for decentralized storage
- OpenAI for AI capabilities

## 📈 Roadmap

- [ ] Support for more blockchain networks
- [ ] Advanced AI metadata generation
- [ ] Batch minting improvements
- [ ] Analytics dashboard
- [ ] Mobile app companion
- [ ] Integration with more design tools

---

**Made with ❤️ by the NFT Designer Team**
