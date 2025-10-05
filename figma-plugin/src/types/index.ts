export interface NFTMetadata {
  name: string;
  description: string;
  collection?: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  aiDescription: boolean;
}

export interface ExportedArt {
  id: string;
  name: string;
  pngData: number[];
  svgData: number[];
  width: number;
  height: number;
}

export interface MintingRequest {
  exportedData: ExportedArt[];
  metadata: NFTMetadata;
}

export interface MintingResponse {
  tokenId: string;
  transactionHash: string;
  ipfsHash: string;
  metadataUri: string;
}
