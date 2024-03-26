// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";


library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;

        return c;
    }

    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}

contract stakeContract is ReentrancyGuard {
    event StakeEvent(address indexed user, uint256 amount);
    event UnstakeEvent(address indexed user, uint256 amount);
    event ClaimRewardEvent(address indexed user, uint256 amount);

    uint256 public timeReward;
    uint256 public rewardPercent;
    address payable public immutable owner;
    IERC20 public token;
    using SafeMath for uint256;

    struct StakeInfo {
        uint256 amount;
        uint256 stakeTime;
    }

    mapping(address => StakeInfo) public Stake;

    constructor(address _token,uint256 _timeReward, uint256 _rewardPercent) {
        token=IERC20(_token);
        timeReward = _timeReward;
        rewardPercent = _rewardPercent;
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner of this contract");
        _;
    }

    function stake(uint256 _amount) public {
        require(_amount != 0, "The minimum value error");

        if (Stake[msg.sender].amount != 0) {
            revert("You have already staked please first unstake your last activity");
        } 
        else {
            require(token.balanceOf(msg.sender)>=_amount,"You dont have enough token to stake");
            require(token.allowance(msg.sender,address(this))>=_amount,"You dont have enough allowance to stake");
            require(token.transferFrom(msg.sender, address(this), _amount), "Transaction Faild");
            Stake[msg.sender] = StakeInfo(
                _amount,
                block.timestamp
            );
            emit StakeEvent(msg.sender, _amount);
        }
    }

    function unSatke() public nonReentrant {
        uint256 _dayReward = _dayRewardCalc(Stake[msg.sender].stakeTime);
        uint256 _reward = (Stake[msg.sender].amount *
            (_dayReward * rewardPercent)) / 100;
        uint256 transferAmount = Stake[msg.sender].amount+_reward;
        Stake[msg.sender].amount =0;
        Stake[msg.sender].stakeTime = block.timestamp;

        require(token.balanceOf(address(this))>=transferAmount,"The Contract balance is not enough");
        require(token.transfer(msg.sender, transferAmount),"Transaction Faild");
        emit UnstakeEvent(msg.sender, transferAmount);
    }

    function reward() public view returns (uint256) {
        uint256 _dayReward = SafeMath.div((block.timestamp - Stake[msg.sender].stakeTime), timeReward);
        uint256 _reward = (Stake[msg.sender].amount *
            (_dayReward * rewardPercent)) / 100;

        return _reward;
    }

    function getBalance() public view returns (uint256) {
        uint256 _dayReward = _dayRewardCalc(Stake[msg.sender].stakeTime);
        uint256 _reward = (Stake[msg.sender].amount *
            (_dayReward * rewardPercent)) / 100;

        uint256 balance = Stake[msg.sender].amount + _reward;

        return balance;
    }

    function withdrawReward() public nonReentrant {
        uint256 _dayReward = _dayRewardCalc(Stake[msg.sender].stakeTime);
        require(_dayReward != 0, "You cant withdraw your reward at this time");
        uint256 _reward = (Stake[msg.sender].amount *
            (_dayReward * rewardPercent)) / 100;

        Stake[msg.sender].stakeTime = block.timestamp;

        require(token.balanceOf(address(this))>=_reward,"The Contract balance is not enough");
        require(token.transfer(msg.sender, _reward),"Transaction Faild");
        emit ClaimRewardEvent(msg.sender, _reward);
    }

    function changeTimeReward(uint256 _timeReward) public onlyOwner {
        timeReward = _timeReward;
    }

    function changeRewardPercentage(uint256 _rewardPercent) public onlyOwner {
        rewardPercent = _rewardPercent;
    }

    function ownerWithdraw(uint256 _amount) public onlyOwner {
        require(_amount != 0, "Amount must not be zero");

        require(token.balanceOf(address(this))>=_amount,"The Contract balance is not enough");
        require(token.transfer(msg.sender, _amount),"Transaction Faild");
    }

    function depositOwner(uint256 _amount) public onlyOwner{
        require(_amount != 0, "Amount must not be zero");
        require(token.balanceOf(msg.sender)>=_amount,"You dont have enough token to deposit");
        require(token.allowance(msg.sender,address(this))>=_amount,"You dont have enough allowance to deposit");
        require(token.transferFrom(msg.sender, address(this), _amount), "Transaction Faild");
    }

    function _dayRewardCalc(uint256 _stakeTime) public view returns (uint256) {
        uint256 dayReward = SafeMath.div((block.timestamp - _stakeTime), timeReward);

        return dayReward;
    }
}
