require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */


//......................get the provider and private key from .env file.....................
const AMOY_RPC_URL= process.env.AMOY_RPC_URL;
const PRIVATE_KEY= process.env.PRIVATE_KEY;


module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    hardhat:{},
    amoy:{
      url:AMOY_RPC_URL,
      accounts:[PRIVATE_KEY],
      chainId:80002,
      ens:false
    }
  },
  solidity: "0.8.20",
  etherscan:{
    apikey:{
      amoy:process.env.AMOY_API_KEY
    }
  }
};
