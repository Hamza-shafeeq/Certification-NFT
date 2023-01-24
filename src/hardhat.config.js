require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
const {API_URL, PRIVATE_KEY} = process.env;
module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {
    },
    mumbai: {
      url: API_URL,
      accounts:[`0x${PRIVATE_KEY}`]
    }
  },  
  etherscan: {
    apiKey: {
      polygonMumbai: '46XVWARADQ1TT1YUJCVJ4GPTFT5AMI8NUV'
    }
  },
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}