pragma circom 2.1.6; // Specify the version to remove the warning

include "../../circomlib/circuits/comparators.circom"; // Example include

template KYC() {
    signal input userId;
    signal output valid;

    // Ensure the userId is greater than 1000 (ZK circuits only allow quadratic constraints)
    component check = LessThan(10); 
    check.in[0] <== 1000;
    check.in[1] <== userId;
    
    valid <== check.out;
}

component main = KYC();
