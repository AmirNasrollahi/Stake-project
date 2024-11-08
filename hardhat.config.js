require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const AMOY_RPC_URL = process.env.AMOY_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const AMOY_API_KEY = process.env.AMOY_API_KEY;

const GANACHE_RPC_URL = process.env.GANACHE_RPC_URL;
const GANACHE_PRIVATE_KEY = process.env.GANACHE_PRIVATE_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    amoy: {
      url: AMOY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 80002,
      ens: false,
    },
    ganache: {
      url: GANACHE_RPC_URL,
      accounts: [GANACHE_PRIVATE_KEY],
      chainId: 1337,
    },
  },
  solidity: "0.8.20",
  etherscan: {
    apikey: {
      amoy: 'SZCWVUQJFHJW3CIYVSRQNJEZRM7ZAUJ8IA',
    },
    customChains: [
      {
        network: "amoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com",
        },
      },
    ],
  },
};
