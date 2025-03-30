// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Verifier.sol";
  // Ensure this is the correct path
 // Import your zk-SNARK verifier

contract KYCRegistry {
    address public owner;
    IZKVerifier public verifier;

    mapping(address => bool) public isKYCVerified;

    event KYCVerified(address indexed user);

    constructor(address _verifier) {
        owner = msg.sender;
        verifier = IZKVerifier(_verifier); // Verifier contract
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can verify KYC");
        _;
    }

    function verifyKYC(
        address user,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[1] memory input
    ) external onlyOwner {
        require(!isKYCVerified[user], "User is already KYC verified");
        
        bool valid = verifier.verifyProof(a, b, c, input);
        require(valid, "Invalid proof");

        isKYCVerified[user] = true;
        emit KYCVerified(user);
    }

    function checkKYC(address user) external view returns (bool) {
        return isKYCVerified[user];
    }
}

interface IZKVerifier {
    function verifyProof(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[1] memory input
    ) external view returns (bool);
}


// pragma solidity ^0.8.20;

// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@iden3/contracts/interfaces/IZKVerifier.sol";

// contract ZKKYC is Ownable {
//     struct User {
//         bool kycVerified;
//     }

//     mapping(address => User) public users;
//     IZKVerifier public verifier;

//     event KYCRequested(address indexed user);
//     event KYCVerified(address indexed user);

//     constructor(address _verifier) {
//         verifier = IZKVerifier(_verifier);
//     }

//     function requestKYC() external {
//         require(!users[msg.sender].kycVerified, "KYC already verified");
//         emit KYCRequested(msg.sender);
//     }

//     function verifyKYC(
//         address user,
//         uint256[2] memory a,
//         uint256[2][2] memory b,
//         uint256[2] memory c,
//         uint256[1] memory input
//     ) external onlyOwner {
//         require(verifier.verifyProof(a, b, c, input), "Invalid ZK proof");
//         users[user].kycVerified = true;
//         emit KYCVerified(user);
//     }
    
//     function isKYCVerified(address user) external view returns (bool) {
//         return users[user].kycVerified;
//     }
// }