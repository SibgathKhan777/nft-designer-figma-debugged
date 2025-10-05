import React, { useState } from 'react';
import { NFTMetadata } from '../types';

interface NFTFormProps {
  onMint: (metadata: NFTMetadata) => void;
  isMinting: boolean;
}

export const NFTForm: React.FC<NFTFormProps> = ({ onMint, isMinting }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    collection: '',
    attributes: '',
    aiDescription: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const attributes = formData.attributes
      ? formData.attributes.split(',').map(attr => {
          const [trait_type, value] = attr.split(':').map(s => s.trim());
          return { trait_type, value };
        })
      : [];

    const metadata: NFTMetadata = {
      name: formData.name,
      description: formData.description,
      collection: formData.collection,
      attributes,
      aiDescription: formData.aiDescription
    };

    onMint(metadata);
  };

  return (
    <form className="nft-form" onSubmit={handleSubmit}>
      <h3>NFT Details</h3>
      
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="My Awesome NFT"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Describe your NFT..."
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="collection">Collection</label>
        <input
          type="text"
          id="collection"
          name="collection"
          value={formData.collection}
          onChange={handleChange}
          placeholder="My Collection"
        />
      </div>

      <div className="form-group">
        <label htmlFor="attributes">Attributes (comma-separated)</label>
        <input
          type="text"
          id="attributes"
          name="attributes"
          value={formData.attributes}
          onChange={handleChange}
          placeholder="Color: Blue, Style: Abstract, Rarity: Rare"
        />
        <small>Format: "Trait: Value, Trait: Value"</small>
      </div>

      <div className="form-group checkbox">
        <label>
          <input
            type="checkbox"
            name="aiDescription"
            checked={formData.aiDescription}
            onChange={handleChange}
          />
          Use AI to enhance description
        </label>
      </div>

      <button 
        type="submit" 
        className="mint-btn"
        disabled={isMinting || !formData.name || !formData.description}
      >
        {isMinting ? 'Minting NFT...' : 'Mint NFT'}
      </button>
    </form>
  );
};
