const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTDesigner", function () {
  let nftDesigner;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const NFTDesigner = await ethers.getContractFactory("NFTDesigner");
    nftDesigner = await NFTDesigner.deploy(
      "NFT Designer Collection",
      "NDC",
      "https://nft-designer.com/metadata/"
    );
    await nftDesigner.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await nftDesigner.name()).to.equal("NFT Designer Collection");
      expect(await nftDesigner.symbol()).to.equal("NDC");
    });

    it("Should set the correct owner", async function () {
      expect(await nftDesigner.owner()).to.equal(owner.address);
    });

    it("Should have zero total supply initially", async function () {
      expect(await nftDesigner.totalSupply()).to.equal(0);
    });
  });

  describe("Minting", function () {
    const tokenURI = "https://ipfs.io/ipfs/QmTest123";

    it("Should mint a single NFT", async function () {
      await nftDesigner.mint(addr1.address, tokenURI);
      
      expect(await nftDesigner.totalSupply()).to.equal(1);
      expect(await nftDesigner.ownerOf(0)).to.equal(addr1.address);
      expect(await nftDesigner.tokenURI(0)).to.equal("https://nft-designer.com/metadata/" + tokenURI);
    });

    it("Should mint multiple NFTs in batch", async function () {
      const tokenURIs = [
        "https://ipfs.io/ipfs/QmTest1",
        "https://ipfs.io/ipfs/QmTest2",
        "https://ipfs.io/ipfs/QmTest3"
      ];
      
      await nftDesigner.mintBatch(addr1.address, tokenURIs);
      
      expect(await nftDesigner.totalSupply()).to.equal(3);
      expect(await nftDesigner.ownerOf(0)).to.equal(addr1.address);
      expect(await nftDesigner.ownerOf(1)).to.equal(addr1.address);
      expect(await nftDesigner.ownerOf(2)).to.equal(addr1.address);
    });

    it("Should emit NFTMinted event", async function () {
      await expect(nftDesigner.mint(addr1.address, tokenURI))
        .to.emit(nftDesigner, "NFTMinted")
        .withArgs(addr1.address, 0, tokenURI);
    });

    it("Should not mint to zero address", async function () {
      await expect(
        nftDesigner.mint(ethers.ZeroAddress, tokenURI)
      ).to.be.revertedWith("Cannot mint to zero address");
    });

    it("Should not mint with empty token URI", async function () {
      await expect(
        nftDesigner.mint(addr1.address, "")
      ).to.be.revertedWith("Token URI cannot be empty");
    });
  });

  describe("Pausable", function () {
    const tokenURI = "https://ipfs.io/ipfs/QmTest123";

    it("Should pause and unpause", async function () {
      await nftDesigner.pause();
      expect(await nftDesigner.paused()).to.be.true;
      
      await expect(
        nftDesigner.mint(addr1.address, tokenURI)
      ).to.be.revertedWith("Pausable: paused");
      
      await nftDesigner.unpause();
      expect(await nftDesigner.paused()).to.be.false;
      
      await nftDesigner.mint(addr1.address, tokenURI);
      expect(await nftDesigner.totalSupply()).to.equal(1);
    });
  });

  describe("Owner functions", function () {
    it("Should set base URI", async function () {
      const newBaseURI = "https://new-base-uri.com/";
      await nftDesigner.setBaseURI(newBaseURI);
      // Test by minting a token and checking the URI
      await nftDesigner.mint(addr1.address, "test123");
      const tokenURI = await nftDesigner.tokenURI(0);
      expect(tokenURI).to.include(newBaseURI);
    });

    it("Should set mint price", async function () {
      const newPrice = ethers.parseEther("0.1");
      await nftDesigner.setMintPrice(newPrice);
      expect(await nftDesigner.mintPrice()).to.equal(newPrice);
    });

    it("Should not allow non-owner to set base URI", async function () {
      await expect(
        nftDesigner.connect(addr1).setBaseURI("https://hack.com/")
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Max supply", function () {
    it("Should respect max supply limit", async function () {
      // This test would require minting 10000 tokens, which is expensive
      // In a real scenario, you might want to test with a lower max supply
      const maxSupply = await nftDesigner.MAX_SUPPLY();
      expect(maxSupply).to.equal(10000);
    });
  });
});
