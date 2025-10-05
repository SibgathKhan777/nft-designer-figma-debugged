import { ethers } from 'ethers';

// ERC-721 ABI (simplified for minting)
const ERC721_ABI = [
  "function mint(address to, string memory tokenURI) public returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function totalSupply() public view returns (uint256)"
];

export interface MintResult {
  tokenId: string;
  transactionHash: string;
}

export async function mintToken(
  name: string,
  tokenURI: string,
  recipientAddress?: string
): Promise<MintResult> {
  try {
    console.log('⛓️ Connecting to Polygon Mumbai...');
    
    // Validate environment variables
    const rpcUrl = process.env.POLYGON_RPC_URL;
    const privateKey = process.env.PRIVATE_KEY;
    const contractAddress = process.env.CONTRACT_ADDRESS;
    
    if (!rpcUrl || !privateKey || !contractAddress) {
      throw new Error('Missing blockchain configuration. Please check your environment variables.');
    }
    
    // Create provider and wallet
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    
    console.log(`👛 Wallet address: ${wallet.address}`);
    
    // Create contract instance
    const contract = new ethers.Contract(contractAddress, ERC721_ABI, wallet);
    
    // Determine recipient address
    const recipient = recipientAddress || wallet.address;
    console.log(`📝 Minting NFT to: ${recipient}`);
    
        // Mint the token with proper gas settings for local network
        const tx = await contract.mint(recipient, tokenURI, {
          gasLimit: 500000n, // Fixed gas limit for local network
          // Remove gasPrice and type for local network compatibility
        });
    
    console.log(`⏳ Transaction submitted: ${tx.hash}`);
    console.log('⏳ Waiting for confirmation...');
    
    // Wait for transaction confirmation
    const receipt = await tx.wait();
    
    if (!receipt) {
      throw new Error('Transaction failed - no receipt received');
    }
    
    // Get the token ID (assuming it's the latest token)
    const totalSupply = await contract.totalSupply();
    const tokenId = (totalSupply - 1n).toString();
    
    console.log(`✅ NFT minted successfully!`);
    console.log(`🆔 Token ID: ${tokenId}`);
    console.log(`🔗 Transaction: ${receipt.hash}`);
    
    return {
      tokenId,
      transactionHash: receipt.hash
    };
    
  } catch (error) {
    console.error('❌ Blockchain minting failed:', error);
    throw new Error(`Blockchain operation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getTokenURI(tokenId: string): Promise<string> {
  try {
    const rpcUrl = process.env.POLYGON_RPC_URL;
    const contractAddress = process.env.CONTRACT_ADDRESS;
    
    if (!rpcUrl || !contractAddress) {
      throw new Error('Missing blockchain configuration');
    }
    
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(contractAddress, ERC721_ABI, provider);
    
    const tokenURI = await contract.tokenURI(tokenId);
    return tokenURI;
    
  } catch (error) {
    console.error('Error getting token URI:', error);
    throw new Error(`Failed to get token URI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
