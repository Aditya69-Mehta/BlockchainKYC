require("dotenv").config();
const { ethers } = require("hardhat");

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_URL);
const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);

// Replace with your deployed contract address
const contractAddress = "0x96f10d4c18CAc545E5655c599ae1ac3Bea568358";
const abi = [
    "function getUserStatus(address _user) public view returns (uint8)",
    "function isUserVerified(address _user) public view returns (bool)",
    "function approveKYC(address _user) public",
    "function requestKYC(string memory _userId) public"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function main() {
    const userAddress = "0x27176fa47Af5dC98936ccC797E5E9b71dF0F05F7"; // Replace with the user's address

    const userStatus = await contract.getUserStatus(userAddress);
    console.log("User's current KYC status:", userStatus.toString()); 

    const isVerified = userStatus === 1n; // Compare with BigInt 1n
    console.log("Is user verified?", isVerified);

}

main().catch(console.error);
