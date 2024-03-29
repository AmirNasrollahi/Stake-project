const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const {ethers} =require('hardhat')

describe("stake",function (){
    async function deployContracts(){
        const [owner,firstUser,secondUser]=await ethers.getSigners();
        const token=await ethers.getContractFactory('ANSToken')
        const tokenContract=await token.deploy()
        await tokenContract.deployed()

        const stake=await ethers.getContractFactory('stakeContract')
        const stakeContract=await stake.deploy(`${tokenContract.address}`,1800,15)
        await stakeContract.deployed()

        return {stakeContract,tokenContract,owner,firstUser,secondUser}
    }

    describe("Deployment",function(){
        it("should deploy the contracts",async function(){
            const {owner,firstUser}=await deployContracts()
        })
        
        it("should transfer 10 ANS Token",async function(){
            const {tokenContract,owner,firstUser}=await deployContracts()
            const transferAmount=10000000
            // transfer 10 ANS Token to firstUser
            await tokenContract.connect(owner).transfer(await firstUser.getAddress(),BigInt(transferAmount))
            // check the balance of the firstUser
            expect(await tokenContract.balanceOf(await firstUser.getAddress())).to.equal(transferAmount)
        })

        it("should stake in the contract",async function(){
            const {stakeContract,tokenContract,owner,firstUser}=await deployContracts()
            const stakeAmount=10000000
            // transfer 10 ANS Token to firstUser
            await tokenContract.connect(owner).transfer(await firstUser.getAddress(),BigInt(stakeAmount))
            // approve the stake contract to spend 10 ANS Token
            await tokenContract.connect(firstUser).approve(stakeContract.address,BigInt(stakeAmount))
            // stake 10 ANS Token
            await stakeContract.connect(firstUser).stake(stakeAmount)
            const stakeInfo=await stakeContract.Stake(await firstUser.getAddress())
            // check the staked amount
            expect(stakeInfo[0]).to.equal(stakeAmount)
        })

        it("should unstake in the contract",async function(){
            const {stakeContract,tokenContract,owner,firstUser}=await deployContracts()
            const stakeAmount=10000000
            await tokenContract.connect(owner).transfer(await firstUser.getAddress(),BigInt(stakeAmount))
            await tokenContract.connect(firstUser).approve(stakeContract.address,BigInt(stakeAmount))
            await stakeContract.connect(firstUser).stake(stakeAmount)

            // unstake the staked amount
            await stakeContract.connect(firstUser).unStake()
            const stakeInfo=await stakeContract.Stake(await firstUser.getAddress())
            // check the staked amount after unstake
            expect(stakeInfo[0]).to.equal(0)
        })

        it("should check the reward of the user",async function(){
            const {stakeContract,tokenContract,owner,firstUser}=await deployContracts()
            const stakeAmount=10000000
            await tokenContract.connect(owner).transfer(await firstUser.getAddress(),BigInt(stakeAmount))
            await tokenContract.connect(firstUser).approve(stakeContract.address,BigInt(stakeAmount))
            await stakeContract.connect(firstUser).stake(stakeAmount)
            // increase the time by 1800 seconds
            await time.increase(1800)
            // calculate the expected reward
            const expectedReward=BigInt(stakeAmount*15/100)
            const reward=await stakeContract.connect(firstUser).reward()
            // check the reward
            expect(reward).to.equal(expectedReward)
        })

        it("should claim reward in the contract",async function(){
            const {stakeContract,tokenContract,owner,firstUser}=await deployContracts()
            const stakeAmount=10000000
            // transfer 10 ANS Token to firstUser
            await tokenContract.connect(owner).transfer(await firstUser.getAddress(),BigInt(stakeAmount))
            // approve the stake contract to spend 10 ANS Token
            await tokenContract.connect(firstUser).approve(stakeContract.address,BigInt(stakeAmount))
            // stake 10 ANS Token
            await stakeContract.connect(firstUser).stake(stakeAmount)
            // increase the time by 1800 seconds
            await time.increase(1800)
            // calculate the expected reward
            const expectedReward=BigInt(stakeAmount*15/100)
            const reward=await stakeContract.connect(firstUser).reward()
            // check the reward
            expect(reward).to.equal(expectedReward)

            // claim the reward
            await stakeContract.connect(firstUser).withdrawReward()
            const afterWithdrawReward=await stakeContract.connect(firstUser).reward()
            // check the reward after withdraw
            expect(afterWithdrawReward).to.equal(0)
        })

        it("should check the balance of the user in contract with reward",async function(){
            const {stakeContract,tokenContract,owner,firstUser}=await deployContracts()
            const stakeAmount=10000000
            // transfer 10 ANS Token to firstUser
            await tokenContract.connect(owner).transfer(await firstUser.getAddress(),BigInt(stakeAmount))
            // approve the stake contract to spend 10 ANS Token
            await tokenContract.connect(firstUser).approve(stakeContract.address,BigInt(stakeAmount))
            // stake 10 ANS Token
            await stakeContract.connect(firstUser).stake(stakeAmount)
            // increase the time by 1800 seconds
            await time.increase(1800)
            // calculate the expected reward
            const expectedReward=stakeAmount*15/100
            const reward=await stakeContract.connect(firstUser).reward()
            // check the user balance with reward
            expect(await stakeContract.connect(firstUser).getBalance()).to.equal(stakeAmount+expectedReward)
        })

        it("should desposit in the contract with owner account",async function(){
            const {stakeContract,tokenContract,owner} =await deployContracts()
            const depositAmount=10000000
            // approve the stake contract to spend 10 ANS Token
            await tokenContract.connect(owner).approve(stakeContract.address,BigInt(depositAmount))
            // deposit 10 ANS
            await stakeContract.connect(owner).depositOwner(depositAmount)
            // check the contract balance
            expect(await tokenContract.balanceOf(stakeContract.address)).to.equal(depositAmount)
        })

        it("should owner can withdraw from the contract",async function(){
            const {stakeContract,tokenContract,owner} =await deployContracts()
            const depositAmount=10000000
            // approve the stake contract to spend 10 ANS Token
            await tokenContract.connect(owner).approve(stakeContract.address,BigInt(depositAmount))
            // deposit 10 ANS
            await stakeContract.connect(owner).depositOwner(depositAmount)
            expect(await tokenContract.balanceOf(stakeContract.address)).to.equal(depositAmount)

            await stakeContract.connect(owner).ownerWithdraw(depositAmount)
            expect(await tokenContract.balanceOf(stakeContract.address)).to.equal(0)
        })
    })
})