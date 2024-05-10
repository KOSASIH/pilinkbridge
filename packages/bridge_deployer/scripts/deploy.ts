import { ethers } from "hardhat";
import { Bridge, BridgeFactory } from "../typechain";

async function main() {
  const provider = ethers.provider;
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];

  console.log("Deploying contracts with account:", deployer.address);

  const bridgeFactory = await ethers.getContractFactory("BridgeFactory", deployer);
  const bridgeFactoryContract = await bridgeFactory.deploy();
  await bridgeFactoryContract.deployed();

  console.log("BridgeFactory deployed to:", bridgeFactoryContract.address);

  const bridge = await ethers.getContractFactory("Bridge", deployer);
  const bridgeContract = await bridge.deploy(bridgeFactoryContract.address);
  await bridgeContract.deployed();

  console.log("Bridge deployed to:", bridgeContract.address);

  await bridgeFactoryContract.setBridge(bridgeContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
