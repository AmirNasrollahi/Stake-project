//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./IERC20interface.sol";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract stakeingcontract is Ownable {
    mapping (address => StakeInf) public UserStake;

    struct StakeInf{
        uint256 Stkamount;
        uint256 StartedTime;
    }

    using SafeMath for uint256;
    event transferowner(address owner, uint256 amount);
    event LogPayout(address user, uint256 stakedAmount, uint256 rewardAmount);

    IERC20 public token;
    uint256 public reward = 100;
    uint256 public timereward = 1;

    constructor() {
        token = IERC20(0x418D75f65a02b3D53B2418FB8E1fe493759c7605);
    }

    function Stake(uint256 amount) public {
        token.transferFrom(msg.sender, address(this), amount);
        UserStake[msg.sender]=StakeInf(amount,block.timestamp);
    }

    function approvecontract(uint256 amount) public {
        require(token.approve(address(this), amount));
    }

    function withdraw(uint256 amount) public {
        uint256 RewardCount=RewardCountFN(msg.sender);
        require(RewardCount > 0, "It is not time to get reward yet");
        require((UserStake[msg.sender].Stkamount +(UserStake[msg.sender].Stkamount * reward) /100) >= amount,"you dont have any enough");
        UserStake[msg.sender].Stkamount += UserStake[msg.sender].Stkamount * (reward * RewardCount) /100;
        token.transfer(msg.sender, amount);
        UserStake[msg.sender].Stkamount -= amount;
        UserStake[msg.sender].StartedTime = block.timestamp;
    }

    function unstake() public {
        uint256 RewardCount=RewardCountFN(msg.sender);
        require(RewardCount > 0, "It is not time to get reward yet");
        uint256 finalamount = UserStake[msg.sender].Stkamount + (UserStake[msg.sender].Stkamount * (reward * RewardCount)) /100;
        token.transfer(msg.sender, finalamount);
        emit LogPayout(msg.sender,UserStake[msg.sender].Stkamount,(UserStake[msg.sender].Stkamount * (reward * RewardCount)) / 100);
        delete UserStake[msg.sender];
    }

    function Reward(address user) public view returns (uint256) {
        uint256 RewardCount=RewardCountFN(msg.sender);
        require(RewardCount > 0, "It is not time to get reward yet");
        return (UserStake[user].Stkamount * (reward * RewardCount)) / 100;
    }

    function UserBalance(address user) public view returns (uint256) {
        return (UserStake[user].Stkamount);
    }

    function ClaimReward() public {
        uint256 RewardCount=RewardCountFN(msg.sender);
        require(RewardCount > 0, "It is not time to get reward yet");
        token.transfer(msg.sender,(UserStake[msg.sender].Stkamount * (reward * RewardCount)) / 100 );
        UserStake[msg.sender].StartedTime = block.timestamp;
    }

    function adminwithdraw(uint256 amount) public onlyOwner {
        token.transfer(msg.sender,  address(this).balance);
        emit transferowner(msg.sender, amount);
        // amount || address(this).balance
    }

    function adminsetreward(uint256 _reward) public onlyOwner {
        reward = _reward;
    }

    function adminsettimereward(uint256 _rewardtime) public onlyOwner {
        timereward = _rewardtime;
    }

    function adminchangetoken(address _token) public onlyOwner {
        token = IERC20(_token);
    }

    function RewardCountFN(address user) public view returns(uint256){
        uint256 time = ((((UserStake[user].StartedTime / 1000) / 60) / 60) / 24);
        uint256 timest = ((((block.timestamp / 1000) / 60) / 60) / 24);
        uint256 rewardcount = SafeMath.div((timest - time), timereward);
        return rewardcount;
    }
}
