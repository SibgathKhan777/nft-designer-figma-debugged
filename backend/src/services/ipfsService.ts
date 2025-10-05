import { NFTStorage, File } from 'nft.storage';

let nftStorage: NFTStorage | null = null;

function getNFTStorage(): NFTStorage {
  if (!nftStorage) {
    const apiKey = process.env.NFT_STORAGE_API_KEY;
    if (!apiKey) {
      throw new Error('NFT_STORAGE_API_KEY environment variable is required');
    }
    nftStorage = new NFTStorage({ token: apiKey });
  }
  return nftStorage;
}

export async function uploadToIPFS(data: Buffer, filename: string): Promise<string> {
  try {
    console.log(`📤 Uploading ${filename} to IPFS...`);
    
    const storage = getNFTStorage();
    
    // Create a File object from the buffer
    const file = new File([data], filename, {
      type: filename.endsWith('.png') ? 'image/png' : 'application/json'
    });
    
    // Upload to IPFS
    const cid = await storage.storeBlob(file);
    
    console.log(`✅ Uploaded ${filename} to IPFS: ${cid}`);
    return cid;
    
  } catch (error) {
    console.error(`❌ Failed to upload ${filename} to IPFS:`, error);
    throw new Error(`IPFS upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function uploadMetadataToIPFS(metadata: any): Promise<string> {
  try {
    console.log('📤 Uploading metadata to IPFS...');
    
    const storage = getNFTStorage();
    
    // Create metadata file
    const metadataFile = new File(
      [JSON.stringify(metadata, null, 2)],
      'metadata.json',
      { type: 'application/json' }
    );
    
    // Upload to IPFS
    const cid = await storage.storeBlob(metadataFile);
    
    console.log(`✅ Metadata uploaded to IPFS: ${cid}`);
    return cid;
    
  } catch (error) {
    console.error('❌ Failed to upload metadata to IPFS:', error);
    throw new Error(`Metadata upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function uploadImageToIPFS(imageBuffer: Buffer, filename: string): Promise<string> {
  try {
    console.log(`📤 Uploading image ${filename} to IPFS...`);
    
    const storage = getNFTStorage();
    
    // Create image file
    const imageFile = new File([imageBuffer], filename, {
      type: 'image/png'
    });
    
    // Upload to IPFS
    const cid = await storage.storeBlob(imageFile);
    
    console.log(`✅ Image uploaded to IPFS: ${cid}`);
    return cid;
    
  } catch (error) {
    console.error(`❌ Failed to upload image to IPFS:`, error);
    throw new Error(`Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
