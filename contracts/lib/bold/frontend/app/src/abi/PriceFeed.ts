// this file was generated by scripts/update-liquity-abis.ts
// please do not edit it manually
export const PriceFeed = [{
  "type": "function",
  "name": "fetchPrice",
  "inputs": [],
  "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }, {
    "name": "",
    "type": "bool",
    "internalType": "bool",
  }],
  "stateMutability": "view",
}, {
  "type": "function",
  "name": "getEthUsdStalenessThreshold",
  "inputs": [],
  "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
  "stateMutability": "pure",
}, {
  "type": "function",
  "name": "getPrice",
  "inputs": [],
  "outputs": [{ "name": "_price", "type": "uint256", "internalType": "uint256" }],
  "stateMutability": "view",
}, {
  "type": "function",
  "name": "lastGoodPrice",
  "inputs": [],
  "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
  "stateMutability": "view",
}, {
  "type": "function",
  "name": "setAddresses",
  "inputs": [{ "name": "_borrowerOperationsAddress", "type": "address", "internalType": "address" }],
  "outputs": [],
  "stateMutability": "nonpayable",
}, {
  "type": "function",
  "name": "setPrice",
  "inputs": [{ "name": "_price", "type": "uint256", "internalType": "uint256" }],
  "outputs": [],
  "stateMutability": "nonpayable",
}] as const;