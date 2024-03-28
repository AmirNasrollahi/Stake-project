require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */


//......................get the provider and private key from .env file.....................
const POL_RPC_URL= process.env.BSC_RPC_URL;
const PRIVATE_KEY= process.env.PRIVATE_KEY;


module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    hardhat:{},
    mumbai:{
      url:"https://polygon-testnet-rpc.allthatnode.com",
      accounts:["841f4a07b59cfa1357fac5ecb69b5fb9ed24b477fac3c351e1e6ec1b27eb18e0"],
      chainId:80001,
      ens:false
    }
  },
  solidity: "0.8.20",
};
