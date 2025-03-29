const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0x731f562e6486ee269Bcb444A711b5FA66ea9A095";
    const [signer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("KYCRegistry", contractAddress, signer);

    console.log(`Checking KYC status for ${signer.address}...`);

    // Fetch the current KYC status
    const status = await contract.getUserStatus(signer.address);
    const statuses = ["Unverified", "Pending", "Verified", "Rejected"];

    console.log(`Current KYC Status: ${statuses[status]}`);

    // If already pending or verified, do not request again
    if (status !== 0) {
        console.log("❌ KYC has already been requested or verified. No need to request again.");
        return;
    }

    console.log("Requesting KYC...");
    const tx = await contract.requestKYC("hashedUserId");
    console.log("Transaction sent. Waiting for confirmation...");

    const receipt = await tx.wait();
    console.log(`✅ KYC request confirmed in block: ${receipt.blockNumber}`);
    console.log(`📜 Transaction hash: ${receipt.transactionHash}`);
}

main().catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
});
