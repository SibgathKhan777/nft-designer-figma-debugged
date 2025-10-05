const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting NFT Designer contract deployment...");
  
  // Get the contract factory
  const NFTDesigner = await ethers.getContractFactory("NFTDesigner");
  
  // Contract parameters
  const name = "NFT Designer Collection";
  const symbol = "NDC";
  const baseTokenURI = "https://nft-designer.com/metadata/";
  
  console.log("📝 Contract parameters:");
  console.log(`   Name: ${name}`);
  console.log(`   Symbol: ${symbol}`);
  console.log(`   Base URI: ${baseTokenURI}`);
  
  // Deploy the contract
  console.log("⏳ Deploying contract...");
  const nftDesigner = await NFTDesigner.deploy(name, symbol, baseTokenURI);
  
  // Wait for deployment to complete
  await nftDesigner.waitForDeployment();
  
  const contractAddress = nftDesigner.target;
  console.log("✅ Contract deployed successfully!");
  console.log(`📍 Contract address: ${contractAddress}`);
  
  // Save deployment info
  const deploymentInfo = {
    network: "mumbai",
    contractAddress: contractAddress,
    name: name,
    symbol: symbol,
    baseTokenURI: baseTokenURI,
    deployer: await nftDesigner.owner(),
    deploymentTransaction: nftDesigner.deploymentTransaction().hash,
    timestamp: new Date().toISOString()
  };
  
  console.log("\n📋 Deployment Summary:");
  console.log(JSON.stringify(deploymentInfo, null, 2));
  
  console.log("\n🔧 Backend Configuration:");
  console.log(`   Add this to your .env file:`);
  console.log(`   CONTRACT_ADDRESS_MUMBAI=${contractAddress}`);
  
  console.log("\n🎉 Deployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
