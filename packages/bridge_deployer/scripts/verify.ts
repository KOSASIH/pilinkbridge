import { ethers } from "hardhat";
import { Bridge, BridgeFactory } from "../typechain";

async function main() {
  const provider = ethers.provider;
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];

  console.log("Verifying contracts with account:", deployer.address);

  const bridgeFactoryAddress = "0x1234567890123456789012345678901234567890"; // replace with actual address
  const bridgeAddress = "0x9876543210987654321098765432109876543210"; // replace with actual address

  const bridgeFactory = await ethers.getContractFactory("BridgeFactory");
  const bridgeFactoryContract = await bridgeFactory.attach(bridgeFactoryAddress);

  const bridge = await ethers.getContractFactory("Bridge");
  const bridgeContract = await bridge.attach(bridgeAddress);

  console.log("Verifying BridgeFactory contract...");
  await hre.run("verify:verify", {
    address: bridgeFactoryAddress,
    constructorArguments: [],
  });

  console.log("Verifying Bridge contract...");
  await hre.run("verify:verify", {
    address: bridgeAddress,
    constructorArguments: [bridgeFactoryContract.address],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
