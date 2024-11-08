// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Airdrop is ReentrancyGuard, Ownable{
    //................events....................
    event AirdropDistributed(address _recipient,uint256 _amount);

    //.............varaibles..............//
    IERC20 token;
    uint256 public amountPerUser;

    //...................maps..........................//
    mapping(address=>bool)public alreadyGetToken;

    constructor(address _tokenAddress,uint256 _amountPerUser)Ownable(msg.sender){
        token=IERC20(_tokenAddress);
        amountPerUser=_amountPerUser;
    }

    //...........................functions.................................
    function getToken()public nonReentrant() {
        require(alreadyGetToken[msg.sender]==false,"You Have been already get Token");
        alreadyGetToken[msg.sender]=true;
        require(token.transfer(msg.sender, amountPerUser),"Transaction Faild");
        emit AirdropDistributed(msg.sender, amountPerUser);
    }
}