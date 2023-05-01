require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */


//......................get the provider and private key from .env file.....................
const BSC_RPC_URL= process.env.BSC_RPC_URL;
const PRIVATE_KEY= process.env.PRIVATE_KEY;


module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    BSC:{
      url:BSC_RPC_URL,
      accounts:[PRIVATE_KEY],
      chainId:97
    }
  },
  solidity: "0.8.17",
};
