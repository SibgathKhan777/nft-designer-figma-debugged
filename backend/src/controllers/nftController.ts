import { Router } from 'express';
import { mintNFT } from '../services/nftService';
import { mockMintNFT } from '../services/mockNftService';
import { validateMintRequest } from '../middleware/validation';
import { MintingRequest, MintingResponse } from '../types';

const router = Router();

// POST /api/mint-nft (Design2NFT style)
router.post('/mint-nft', async (req, res) => {
  try {
    const { title, description, network, wallet, frame } = req.body;
    
    console.log('🚀 Starting NFT minting process...');
    console.log(`📊 Processing NFT: ${title}`);
    console.log(`🌐 Network: ${network}`);
    console.log(`👤 Wallet: ${wallet}`);
    
    // Validate required fields
    if (!title || !description || !network || !wallet || !frame) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, description, network, wallet, or frame data'
      });
    }

    // Create minting request in the expected format
    const mintingRequest: MintingRequest = {
      exportedData: [{
        id: frame.id,
        name: frame.name,
        pngData: frame.pngData,
        svgData: frame.svgData,
        width: frame.width,
        height: frame.height
      }],
      metadata: {
        name: title,
        description: description,
        attributes: [],
        aiDescription: false, // We'll determine this based on the request
        network: network
      },
      walletAddress: wallet
    };
    
    // Use real service for production (set MOCK_MINTING=false in .env to enable)
    const useMock = process.env.MOCK_MINTING === 'true';
    console.log(`Using ${useMock ? 'MOCK' : 'REAL'} NFT service...`);
    const result: MintingResponse = useMock 
      ? await mockMintNFT(mintingRequest)
      : await mintNFT(mintingRequest);
    
    console.log('✅ NFT minted successfully:', result);
    
    res.json({
      success: true,
      data: result,
      message: 'NFT minted successfully'
    });
    
  } catch (error) {
    console.error('❌ NFT minting failed:', error);
    
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      message: 'Failed to mint NFT'
    });
  }
});

// POST /api/mint-nft-legacy (Original format)
router.post('/mint-nft-legacy', validateMintRequest, async (req, res) => {
  try {
    const mintingRequest: MintingRequest = req.body;
    
    console.log('🚀 Starting NFT minting process...');
    console.log(`📊 Processing ${mintingRequest.exportedData.length} exported items`);
    
    const result: MintingResponse = await mintNFT(mintingRequest);
    
    console.log('✅ NFT minted successfully:', result);
    
    res.json({
      success: true,
      data: result,
      message: 'NFT minted successfully'
    });
    
  } catch (error) {
    console.error('❌ NFT minting failed:', error);
    
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      message: 'Failed to mint NFT'
    });
  }
});

// GET /api/health
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'NFT Designer API',
    timestamp: new Date().toISOString()
  });
});

export { router as nftRoutes };
