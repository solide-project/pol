import { ChainID } from "../chains"
import { Deployment } from "../db/submission"

// This is submission is for calling a changeOwner function in their deployed contract
const transactionBasic = {
    id: "0x000",
    chain: ChainID.BASE_SEPOLIA,
    type: "transaction",
    abi: ["function changeOwner(address newOwner)"],
}

// This is submission is for calling a changeOwner function in their deployed contract
const transactionFromGivenContract = {
    id: "0x000",
    chain: ChainID.BASE_SEPOLIA,
    type: "transaction",
    abi: ["function changeOwner(address newOwner)"],
    contract: "0x000",
}

// This is submission is for checking user deployed contract
const deploymentContract: Deployment = {
    id: "0x000",
    chain: ChainID.BASE_SEPOLIA,
    type: "deployment",
    bytecode: "0xf9631720f8265eecb341cd8836c1af6b6c43fabd391283beeab7d4de7d39aa7a",
}