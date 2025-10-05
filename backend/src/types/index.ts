export interface MintingRequest {
  exportedData: Array<{
    id: string;
    name: string;
    pngData: number[];
    svgData: number[];
    width: number;
    height: number;
  }>;
  metadata: {
    name: string;
    description: string;
    collection?: string;
    attributes: Array<{
      trait_type: string;
      value: string;
    }>;
    aiDescription: boolean;
    network?: string;
  };
  walletAddress?: string;
}

export interface MintingResponse {
  tokenId: string;
  transactionHash: string;
  ipfsHash: string;
  metadataUri: string;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface BlockchainConfig {
  rpcUrl: string;
  privateKey: string;
  contractAddress: string;
}

export interface IPFSConfig {
  apiKey: string;
}

export interface AIConfig {
  apiKey: string;
  model: string;
}
