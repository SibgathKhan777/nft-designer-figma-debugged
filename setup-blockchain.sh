#!/bin/bash

echo "🚀 NFT Designer Blockchain Setup"
echo "================================="
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created"
else
    echo "📝 .env file already exists"
fi

echo ""
echo "🔧 Required Configuration:"
echo "=========================="
echo ""
echo "1. 🔑 PRIVATE_KEY (Required)"
echo "   - Export from MetaMask or create new wallet"
echo "   - Remove 0x prefix"
echo "   - Example: abc123def456..."
echo ""

echo "2. 🌐 POLYGON_MUMBAI_RPC_URL (Required)"
echo "   - Get free Alchemy URL: https://www.alchemy.com/"
echo "   - Select Polygon Mumbai network"
echo "   - Example: https://polygon-mumbai.g.alchemy.com/v2/your-key"
echo ""

echo "3. 📁 NFT_STORAGE_API_KEY (Optional - for IPFS)"
echo "   - Get free at: https://nft.storage/"
echo "   - Sign up with GitHub/Email"
echo ""

echo "4. 🤖 OPENAI_API_KEY (Optional - for AI enhancement)"
echo "   - Get at: https://platform.openai.com/"
echo "   - Requires billing setup"
echo ""

echo "📋 Next Steps:"
echo "=============="
echo "1. Edit .env file with your credentials"
echo "2. Run: cd contracts && npx hardhat run scripts/deploy.js --network mumbai"
echo "3. Copy contract address to CONTRACT_ADDRESS_MUMBAI in .env"
echo "4. Test minting in Figma plugin!"
echo ""

echo "💡 Quick Test (Minimal Setup):"
echo "==============================="
echo "1. Add PRIVATE_KEY to .env"
echo "2. Add POLYGON_MUMBAI_RPC_URL to .env"
echo "3. Set MOCK_IPFS=true and MOCK_AI=true for free testing"
echo "4. Deploy contract and test!"
echo ""

echo "📖 Full setup guide: BLOCKCHAIN_SETUP.md"
echo ""
echo "🎉 Ready to configure! Edit .env file with your credentials."
