const hre = require("hardhat");

async function main() {
    const KYCRegistry = await hre.ethers.getContractFactory("KYCRegistry"); 
    const kycRegistry = await KYCRegistry.deploy(); 

    await kycRegistry.waitForDeployment(); 

    console.log("KYCRegistry deployed to:", await kycRegistry.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
