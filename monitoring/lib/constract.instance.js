const ethers=require('ethers')

const TOKEN_CONTRACT_ADDRESS = process.env.TOKEN_CONTRACT_ADDRESS;
const TOKEN_CONTRACT_ABI = JSON.parse(process.env.TOKEN_CONTRACT_ABI);
const TOKEN_DECIAML=6;

const STAKE_CONTRACT_ADDRESS = process.env.STAKE_CONTRACT_ADDRESS;
const STAKE_CONTRACT_ABI = JSON.parse(process.env.STAKE_CONTRACT_ABI);

const AIRDROP_CONTRACT_ADDRESS = process.env.AIRDROP_CONTRACT_ADDRESS;
const AIRDROP_CONTRACT_ABI = JSON.parse(process.env.AIRDROP_CONTRACT_ABI);


const provider=new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545')
const privateKey= process.env.privateKey
const wallet=new ethers.Wallet(privateKey,provider)


const tokenContractInstance= new ethers.Contract(TOKEN_CONTRACT_ADDRESS,TOKEN_CONTRACT_ABI,wallet);
const stakeContractInstance= new ethers.Contract(STAKE_CONTRACT_ADDRESS,STAKE_CONTRACT_ABI,wallet);
const airdropContractInstance= new ethers.Contract(AIRDROP_CONTRACT_ADDRESS,AIRDROP_CONTRACT_ABI,wallet);

module.exports={
    tokenContractInstance,
    stakeContractInstance,
    airdropContractInstance,
    TOKEN_DECIAML
}