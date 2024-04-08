require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */


//......................get the provider and private key from .env file.....................
const POL_RPC_URL= process.env.POL_RPC_URL;
const PRIVATE_KEY= process.env.PRIVATE_KEY;


module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    hardhat:{},
    mumbai:{
      url:POL_RPC_URL,
      accounts:[PRIVATE_KEY],
      chainId:80001,
      ens:false
    }
  },
  solidity: "0.8.20",
};
