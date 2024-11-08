const { ethers, run, network } = require("hardhat");

async function main() {
  console.log(`Deploying contracts to network: ${network.name}`);

  const StakeContract = await ethers.getContractFactory("stakeContract");
  const ANSTokenContract = await ethers.getContractFactory("ANSToken");
  const AirDropContract=await ethers.getContractFactory('Airdrop');

  console.log("☕ Deploying contracts...");

  const ANSToken = await ANSTokenContract.deploy();
  await ANSToken.deployed();
  console.log(`✅ ANSToken deployed to: ${ANSToken.address}`);

  const Stake = await StakeContract.deploy(ANSToken.address, 1800, 15);
  await Stake.deployed();
  console.log(`✅ Stake contract deployed to: ${Stake.address}`);

  const Airdrop=await AirDropContract.deploy(ANSToken.address,ethers.utils.parseUnits("1000", 6))
  await Airdrop.deployed()
  console.log(`✅ AirDrop contract deployed to: ${Airdrop.address}`);

  // if (network.name === 'amoy') {
  //   console.log(`☕️ Verifying the contracts source code on block explorer...`);

  //   try {
  //     await run("verify:verify", {
  //       address: ANSToken.address,
  //       constructorArguments: []
  //     });
  //     console.log(`✅ ANSToken verified`);

  //     // await run("verify:verify", {
  //     //   address: Stake.address,
  //     //   constructorArguments: [ANSToken.address, 1800, 15]
  //     // });
  //     // console.log(`✅ Stake contract verified`);
  //   } catch (error) {
  //     console.error("❌ Verification failed:", error);
  //   }
  // } else {
  //   console.log("Skipping verification on local network");
  // }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
