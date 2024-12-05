require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",  // This connects to the Hardhat node
    },
    sepolia:{
      url: "https://eth-sepolia.g.alchemy.com/v2/N2EUMkuqU2JqyiNsoMBFumwh4BYw41dm",
      accounts: ["e30d29df952d96c7314cc11c8fe38aa8ca93e22e56b63d3aed4a7cb122a28795"]
    }
  },
};

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});