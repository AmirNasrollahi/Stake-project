const web3 = new Web3(window.ethereum);

const AIRDROP_CONTRACT_ADDRESS = "0x663be0c5eB04532c13e05B28555739bB11D99A9F";
const AIRDROP_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountPerUser",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "AirdropDistributed",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "alreadyGetToken",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "amountPerUser",
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
    name: "getToken",
    outputs: [],
    stateMutability: "nonpayable",
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

const airdropContract = new web3.eth.Contract(
  AIRDROP_CONTRACT_ABI,
  AIRDROP_CONTRACT_ADDRESS
);
var address;

async function connect() {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      address = accounts[0];
    }
  } catch (error) {
    showError("Error connecting to MetaMask");
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

function loading() {
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


async function getAirdropToken(){
    try{
      await airdropContract.methods
        .getToken()
        .send({ from: address })
        .on("transactionHash", (hash) => {
          loading();
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          if (confirmationNumber === 0) {
            showSuccess("You have successfully Claim Your airdrop");
          }
        })
        .on("error", (err) => {
          console.error("Error");
        })
    }
    catch(err){
      showError("Erro",err);
    }
  }

  async function redirectToStaking(){
    try{
        window.location.href=`./index.html`
      }
      catch(err){
        console.log(err)
      }
  }