const web3 = new Web3(window.ethereum);

const TOKEN_CONTRACT_ADDRESS = "0x3b6B3F042A505910aa619730617D4CEacDABe3c1";
const TOKEN_CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const TOKEN_DECIAML = 6;

const STAKE_CONTRACT_ADDRESS = "0xb24D456804189cf62cd319b69E5934F795D78CAF";
const STAKE_CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_timeReward",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_rewardPercent",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ClaimRewardEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "StakeEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "UnstakeEvent",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "Stake",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "stakeTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_stakeTime",
        "type": "uint256"
      }
    ],
    "name": "_dayRewardCalc",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_rewardPercent",
        "type": "uint256"
      }
    ],
    "name": "changeRewardPercentage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_timeReward",
        "type": "uint256"
      }
    ],
    "name": "changeTimeReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "depositOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "ownerWithdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reward",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rewardPercent",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "stake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "timeReward",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unSatke",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const stakeContract = new web3.eth.Contract(
  STAKE_CONTRACT_ABI,
  STAKE_CONTRACT_ADDRESS
);
const tokenContract = new web3.eth.Contract(
  TOKEN_CONTRACT_ABI,
  TOKEN_CONTRACT_ADDRESS
);
var address;

async function connect() {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      address = accounts[0];

      var shortAddress = shortenWalletAddress(address);

      document.getElementById("wallet-address").textContent = shortAddress;

      UserBalance();
      checkReward();
      calculateAPR();

      document.getElementById('connect-button').style.display='none'
      document.getElementById('user-wallet').style.display='flex'

      let userTokenBalance=await tokenContract.methods.balanceOf(address).call({from:address})
      userTokenBalance=userTokenBalance/10**TOKEN_DECIAML
      document.getElementById('user-balance').textContent=`${userTokenBalance} ANS`
    } else {
    }
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var fullAddress = "0x8881860A5943685417eFf2b5370F7Eeb0c6873EC";

  var shortAddress = shortenWalletAddress(fullAddress);

  document.getElementById("wallet-address").textContent = shortAddress;
});

function shortenWalletAddress(address) {
  var length = address.length;
  var firstPart = address.slice(0, 6);
  var lastPart = address.slice(length - 4, length);
  return firstPart + "..." + lastPart;
}

async function disconnect() {
  try {
    if (window.ethereum) {
      await window.ethereum.clearCachedProvider();

      console.log("Permissions removed:", removedPermissions);
    }
  } catch (err) {
    console.log(err);
  }
}

async function stake() {
  const amount=10
  const stakeAmount=amount*10**TOKEN_DECIAML;
  const approveResult=await approveContract(amount);
  if(approveResult){
    const stakeTransaction = await stakeContract.methods
    .stake(stakeAmount)
    .send({ from: address })
    .on("transactionHash", (hash) => {
      loading();
      console.log("Transaction Hash:", hash);
    })
    .on("confirmation", (confirmationNumber, receipt, hash) => {
      if (confirmationNumber === 0) {
        showSuccess("You have SuccessFuly Stake in Site");
        
        UserBalance();
        checkReward();
        calculateAPR();
      }
    })
    .on("error", (error) => {
      console.error("Error:", error);
      showError(error.message);
    });
    console.log(stakeTransaction.address);
  }
}

async function UserBalance() {
  const userBalance = await stakeContract.methods
    .Stake(address)
    .call({ from: address });
  const userBalanceTag = document.getElementById("userBalance");
  userBalanceTag.textContent = `${userBalance.amount/10**TOKEN_DECIAML} ANS`;
}

async function calculateAPR(){
  try{
    const userBalance = await stakeContract.methods
    .Stake(address)
    .call({ from: address });

    const userBalanceWithReward=await stakeContract.methods.getBalance().call({from:address})

    document.getElementById('APR-percent').textContent=`${(userBalanceWithReward*100)/userBalance.amount} %`
  }
  catch(err){
    showError(err)
  }
}

async function Unstake() {
  try{
    await stakeContract.methods
    .unSatke()
    .send({ from: address })
    .on("transactionHash", (hash) => {
      loading();
      console.log(hash);
      UserBalance();
    })
    .on("confirmation", (confirmationNumber, receipt) => {
      if (confirmationNumber === 0) {
        showSuccess("You have SuccessFuly UnStake Your Balance");
        UserBalance();
      }
    })
    .on("error", (err) => {
      console.log(err.message);
    });
  }
  catch(err){
    showError(err)
  }
}

async function checkReward() {
  try {
    const reward = await stakeContract.methods.reward().call({ from: address , gas: 500000});

    document.getElementById("userReward").textContent = `${reward/10**TOKEN_DECIAML} ANS`;
  } catch (err) {
    console.log(err);
  }
}

async function withdrawReward() {
  try {
    await stakeContract.methods
      .withdrawReward()
      .send({ from: address })
      .on("transactionHash", (hash) => {
        loading();
        console.log(hash);
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        if (confirmationNumber === 0) {
          showSuccess("You have successfully withdrawn your reward");
          checkReward();
        }
      })
      .on("error", (err) => {
        console.error("Error:", err);

        if (err.message.includes("execution reverted")) {
          const errorMessage = "You can't withdraw your reward at this time";
          showError(errorMessage)
        } else {
          showError("Unhandled error:", err);
        }
      });
  } catch (err) {
    console.log(err);
  }
}

async function owner() {
  const owner = await contract.methods.getOwner().call();
  window.alert(owner);
  return owner;
}

async function depositOwner() {
  const owner = await contract.methods.getOwner().call();
  if (address != owner) {
    showError("You are not the owner of the Site");
  } else {
    const etherValue = document.getElementById("depositOwner").value;
    const valueInWei = web3.utils.toWei(etherValue.toString(), "ether");
    await contract.methods
      .depositOwner()
      .send({ from: address, value: valueInWei })
      .on("transactionHash", (hash) => {
        loading();
        console.log("TransactionHash", hash);
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        if (confirmationNumber === 0) {
          showSuccess("You have successfully deposit in contract");
          checkReward();
        }
      });
  }
}

function showError(message) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    customClass: {
      popup: "my-error-popup",
    },
  });
}

function showSuccess(message) {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    customClass: {
      popup: "my-error-popup",
    },
  });
}

function checkTheOwner(sender, owner) {
  if (sender != owner) {
    showError("You are not the owner of the Site");
    return false;
  } else {
    return true;
  }
}

function loading() {
  //   document.body.classList.add("blur");
  const blurElements = document.querySelectorAll(
    "body > *:not(.my-loading-popup)"
  );
  blurElements.forEach((element) => {
    element.classList.add("blur");
  });

  const loadingPopup = Swal.fire({
    title: "Transaction In Process...",
    customClass: {
      popup: "my-loading-popup",
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    html: '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>',
  });

  setTimeout(() => {
    loadingPopup.close();
    blurElements.forEach((element) => {
      element.classList.remove("blur");
    });
  }, 16000);
}

async function changeTimeReward() {
  const owner = await contract.methods.getOwner().call();
  if (address != owner) {
    showError("You are not the owner of the Site");
  } else {
    const timeReward = document.getElementById("changeTimeReward").value;
    await contract.methods
      .changeTimeReward(timeReward)
      .send({ from: address })
      .on("transactionHash", (hash) => {
        loading();
      })
      .on("confirmation", (confirmationNumber) => {
        if (confirmationNumber === 0) {
          showSuccess(
            "You are successfuly updated the TimeReward of the contract"
          );
        }
      })
      .on("error", (err) => {
        showError(err);
      });
  }
}

async function changeProfitPercent() {
  const owner = await contract.methods.getOwner().call();
  if (address != owner) {
    showError("You are not the owner of the Site");
  } else {
    const timeReward = document.getElementById("changeProfitPercent").value;
    await contract.methods
      .changeRewardPercentage(timeReward)
      .send({ from: address })
      .on("transactionHash", (hash) => {
        loading();
      })
      .on("confirmation", (confirmationNumber) => {
        if (confirmationNumber === 0) {
          showSuccess(
            "You are successfuly updated the TimeReward of the contract"
          );
        }
      })
      .on("error", (err) => {
        showError(err);
      });
  }
}

function transactionOrder(order, trasnactionHash) {
  const newOrder = document.createElement("div");
  newOrder.innerHTML = `
  <div class="statedtoken">
    <h3>Order:</h3>
    <h4>${order}</h4>
    <h3>TransactionHash:</h3>
    <h4>${trasnactionHash}</h4>
    <a href="https://mumbai.polygonscan.com/tx/${trasnactionHash}" class="btn" style="text-align: center;">Check Transaction</a>
 </div>`;
  document.getElementById("stakeorders").appendChild(newOrder);
}

async function withdrawOwner() {
  try {
    const owner = await contract.methods.getOwner().call();
    if (address != owner) {
      showError("You are not the owner of the Site");
    } else {
      const valueInether = document.getElementById("withdrawOwner").value;
      const valueInWei = web3.utils.toWei(valueInether.toString(), "ether");
      await contract.methods
        .ownerWithdraw(valueInWei)
        .send({ from: address })
        .on("transactionHash", (hash) => {
          loading();
          transactionOrder("owner Withdraw", hash);
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          if (confirmationNumber === 0) {
            showSuccess("You have successfully withdraw the desired amount");
          }
        })
        .on("error", (error) => {
          console.error("Error:", error);
        });
    }
  } catch (err) {
    console.log(err);
  }
}


async function approveContract(amount) {
  const approveAmount = amount * 10 ** TOKEN_DECIAML;
  let isSuccessed=true
  if (address) {
    await tokenContract.methods
      .approve(STAKE_CONTRACT_ADDRESS,approveAmount)
      .send({ from: address })
      .on("transactionHash", (hash) => {
        loading();
        console.log("Transaction Hash:", hash);
        isSuccessed=true
      })
      .on("confirmation", (confirmationNumber, receipt, hash) => {
        if (confirmationNumber === 0) {
          showSuccess("You have SuccessFuly approved the contract");
          isSuccessed=true
        }
      })
      .on("error", (err) => {
        console.error("Error:", err);
        showError(err);
        isSuccessed=false
      });
  } else {
    // console.error("Error:", error);
    showError("Please connect your wallet");
    isSuccessed=false
  }
  return isSuccessed
}

async function redirectToContract(){
  try{
    window.location.href=`https://mumbai.polygonscan.com/address/${STAKE_CONTRACT_ADDRESS}`
  }
  catch(err){
    console.log(err)
  }
}
