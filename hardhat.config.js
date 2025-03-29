require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
    solidity: "0.8.19",
    networks: {
        sepolia: {
            url: process.env.ALCHEMY_SEPOLIA_URL,  // ✅ Ensure this is set
            accounts: [process.env.SEPOLIA_PRIVATE_KEY]
        }
    }
};


// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.28",
// };
