import { NFTMetadata, NFTAttribute, ExportedArt } from '../types';
import { NETWORKS, IMAGE_CONFIG, ERROR_CODES } from '../constants';

// Validation Utilities
export function validateNFTMetadata(metadata: Partial<NFTMetadata>): string[] {
  const errors: string[] = [];
  
  if (!metadata.name || metadata.name.trim().length === 0) {
    errors.push('Name is required');
  }
  
  if (!metadata.description || metadata.description.trim().length === 0) {
    errors.push('Description is required');
  }
  
  if (!metadata.image || metadata.image.trim().length === 0) {
    errors.push('Image URL is required');
  }
  
  if (metadata.attributes && !Array.isArray(metadata.attributes)) {
    errors.push('Attributes must be an array');
  }
  
  return errors;
}

export function validateExportedArt(art: Partial<ExportedArt>): string[] {
  const errors: string[] = [];
  
  if (!art.id || art.id.trim().length === 0) {
    errors.push('Art ID is required');
  }
  
  if (!art.name || art.name.trim().length === 0) {
    errors.push('Art name is required');
  }
  
  if (!art.pngData || !Array.isArray(art.pngData) || art.pngData.length === 0) {
    errors.push('PNG data is required');
  }
  
  if (!art.width || art.width <= 0) {
    errors.push('Valid width is required');
  }
  
  if (!art.height || art.height <= 0) {
    errors.push('Valid height is required');
  }
  
  return errors;
}

// Network Utilities
export function getNetworkByChainId(chainId: number | string) {
  const id = typeof chainId === 'string' ? parseInt(chainId, 16) : chainId;
  
  for (const [key, network] of Object.entries(NETWORKS)) {
    if (network.chainId === id) {
      return { key, network };
    }
  }
  
  return null;
}

export function isTestnet(chainId: number | string): boolean {
  const id = typeof chainId === 'string' ? parseInt(chainId, 16) : chainId;
  return id === NETWORKS.MUMBAI.chainId;
}

export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Image Utilities
export function validateImageSize(data: number[], maxSize: number = IMAGE_CONFIG.MAX_SIZE): boolean {
  return data.length <= maxSize;
}

export function calculateImageDimensions(width: number, height: number, maxDimension: number = IMAGE_CONFIG.MAX_DIMENSION) {
  if (width <= maxDimension && height <= maxDimension) {
    return { width, height };
  }
  
  const ratio = Math.min(maxDimension / width, maxDimension / height);
  return {
    width: Math.floor(width * ratio),
    height: Math.floor(height * ratio)
  };
}

// Metadata Utilities
export function generateDefaultMetadata(name: string, description: string, imageUrl: string): NFTMetadata {
  return {
    name,
    description,
    image: imageUrl,
    attributes: [
      { trait_type: 'Creator', value: 'NFT Designer' },
      { trait_type: 'Platform', value: 'Figma' },
      { trait_type: 'Type', value: 'Digital Art' }
    ]
  };
}

export function mergeAttributes(existing: NFTAttribute[], newAttributes: NFTAttribute[]): NFTAttribute[] {
  const merged = [...existing];
  
  for (const newAttr of newAttributes) {
    const existingIndex = merged.findIndex(attr => attr.trait_type === newAttr.trait_type);
    if (existingIndex >= 0) {
      merged[existingIndex] = newAttr;
    } else {
      merged.push(newAttr);
    }
  }
  
  return merged;
}

export function validateAttributes(attributes: NFTAttribute[]): string[] {
  const errors: string[] = [];
  
  for (const attr of attributes) {
    if (!attr.trait_type || attr.trait_type.trim().length === 0) {
      errors.push('Attribute trait_type is required');
    }
    
    if (attr.value === undefined || attr.value === null || attr.value === '') {
      errors.push('Attribute value is required');
    }
  }
  
  return errors;
}

// String Utilities
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

export function sanitizeString(str: string): string {
  return str.replace(/[<>:"/\\|?*]/g, '').trim();
}

export function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// URL Utilities
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getExplorerUrl(transactionHash: string, network: string = 'mumbai'): string {
  const networkConfig = NETWORKS[network.toUpperCase() as keyof typeof NETWORKS];
  if (!networkConfig) return '';
  
  return `${networkConfig.explorerUrl}/tx/${transactionHash}`;
}

export function getTokenUrl(tokenId: string, contractAddress: string, network: string = 'mumbai'): string {
  const networkConfig = NETWORKS[network.toUpperCase() as keyof typeof NETWORKS];
  if (!networkConfig) return '';
  
  return `${networkConfig.explorerUrl}/token/${contractAddress}?a=${tokenId}`;
}

// Error Utilities
export function createError(code: string, message: string, details?: any) {
  return {
    code,
    message,
    details,
    timestamp: new Date().toISOString()
  };
}

export function isKnownError(error: any): boolean {
  return error && error.code && Object.values(ERROR_CODES).includes(error.code);
}

// Storage Utilities
export function saveToLocalStorage(key: string, data: any): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    }
    return defaultValue;
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return defaultValue;
  }
}

// Time Utilities
export function formatTimestamp(timestamp: number | string): string {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export function getRelativeTime(timestamp: number | string): string {
  const now = Date.now();
  const time = typeof timestamp === 'string' ? new Date(timestamp).getTime() : timestamp;
  const diff = now - time;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

// Array Utilities
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function groupBy<T, K extends string | number>(array: T[], key: (item: T) => K): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = key(item);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

// Promise Utilities
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Operation timed out')), ms)
    )
  ]);
}

// File Utilities
export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

export function isValidImageFormat(filename: string): boolean {
  const extension = getFileExtension(filename);
  return ['png', 'jpg', 'jpeg', 'svg', 'webp'].includes(extension);
}
