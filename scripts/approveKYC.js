const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0x731f562e6486ee269Bcb444A711b5FA66ea9A095";
    const userAddress = "0x7520CD2E28BD9890Eb1e559c607372718e713d7E"; // Replace with the actual user address

    const [signer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("KYCRegistry", contractAddress, signer);

    console.log(`Approving KYC for ${userAddress}...`);

    const tx = await contract.approveKYC(userAddress);
    console.log("Transaction sent. Waiting for confirmation...");

    const receipt = await tx.wait();
    console.log(`✅ KYC approved in block: ${receipt.blockNumber}`);
    console.log(`📜 Transaction hash: ${receipt.transactionHash}`);
}

main().catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
});
