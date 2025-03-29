const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0x731f562e6486ee269Bcb444A711b5FA66ea9A095";
    const userAddress = "0x0c6b44A2922037e9BA8075fb1B1421a571A7520B"; // Replace with the actual user address

    const contract = await ethers.getContractAt("KYCRegistry", contractAddress);

    const status = await contract.getUserStatus(userAddress);

    const statuses = ["Unverified", "Pending", "Verified", "Rejected"];
    console.log(`🔍 Current KYC Status for ${userAddress}: ${statuses[status]}`);
}

main().catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
});
