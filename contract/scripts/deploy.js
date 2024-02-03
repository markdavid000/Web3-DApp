// deploy.js
const hre = require("hardhat");

async function main() {
  // const [deployer] = await hre.ethers.getSigners();

  // console.log("Deploying contracts with the account:", deployer.address);

  const MyMessage = await hre.ethers.getContractFactory("MyMessage");
  const myMessage = await MyMessage.deploy("Hello, Sepolia!");

  console.log("MyMessage deployed to:", myMessage.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
