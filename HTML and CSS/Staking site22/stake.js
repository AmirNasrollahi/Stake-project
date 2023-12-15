const web3 = new Web3(window.ethereum);

const contractAddress = "0x157cB4a6e607763691Dbe34a5026fA4F700c4310";
const contractAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rewardPercent",
        type: "uint256",
      },
    ],
    name: "changeRewardPercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_timeReward",
        type: "uint256",
      },
    ],
    name: "changeTimeReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "depositOwner",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "ownerWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_timeReward",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_rewardPercent",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "stake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "unSatke",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_stakeTime",
        type: "uint256",
      },
    ],
    name: "_dayRewardCalc",
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
    name: "getBalance",
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
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reward",
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
    name: "rewardPercent",
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
        name: "",
        type: "address",
      },
    ],
    name: "Stake",
    outputs: [
      {
        internalType: "address payable",
        name: "userAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "stakeTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "timeReward",
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
];
const contract = new web3.eth.Contract(contractAbi, contractAddress);
var address;

async function connect() {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      address = accounts[0];

      const wallet = document.getElementById("wallet");
      wallet.style.color = "rgb(113, 210, 171)";
      wallet.textContent = address;

      UserBalance();
      checkReward();
    } else {
    }
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
  }
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
  const etherValue = 0.1;
  const valueInWei = web3.utils.toWei(etherValue.toString(), "ether");
  //   const valueInFinney = web3.utils.fromWei(valueInWei, "finney");
  const transaction = await contract.methods
    .stake()
    .send({ from: address, value: valueInWei })
    .on("transactionHash", (hash) => {
      loading();
      console.log("Transaction Hash:", hash);
    })
    .on("confirmation", (confirmationNumber, receipt) => {
      if (confirmationNumber === 0) {
        showSuccess("You have SuccessFuly Stake in Site");
        UserBalance();
      }
    })
    .on("error", (error) => {
      console.error("Error:", error);
      // Handle transaction errors here
    });
}

async function UserBalance() {
  const userBalance = await contract.methods
    .getBalance()
    .call({ from: address });
  const userBalanceInWei = web3.utils.fromWei(userBalance, "ether");
  const userBalanceTag = document.getElementById("userBalance");
  userBalanceTag.textContent = `${userBalanceInWei} WWS`;
}

async function Unstake() {
  await contract.methods
    .unSatke()
    .send({ from: address })
    .on("transactionHash", (hash) => {
        loading()
      console.log(hash);
      userBalance();
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

async function checkReward() {
  try {
    const reward = await contract.methods.reward().call({ from: address });
    document.getElementById("userReward").textContent = `${reward} WWS`;
  } catch (err) {
    console.log(err);
  }
}

async function withdraw() {
  try {
    const etherAmount = document.getElementById("amountWithdraw").value;
    const weiAmount = web3.utils.toWei(etherAmount.toString(), "ether");
    await contract.methods
      .withdraw(weiAmount)
      .send({ from: address })
      .on("transactionHash", (hash) => {
        loading()
        console.log(hash);
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        if (confirmationNumber === 0) {
          showSuccess("You have successfully withdraw the desired amount");
          UserBalance();
        }
      })
      .on("error", (error) => {
        console.error("Error:", error);
      });
  } catch (err) {
    console.log(err);
  }
}

async function withdrawReward() {
  try {
    await contract.methods
      .withdrawReward()
      .call({ from: address })
      .on("transactionHash",(hash)=>{
        loading()
        console.log(hash)
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        if (confirmationNumber === 0) {
          showSuccess("You have successfully withdrawn your profit");
          checkReward();
        }
      })
    .on("error", (err) => {
      console.error("Error:", err);

      if (err.message.includes("execution reverted")) {
        const errorMessage =
          "You can't withdraw your reward at this time";
        window.alert(errorMessage);
      } else {
        console.error("Unhandled error:", err);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

async function owner() {
  const owner = await contract.methods.getOwner().call();
  window.alert(owner);
}

async function depositOwner() {
  const owner = await contract.methods.getOwner().call();
  if (address != owner) {
    showError("You are not the owner of the Site");
  } 
  else {
    const etherValue = document.getElementById("depositOwner").value;
    const valueInWei = web3.utils.toWei(etherValue.toString(), "ether");
    await contract.methods
      .depositOwner()
      .send({ from: address, value: valueInWei })
      .on("transactionHash", (hash) => {
        loading()
        console.log("TransactionHash", hash);
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        if (confirmationNumber === 0) {
          showSuccess("You have successfully deposit in contract");
          checkReward();
        }
      })
  }
}

function showError(message) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    customClass: {
      popup: "my-error-popup",
      //   class:my-error-popup
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
