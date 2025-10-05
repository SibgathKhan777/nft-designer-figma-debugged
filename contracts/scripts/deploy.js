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
  console.log(`🔗 Network: ${network.name}`);
  console.log(`⛽ Gas used: ${nftDesigner.deploymentTransaction().gasLimit}`);
  
  // Verify contract on block explorer (if not local network)
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("⏳ Waiting for block confirmations before verification...");
    await nftDesigner.deploymentTransaction().wait(6);
    
    try {
      console.log("🔍 Verifying contract on block explorer...");
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [name, symbol, baseTokenURI],
      });
      console.log("✅ Contract verified successfully!");
    } catch (error) {
      console.log("⚠️ Contract verification failed:", error.message);
    }
  }
  
  // Save deployment info
  const deploymentInfo = {
    network: network.name,
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
  
  // Instructions for backend configuration
  console.log("\n🔧 Backend Configuration:");
  console.log(`   Add this to your .env file:`);
  console.log(`   CONTRACT_ADDRESS=${contractAddress}`);
  
  console.log("\n🎉 Deployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
