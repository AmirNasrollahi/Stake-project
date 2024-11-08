const dotenv=require('dotenv').config({path:'./.env'})

if(dotenv.error){
    throw dotenv.error
}

const {airdropContractInstance,stakeContractInstance,tokenContractInstance,TOKEN_DECIAML} = require('./lib/constract.instance')


const transferToken=async ()=>{
    const transaction= await tokenContractInstance.transfer(airdropContractInstance.address,5000000* (10 ** TOKEN_DECIAML))
    await transaction.wait()
}

const balanceOf=async ()=>{
    const walletBalanceOf= await tokenContractInstance.balanceOf(airdropContractInstance.address)
    console.log(walletBalanceOf.toString() / 10 ** TOKEN_DECIAML)
}

const stakeInContract=async ()=>{
    // approve transaction
    const approveTransaction= await tokenContractInstance.approve(stakeContractInstance.address,50 * (10 ** TOKEN_DECIAML))
    await approveTransaction.wait()

    // stake transaction
    const stakeTransaction=await stakeContractInstance.stake(50 * (10 ** TOKEN_DECIAML))
    await stakeTransaction.wait()
    console.log(stakeTransaction.hash)
}

const airdropToken=async () =>{
    const airdropTransaction= await airdropContractInstance.getToken()
    await airdropTransaction.wait()
}

const main=async ()=>{
    // transferToken()
    // balanceOf()
    // monitoringContracts()

    stakeInContract()
    // airdropToken()
}

main()