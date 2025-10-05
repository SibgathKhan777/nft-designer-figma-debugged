// Core NFT Types
export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  background_color?: string;
  animation_url?: string;
  attributes: NFTAttribute[];
  collection?: string;
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
  display_type?: string;
  max_value?: number;
}

// Exported Art Types
export interface ExportedArt {
  id: string;
  name: string;
  pngData: number[];
  svgData: number[];
  width: number;
  height: number;
  format: 'PNG' | 'SVG';
  timestamp: number;
}

// Minting Types
export interface MintingRequest {
  exportedData: ExportedArt[];
  metadata: NFTMetadata;
  userAddress: string;
  collection?: string;
}

export interface MintingResponse {
  success: boolean;
  tokenId: string;
  transactionHash: string;
  ipfsHash: string;
  metadataUri: string;
  explorerUrl: string;
  error?: string;
}

// Blockchain Types
export interface BlockchainConfig {
  network: 'mumbai' | 'polygon' | 'ethereum';
  rpcUrl: string;
  chainId: number;
  contractAddress: string;
  explorerUrl: string;
}

export interface TransactionResult {
  hash: string;
  blockNumber: number;
  gasUsed: string;
  status: 'pending' | 'confirmed' | 'failed';
}

// API Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Plugin Types
export interface PluginMessage {
  type: 'export-selection' | 'export-success' | 'error' | 'close-plugin';
  data?: any;
  message?: string;
}

export interface PluginConfig {
  backendUrl: string;
  network: BlockchainConfig;
  features: {
    aiEnhancement: boolean;
    batchMinting: boolean;
    customAttributes: boolean;
  };
}

// User Types
export interface UserProfile {
  address: string;
  name?: string;
  email?: string;
  preferences: {
    defaultNetwork: string;
    autoApprove: boolean;
    notifications: boolean;
  };
}

// Collection Types
export interface NFTCollection {
  id: string;
  name: string;
  description: string;
  image: string;
  contractAddress: string;
  totalSupply: number;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

// Analytics Types
export interface MintingAnalytics {
  totalMinted: number;
  totalCollections: number;
  totalVolume: string;
  averageGasUsed: string;
  successRate: number;
  topCollections: Array<{
    collection: string;
    count: number;
  }>;
}

// Error Types
export interface NFTDesignerError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Event Types
export interface NFTMintingEvent {
  type: 'minting-started' | 'minting-progress' | 'minting-completed' | 'minting-failed';
  data: {
    tokenId?: string;
    transactionHash?: string;
    progress?: number;
    error?: string;
  };
  timestamp: string;
}

// Utility Types
export type NetworkType = 'testnet' | 'mainnet';
export type FileFormat = 'PNG' | 'SVG' | 'JPG' | 'WEBP';
export type MintingStatus = 'idle' | 'preparing' | 'uploading' | 'minting' | 'completed' | 'failed';

// Configuration Types
export interface AppConfig {
  version: string;
  environment: 'development' | 'staging' | 'production';
  features: {
    aiEnhancement: boolean;
    batchMinting: boolean;
    customAttributes: boolean;
    analytics: boolean;
  };
  networks: {
    [key: string]: BlockchainConfig;
  };
  services: {
    ipfs: {
      provider: 'nft.storage' | 'pinata' | 'infura';
      apiKey: string;
    };
    ai: {
      provider: 'openai' | 'anthropic';
      apiKey: string;
      model: string;
    };
  };
}
