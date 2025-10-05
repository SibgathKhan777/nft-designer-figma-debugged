// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title NFTDesigner
 * @dev ERC721 token contract for NFT Designer Figma plugin
 * @author NFT Designer Team
 */
contract NFTDesigner is ERC721, ERC721URIStorage, Ownable, Pausable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // Base URI for metadata
    string private _baseTokenURI;
    
    // Maximum supply (optional)
    uint256 public constant MAX_SUPPLY = 10000;
    
    // Minting price (in wei)
    uint256 public mintPrice = 0;
    
    // Events
    event NFTMinted(address indexed to, uint256 indexed tokenId, string tokenURI);
    event BaseURIUpdated(string newBaseURI);
    event MintPriceUpdated(uint256 newMintPrice);
    
    constructor(
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) ERC721(name, symbol) {
        _baseTokenURI = baseTokenURI;
    }
    
    /**
     * @dev Mint a new NFT to the specified address
     * @param to The address to mint the NFT to
     * @param tokenURI The URI for the token metadata
     * @return tokenId The ID of the newly minted token
     */
    function mint(address to, string memory tokenURI) 
        public 
        whenNotPaused 
        returns (uint256) 
    {
        require(totalSupply() < MAX_SUPPLY, "Max supply reached");
        require(to != address(0), "Cannot mint to zero address");
        require(bytes(tokenURI).length > 0, "Token URI cannot be empty");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        emit NFTMinted(to, tokenId, tokenURI);
        
        return tokenId;
    }
    
    /**
     * @dev Mint multiple NFTs in a batch
     * @param to The address to mint the NFTs to
     * @param tokenURIs Array of URIs for the token metadata
     * @return tokenIds Array of IDs of the newly minted tokens
     */
    function mintBatch(address to, string[] memory tokenURIs) 
        public 
        whenNotPaused 
        returns (uint256[] memory) 
    {
        require(totalSupply() + tokenURIs.length <= MAX_SUPPLY, "Exceeds max supply");
        require(to != address(0), "Cannot mint to zero address");
        require(tokenURIs.length > 0, "Token URIs array cannot be empty");
        
        uint256[] memory tokenIds = new uint256[](tokenURIs.length);
        
        for (uint256 i = 0; i < tokenURIs.length; i++) {
            require(bytes(tokenURIs[i]).length > 0, "Token URI cannot be empty");
            
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            
            _safeMint(to, tokenId);
            _setTokenURI(tokenId, tokenURIs[i]);
            
            tokenIds[i] = tokenId;
            emit NFTMinted(to, tokenId, tokenURIs[i]);
        }
        
        return tokenIds;
    }
    
    /**
     * @dev Get the total number of tokens minted
     * @return The total supply
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
    
    /**
     * @dev Get the base URI for metadata
     * @return The base URI
     */
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    /**
     * @dev Set the base URI for metadata (only owner)
     * @param newBaseURI The new base URI
     */
    function setBaseURI(string memory newBaseURI) public onlyOwner {
        _baseTokenURI = newBaseURI;
        emit BaseURIUpdated(newBaseURI);
    }
    
    /**
     * @dev Set the minting price (only owner)
     * @param newMintPrice The new minting price in wei
     */
    function setMintPrice(uint256 newMintPrice) public onlyOwner {
        mintPrice = newMintPrice;
        emit MintPriceUpdated(newMintPrice);
    }
    
    /**
     * @dev Pause the contract (only owner)
     */
    function pause() public onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause the contract (only owner)
     */
    function unpause() public onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Withdraw contract balance (only owner)
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    /**
     * @dev Override required for multiple inheritance
     */
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    /**
     * @dev Override required for multiple inheritance
     */
    function tokenURI(uint256 tokenId) 
        public 
        view 
        override(ERC721, ERC721URIStorage) 
        returns (string memory) 
    {
        return super.tokenURI(tokenId);
    }
    
    /**
     * @dev Override required for multiple inheritance
     */
    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        override(ERC721, ERC721URIStorage) 
        returns (bool) 
    {
        return super.supportsInterface(interfaceId);
    }
    
    /**
     * @dev Override to add pausable functionality
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}
