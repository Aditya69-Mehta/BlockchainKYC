const { ethers } = require("hardhat");

async function main() {
    console.log("Deploying Verifier contract...");

    const Verifier = await ethers.getContractFactory("Groth16Verifier"); // Use the correct contract name
    const verifier = await Verifier.deploy(); // Deploy the contract

    await verifier.waitForDeployment(); // Wait for deployment (correct method in ethers v6)
    
    console.log(`Verifier deployed to: ${await verifier.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
