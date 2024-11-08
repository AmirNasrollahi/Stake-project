const dotenv=require('dotenv').config({path:'./.env'})

if(dotenv.error){
    throw dotenv.error
}

const {stakeContractInstance,airdropContractInstance}=require('./lib/constract.instance')

const monitoring=()=>{
    console.log('✅ listening on contracts Events')

    // stake event Monitoring
    stakeContractInstance.on('StakeEvent',(userAddress,stakedAmount,event)=>{
        console.log("StakeEvent:");
        console.log("User Address:", userAddress);
        console.log("Amount Staked:", stakedAmount.toString());
        console.log("Transaction Hash:", event.transactionHash);
        console.log('Block Number:', event.blockNumber);
        console.log('......................................')
    })


    // airdrop event Monitoring
    airdropContractInstance.on('AirdropDistributed',(_recipient,_amount,event)=>{
        console.log("AirdropDistributed:");
        console.log("User Address:", _recipient);
        console.log("Airdrop Amount:", _amount.toString());
        console.log("Transaction Hash:", event.transactionHash);
        console.log('Block Number:', event.blockNumber);
        console.log('......................................')
    })
}

monitoring()