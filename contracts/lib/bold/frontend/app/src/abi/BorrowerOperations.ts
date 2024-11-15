// this file was generated by scripts/update-liquity-abis.ts
// please do not edit it manually
export const BorrowerOperations = [
  {
    "type": "constructor",
    "inputs": [{ "name": "_addressesRegistry", "type": "address", "internalType": "contract IAddressesRegistry" }],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "CCR",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "MCR",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "SCR",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "activePool",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "contract IActivePool" }],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "addColl",
    "inputs": [{ "name": "_troveId", "type": "uint256", "internalType": "uint256" }, {
      "name": "_collAmount",
      "type": "uint256",
      "internalType": "uint256",
    }],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "addManagerOf",
    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "adjustTrove",
    "inputs": [
      { "name": "_troveId", "type": "uint256", "internalType": "uint256" },
      { "name": "_collChange", "type": "uint256", "internalType": "uint256" },
      { "name": "_isCollIncrease", "type": "bool", "internalType": "bool" },
      { "name": "_boldChange", "type": "uint256", "internalType": "uint256" },
      { "name": "_isDebtIncrease", "type": "bool", "internalType": "bool" },
      { "name": "_maxUpfrontFee", "type": "uint256", "internalType": "uint256" },
    ],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "adjustTroveInterestRate",
    "inputs": [
      { "name": "_troveId", "type": "uint256", "internalType": "uint256" },
      { "name": "_newAnnualInterestRate", "type": "uint256", "internalType": "uint256" },
      { "name": "_upperHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_lowerHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_maxUpfrontFee", "type": "uint256", "internalType": "uint256" },
    ],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "adjustZombieTrove",
    "inputs": [
      { "name": "_troveId", "type": "uint256", "internalType": "uint256" },
      { "name": "_collChange", "type": "uint256", "internalType": "uint256" },
      { "name": "_isCollIncrease", "type": "bool", "internalType": "bool" },
      { "name": "_boldChange", "type": "uint256", "internalType": "uint256" },
      { "name": "_isDebtIncrease", "type": "bool", "internalType": "bool" },
      { "name": "_upperHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_lowerHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_maxUpfrontFee", "type": "uint256", "internalType": "uint256" },
    ],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "applyPendingDebt",
    "inputs": [{ "name": "_troveId", "type": "uint256", "internalType": "uint256" }, {
      "name": "_lowerHint",
      "type": "uint256",
      "internalType": "uint256",
    }, { "name": "_upperHint", "type": "uint256", "internalType": "uint256" }],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "checkBatchManagerExists",
    "inputs": [{ "name": "_batchManager", "type": "address", "internalType": "address" }],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view",
  },
  { "type": "function", "name": "claimCollateral", "inputs": [], "outputs": [], "stateMutability": "nonpayable" },
  {
    "type": "function",
    "name": "closeTrove",
    "inputs": [{ "name": "_troveId", "type": "uint256", "internalType": "uint256" }],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "getEntireSystemColl",
    "inputs": [],
    "outputs": [{ "name": "entireSystemColl", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "getEntireSystemDebt",
    "inputs": [],
    "outputs": [{ "name": "entireSystemDebt", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "getInterestBatchManager",
    "inputs": [{ "name": "_account", "type": "address", "internalType": "address" }],
    "outputs": [{
      "name": "",
      "type": "tuple",
      "internalType": "struct IBorrowerOperations.InterestBatchManager",
      "components": [{ "name": "minInterestRate", "type": "uint128", "internalType": "uint128" }, {
        "name": "maxInterestRate",
        "type": "uint128",
        "internalType": "uint128",
      }, { "name": "minInterestRateChangePeriod", "type": "uint256", "internalType": "uint256" }],
    }],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "getInterestIndividualDelegateOf",
    "inputs": [{ "name": "_troveId", "type": "uint256", "internalType": "uint256" }],
    "outputs": [{
      "name": "",
      "type": "tuple",
      "internalType": "struct IBorrowerOperations.InterestIndividualDelegate",
      "components": [
        { "name": "account", "type": "address", "internalType": "address" },
        { "name": "minInterestRate", "type": "uint128", "internalType": "uint128" },
        { "name": "maxInterestRate", "type": "uint128", "internalType": "uint128" },
        { "name": "minInterestRateChangePeriod", "type": "uint256", "internalType": "uint256" },
      ],
    }],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "hasBeenShutDown",
    "inputs": [],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "interestBatchManagerOf",
    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "lowerBatchManagementFee",
    "inputs": [{ "name": "_newAnnualManagementFee", "type": "uint256", "internalType": "uint256" }],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "onLiquidateTrove",
    "inputs": [{ "name": "_troveId", "type": "uint256", "internalType": "uint256" }],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "openTrove",
    "inputs": [
      { "name": "_owner", "type": "address", "internalType": "address" },
      { "name": "_ownerIndex", "type": "uint256", "internalType": "uint256" },
      { "name": "_collAmount", "type": "uint256", "internalType": "uint256" },
      { "name": "_boldAmount", "type": "uint256", "internalType": "uint256" },
      { "name": "_upperHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_lowerHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_annualInterestRate", "type": "uint256", "internalType": "uint256" },
      { "name": "_maxUpfrontFee", "type": "uint256", "internalType": "uint256" },
      { "name": "_addManager", "type": "address", "internalType": "address" },
      { "name": "_removeManager", "type": "address", "internalType": "address" },
      { "name": "_receiver", "type": "address", "internalType": "address" },
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "openTroveAndJoinInterestBatchManager",
    "inputs": [{
      "name": "_params",
      "type": "tuple",
      "internalType": "struct IBorrowerOperations.OpenTroveAndJoinInterestBatchManagerParams",
      "components": [
        { "name": "owner", "type": "address", "internalType": "address" },
        { "name": "ownerIndex", "type": "uint256", "internalType": "uint256" },
        { "name": "collAmount", "type": "uint256", "internalType": "uint256" },
        { "name": "boldAmount", "type": "uint256", "internalType": "uint256" },
        { "name": "upperHint", "type": "uint256", "internalType": "uint256" },
        { "name": "lowerHint", "type": "uint256", "internalType": "uint256" },
        { "name": "interestBatchManager", "type": "address", "internalType": "address" },
        { "name": "maxUpfrontFee", "type": "uint256", "internalType": "uint256" },
        { "name": "addManager", "type": "address", "internalType": "address" },
        { "name": "removeManager", "type": "address", "internalType": "address" },
        { "name": "receiver", "type": "address", "internalType": "address" },
      ],
    }],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "registerBatchManager",
    "inputs": [
      { "name": "_minInterestRate", "type": "uint128", "internalType": "uint128" },
      { "name": "_maxInterestRate", "type": "uint128", "internalType": "uint128" },
      { "name": "_currentInterestRate", "type": "uint128", "internalType": "uint128" },
      { "name": "_annualManagementFee", "type": "uint128", "internalType": "uint128" },
      { "name": "_minInterestRateChangePeriod", "type": "uint128", "internalType": "uint128" },
    ],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "removeFromBatch",
    "inputs": [
      { "name": "_troveId", "type": "uint256", "internalType": "uint256" },
      { "name": "_newAnnualInterestRate", "type": "uint256", "internalType": "uint256" },
      { "name": "_upperHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_lowerHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_maxUpfrontFee", "type": "uint256", "internalType": "uint256" },
    ],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "removeInterestIndividualDelegate",
    "inputs": [{ "name": "_troveId", "type": "uint256", "internalType": "uint256" }],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "removeManagerReceiverOf",
    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "outputs": [{ "name": "manager", "type": "address", "internalType": "address" }, {
      "name": "receiver",
      "type": "address",
      "internalType": "address",
    }],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "repayBold",
    "inputs": [{ "name": "_troveId", "type": "uint256", "internalType": "uint256" }, {
      "name": "_boldAmount",
      "type": "uint256",
      "internalType": "uint256",
    }],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "setAddManager",
    "inputs": [{ "name": "_troveId", "type": "uint256", "internalType": "uint256" }, {
      "name": "_manager",
      "type": "address",
      "internalType": "address",
    }],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "setBatchManagerAnnualInterestRate",
    "inputs": [
      { "name": "_newAnnualInterestRate", "type": "uint128", "internalType": "uint128" },
      { "name": "_upperHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_lowerHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_maxUpfrontFee", "type": "uint256", "internalType": "uint256" },
    ],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "setInterestBatchManager",
    "inputs": [
      { "name": "_troveId", "type": "uint256", "internalType": "uint256" },
      { "name": "_newBatchManager", "type": "address", "internalType": "address" },
      { "name": "_upperHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_lowerHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_maxUpfrontFee", "type": "uint256", "internalType": "uint256" },
    ],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "setInterestIndividualDelegate",
    "inputs": [
      { "name": "_troveId", "type": "uint256", "internalType": "uint256" },
      { "name": "_delegate", "type": "address", "internalType": "address" },
      { "name": "_minInterestRate", "type": "uint128", "internalType": "uint128" },
      { "name": "_maxInterestRate", "type": "uint128", "internalType": "uint128" },
      { "name": "_newAnnualInterestRate", "type": "uint256", "internalType": "uint256" },
      { "name": "_upperHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_lowerHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_maxUpfrontFee", "type": "uint256", "internalType": "uint256" },
      { "name": "_minInterestRateChangePeriod", "type": "uint256", "internalType": "uint256" },
    ],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "setRemoveManager",
    "inputs": [{ "name": "_troveId", "type": "uint256", "internalType": "uint256" }, {
      "name": "_manager",
      "type": "address",
      "internalType": "address",
    }],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "setRemoveManagerWithReceiver",
    "inputs": [{ "name": "_troveId", "type": "uint256", "internalType": "uint256" }, {
      "name": "_manager",
      "type": "address",
      "internalType": "address",
    }, { "name": "_receiver", "type": "address", "internalType": "address" }],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  { "type": "function", "name": "shutdown", "inputs": [], "outputs": [], "stateMutability": "nonpayable" },
  {
    "type": "function",
    "name": "shutdownFromOracleFailure",
    "inputs": [{ "name": "_failedOracleAddr", "type": "address", "internalType": "address" }],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "switchBatchManager",
    "inputs": [
      { "name": "_troveId", "type": "uint256", "internalType": "uint256" },
      { "name": "_removeUpperHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_removeLowerHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_newBatchManager", "type": "address", "internalType": "address" },
      { "name": "_addUpperHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_addLowerHint", "type": "uint256", "internalType": "uint256" },
      { "name": "_maxUpfrontFee", "type": "uint256", "internalType": "uint256" },
    ],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "withdrawBold",
    "inputs": [{ "name": "_troveId", "type": "uint256", "internalType": "uint256" }, {
      "name": "_boldAmount",
      "type": "uint256",
      "internalType": "uint256",
    }, { "name": "_maxUpfrontFee", "type": "uint256", "internalType": "uint256" }],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "withdrawColl",
    "inputs": [{ "name": "_troveId", "type": "uint256", "internalType": "uint256" }, {
      "name": "_collWithdrawal",
      "type": "uint256",
      "internalType": "uint256",
    }],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "event",
    "name": "ActivePoolAddressChanged",
    "inputs": [{ "name": "_newActivePoolAddress", "type": "address", "indexed": false, "internalType": "address" }],
    "anonymous": false,
  },
  {
    "type": "event",
    "name": "AddManagerUpdated",
    "inputs": [{ "name": "_troveId", "type": "uint256", "indexed": true, "internalType": "uint256" }, {
      "name": "_newAddManager",
      "type": "address",
      "indexed": false,
      "internalType": "address",
    }],
    "anonymous": false,
  },
  {
    "type": "event",
    "name": "BoldTokenAddressChanged",
    "inputs": [{ "name": "_boldTokenAddress", "type": "address", "indexed": false, "internalType": "address" }],
    "anonymous": false,
  },
  {
    "type": "event",
    "name": "CollSurplusPoolAddressChanged",
    "inputs": [{ "name": "_collSurplusPoolAddress", "type": "address", "indexed": false, "internalType": "address" }],
    "anonymous": false,
  },
  {
    "type": "event",
    "name": "DefaultPoolAddressChanged",
    "inputs": [{ "name": "_newDefaultPoolAddress", "type": "address", "indexed": false, "internalType": "address" }],
    "anonymous": false,
  },
  {
    "type": "event",
    "name": "GasPoolAddressChanged",
    "inputs": [{ "name": "_gasPoolAddress", "type": "address", "indexed": false, "internalType": "address" }],
    "anonymous": false,
  },
  {
    "type": "event",
    "name": "PriceFeedAddressChanged",
    "inputs": [{ "name": "_newPriceFeedAddress", "type": "address", "indexed": false, "internalType": "address" }],
    "anonymous": false,
  },
  {
    "type": "event",
    "name": "RemoveManagerAndReceiverUpdated",
    "inputs": [{ "name": "_troveId", "type": "uint256", "indexed": true, "internalType": "uint256" }, {
      "name": "_newRemoveManager",
      "type": "address",
      "indexed": false,
      "internalType": "address",
    }, { "name": "_newReceiver", "type": "address", "indexed": false, "internalType": "address" }],
    "anonymous": false,
  },
  {
    "type": "event",
    "name": "ShutDown",
    "inputs": [{ "name": "_tcr", "type": "uint256", "indexed": false, "internalType": "uint256" }],
    "anonymous": false,
  },
  {
    "type": "event",
    "name": "ShutDownFromOracleFailure",
    "inputs": [{ "name": "_oracleAddress", "type": "address", "indexed": false, "internalType": "address" }],
    "anonymous": false,
  },
  {
    "type": "event",
    "name": "SortedTrovesAddressChanged",
    "inputs": [{ "name": "_sortedTrovesAddress", "type": "address", "indexed": false, "internalType": "address" }],
    "anonymous": false,
  },
  {
    "type": "event",
    "name": "TroveManagerAddressChanged",
    "inputs": [{ "name": "_newTroveManagerAddress", "type": "address", "indexed": false, "internalType": "address" }],
    "anonymous": false,
  },
  {
    "type": "event",
    "name": "TroveNFTAddressChanged",
    "inputs": [{ "name": "_newTroveNFTAddress", "type": "address", "indexed": false, "internalType": "address" }],
    "anonymous": false,
  },
  { "type": "error", "name": "AnnualManagementFeeTooHigh", "inputs": [] },
  { "type": "error", "name": "BatchInterestRateChangePeriodNotPassed", "inputs": [] },
  { "type": "error", "name": "BatchManagerExists", "inputs": [] },
  { "type": "error", "name": "BatchManagerNotNew", "inputs": [] },
  { "type": "error", "name": "CallerNotPriceFeed", "inputs": [] },
  { "type": "error", "name": "CallerNotTroveManager", "inputs": [] },
  { "type": "error", "name": "CollWithdrawalTooHigh", "inputs": [] },
  { "type": "error", "name": "DebtBelowMin", "inputs": [] },
  { "type": "error", "name": "DelegateInterestRateChangePeriodNotPassed", "inputs": [] },
  { "type": "error", "name": "EmptyManager", "inputs": [] },
  { "type": "error", "name": "ICRBelowMCR", "inputs": [] },
  { "type": "error", "name": "InterestNotInRange", "inputs": [] },
  { "type": "error", "name": "InterestRateNotNew", "inputs": [] },
  { "type": "error", "name": "InterestRateTooHigh", "inputs": [] },
  { "type": "error", "name": "InterestRateTooLow", "inputs": [] },
  { "type": "error", "name": "InvalidInterestBatchManager", "inputs": [] },
  { "type": "error", "name": "IsShutDown", "inputs": [] },
  { "type": "error", "name": "MinGeMax", "inputs": [] },
  { "type": "error", "name": "MinInterestRateChangePeriodTooLow", "inputs": [] },
  { "type": "error", "name": "NewFeeNotLower", "inputs": [] },
  { "type": "error", "name": "NewOracleFailureDetected", "inputs": [] },
  { "type": "error", "name": "NotBorrower", "inputs": [] },
  { "type": "error", "name": "NotEnoughBoldBalance", "inputs": [] },
  { "type": "error", "name": "NotOwnerNorAddManager", "inputs": [] },
  { "type": "error", "name": "NotOwnerNorInterestManager", "inputs": [] },
  { "type": "error", "name": "NotOwnerNorRemoveManager", "inputs": [] },
  { "type": "error", "name": "RepaymentNotMatchingCollWithdrawal", "inputs": [] },
  { "type": "error", "name": "TCRBelowCCR", "inputs": [] },
  { "type": "error", "name": "TCRNotBelowSCR", "inputs": [] },
  { "type": "error", "name": "TroveExists", "inputs": [] },
  { "type": "error", "name": "TroveInBatch", "inputs": [] },
  { "type": "error", "name": "TroveNotActive", "inputs": [] },
  { "type": "error", "name": "TroveNotInBatch", "inputs": [] },
  { "type": "error", "name": "TroveNotOpen", "inputs": [] },
  { "type": "error", "name": "TroveNotZombie", "inputs": [] },
  { "type": "error", "name": "UpfrontFeeTooHigh", "inputs": [] },
  { "type": "error", "name": "ZeroAdjustment", "inputs": [] },
] as const;