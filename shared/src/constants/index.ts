// Network Constants
export const NETWORKS = {
  MUMBAI: {
    name: 'Polygon Mumbai',
    chainId: 80001,
    hexChainId: '0x13881',
    rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/your-alchemy-key',
    explorerUrl: 'https://mumbai.polygonscan.com',
    currency: 'MATIC',
    faucets: [
      'https://faucet.polygon.technology/',
      'https://mumbaifaucet.com/',
      'https://faucets.chain.link/mumbai'
    ]
  },
  POLYGON: {
    name: 'Polygon Mainnet',
    chainId: 137,
    hexChainId: '0x89',
    rpcUrl: 'https://polygon-mainnet.g.alchemy.com/v2/your-alchemy-key',
    explorerUrl: 'https://polygonscan.com',
    currency: 'MATIC'
  },
  ETHEREUM: {
    name: 'Ethereum Mainnet',
    chainId: 1,
    hexChainId: '0x1',
    rpcUrl: 'https://mainnet.infura.io/v3/your-project-id',
    explorerUrl: 'https://etherscan.io',
    currency: 'ETH'
  }
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  MINT_NFT: '/api/mint-nft',
  GET_COLLECTIONS: '/api/collections',
  GET_ANALYTICS: '/api/analytics',
  HEALTH_CHECK: '/health'
} as const;

// File Formats
export const SUPPORTED_FORMATS = {
  IMAGE: ['PNG', 'SVG', 'JPG', 'WEBP'] as const,
  METADATA: ['JSON'] as const
} as const;

// Image Processing
export const IMAGE_CONFIG = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_DIMENSION: 4096,
  OPTIMIZED_SIZE: 1000,
  QUALITY: 90
} as const;

// Gas Limits
export const GAS_LIMITS = {
  MINT_NFT: 500000,
  BATCH_MINT: 1000000,
  TRANSFER: 100000
} as const;

// Error Codes
export const ERROR_CODES = {
  // Network Errors
  NETWORK_NOT_SUPPORTED: 'NETWORK_NOT_SUPPORTED',
  NETWORK_SWITCH_FAILED: 'NETWORK_SWITCH_FAILED',
  RPC_ERROR: 'RPC_ERROR',
  
  // Wallet Errors
  WALLET_NOT_CONNECTED: 'WALLET_NOT_CONNECTED',
  WALLET_REJECTED: 'WALLET_REJECTED',
  INSUFFICIENT_FUNDS: 'INSUFFICIENT_FUNDS',
  
  // Minting Errors
  MINTING_FAILED: 'MINTING_FAILED',
  TRANSACTION_FAILED: 'TRANSACTION_FAILED',
  CONTRACT_ERROR: 'CONTRACT_ERROR',
  
  // IPFS Errors
  IPFS_UPLOAD_FAILED: 'IPFS_UPLOAD_FAILED',
  IPFS_PIN_FAILED: 'IPFS_PIN_FAILED',
  
  // AI Errors
  AI_ENHANCEMENT_FAILED: 'AI_ENHANCEMENT_FAILED',
  AI_API_ERROR: 'AI_API_ERROR',
  
  // Validation Errors
  INVALID_METADATA: 'INVALID_METADATA',
  INVALID_IMAGE: 'INVALID_IMAGE',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD'
} as const;

// Default Values
export const DEFAULTS = {
  NETWORK: 'mumbai',
  COLLECTION_NAME: 'NFT Designer Collection',
  DESCRIPTION: 'Created with NFT Designer Figma Plugin',
  IMAGE_QUALITY: 90,
  BATCH_SIZE: 10,
  TIMEOUT: 30000 // 30 seconds
} as const;

// Feature Flags
export const FEATURES = {
  AI_ENHANCEMENT: true,
  BATCH_MINTING: true,
  CUSTOM_ATTRIBUTES: true,
  ANALYTICS: true,
  COLLECTIONS: true
} as const;

// Metadata Templates
export const METADATA_TEMPLATES = {
  BASIC: {
    name: '',
    description: '',
    image: '',
    attributes: []
  },
  ART: {
    name: '',
    description: '',
    image: '',
    attributes: [
      { trait_type: 'Style', value: 'Digital Art' },
      { trait_type: 'Medium', value: 'Figma' },
      { trait_type: 'Creator', value: 'NFT Designer' }
    ]
  },
  COLLECTIBLE: {
    name: '',
    description: '',
    image: '',
    attributes: [
      { trait_type: 'Rarity', value: 'Common' },
      { trait_type: 'Category', value: 'Art' },
      { trait_type: 'Edition', value: 1 }
    ]
  }
} as const;

// UI Constants
export const UI = {
  PLUGIN_WIDTH: 400,
  PLUGIN_HEIGHT: 600,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'nft-designer-preferences',
  RECENT_COLLECTIONS: 'nft-designer-recent-collections',
  CACHED_METADATA: 'nft-designer-cached-metadata'
} as const;
