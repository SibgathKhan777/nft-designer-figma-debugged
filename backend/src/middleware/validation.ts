import { Request, Response, NextFunction } from 'express';

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
  };
}

export function validateMintRequest(req: Request, res: Response, next: NextFunction) {
  try {
    const { exportedData, metadata } = req.body;
    
    // Validate exported data
    if (!exportedData || !Array.isArray(exportedData) || exportedData.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Exported data is required and must be a non-empty array'
      });
    }
    
    // Validate each exported item
    for (const item of exportedData) {
      if (!item.id || !item.name || !item.pngData || !Array.isArray(item.pngData)) {
        return res.status(400).json({
          success: false,
          error: 'Each exported item must have id, name, and pngData array'
        });
      }
    }
    
    // Validate metadata
    if (!metadata) {
      return res.status(400).json({
        success: false,
        error: 'Metadata is required'
      });
    }
    
    if (!metadata.name || typeof metadata.name !== 'string' || metadata.name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Metadata name is required and must be a non-empty string'
      });
    }
    
    if (!metadata.description || typeof metadata.description !== 'string' || metadata.description.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Metadata description is required and must be a non-empty string'
      });
    }
    
    // Validate attributes if provided
    if (metadata.attributes && !Array.isArray(metadata.attributes)) {
      return res.status(400).json({
        success: false,
        error: 'Metadata attributes must be an array'
      });
    }
    
    // Validate each attribute
    if (metadata.attributes) {
      for (const attr of metadata.attributes) {
        if (!attr.trait_type || !attr.value) {
          return res.status(400).json({
            success: false,
            error: 'Each attribute must have trait_type and value'
          });
        }
      }
    }
    
    // Add validated data to request
    req.body = {
      exportedData,
      metadata: {
        ...metadata,
        name: metadata.name.trim(),
        description: metadata.description.trim(),
        collection: metadata.collection?.trim(),
        attributes: metadata.attributes || []
      }
    };
    
    next();
    
  } catch (error) {
    console.error('Validation error:', error);
    return res.status(400).json({
      success: false,
      error: 'Invalid request format'
    });
  }
}
