// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const {ethers} = require("hardhat");

async function main() {
  //................get the contract...................
  const stakeContract=await ethers.getContractFactory("stakeContract");
  const ANSTokenContrcat=await ethers.getContractFactory("ANSToken")
  console.log("deploying contracts...");
  // ................deploy the token contract...................
  const ANSToken=await ANSTokenContrcat.deploy();
  //................wait to contract deploy...................
  await ANSToken.deployed();
  console.log(`ANSToken deployed to:${ANSToken.address}`);
  // ................deploy the stake contract...................
  const Stake=await stakeContract.deploy(`${ANSToken.address}`,1800,15);
  //................wait to contract deploy...................
  await Stake.deployed();
  console.log(`stake contract deployed to:${Stake.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
