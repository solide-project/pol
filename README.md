<p align="center">
  <h2 align="center">Proof of Learn Platform</h2>
  <p align="center">
    <img src="https://therealsujitk-vercel-badge.vercel.app/?app=proof-of-learn" alt="Vercel Deploy">
  </p>
  <p align="center"><b>Transparent Immersive blockchain learning plaftorm</b></p>
  <p align="center">Proof of Learn (POL) is a free and open-source learning platform designed to make blockchain education interactive and engaging. By focusing on hands-on experience, POL enables users to learn by deploying smart contracts, interacting with various blockchains, and completing quests.</p>
</p>

## About POL

Built on the Open Campus protocol, POL enables users to learn by directly interacting with smart contracts and blockchain ecosystems. A standout feature is the issuance of POL POAPs (Proof of Achievement Protocol) as non-transferable NFTs, which serve as verifiable credentials for completed learning tasks. POL is designed to support a wide range of blockchains, including EVM-based, Move, and Stylus, making it a flexible and comprehensive learning hub for the entire Web3 space.

## Adding new Resource 🌟

Create a PR or Issue on this repo and the resource will be validated and processed by the POL team.

To get started with creating a resource: 

- Starter template: https://github.com/5208980/pol-template
- Example Resource (Ape Staking Guide): https://github.com/5208980/staking-ape-coin/

## POL POAP

Contract implementation can be found with this contract deployed on Open Campus Codex:
[0xe5F6f93aBbaeb1391f67Bb0eA5727aCD1DD74d91] (https://educhain.blockscout.com/address/0xe5F6f93aBbaeb1391f67Bb0eA5727aCD1DD74d91)

## Getting Started

To experience POL, visit our [Doc (Coming Soon)](#). You can also check out and learn the different ecosystem and resource at [Proof of Learn Platform](https://proof-of-learn.vercel.app/).

## Getting Started
To run POL locally, follow these steps:

### Clone the Repository
First, clone the POL Platform repository to your local machine using Git:
```bash
git clone https://github.com/solide-project/pol
```

### Install Dependencies
Navigate into the cloned repository directory and install the required bun packages:
```bash
cd pol
bun install
```

### Running POL
After configuring the environment variables, start the POL Platform:
```bash
bun run start
```

### Change environment.
See "@/lib/poap" folder. This will required you add contractAddress and also chain.

This command will launch the POL in your default web browser.