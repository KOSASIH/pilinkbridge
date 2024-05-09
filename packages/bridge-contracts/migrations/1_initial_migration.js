const { deployments, ethers, network } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { verify } = require("../../utils/verify");

const BridgeToken = artifacts.require("BridgeToken");
const BridgeFactory = artifacts.require("BridgeFactory");
const Bridge = artifacts.require("Bridge");

module.exports = async function ({
  getNamedAccounts,
  deployments: { deploy, log },
}) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // Deploy BridgeToken
  await deploy("BridgeToken", {
    from: deployer,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  const bridgeToken = await BridgeToken.deployed();
  console.log("BridgeToken deployed to:", bridgeToken.address);

  // Deploy BridgeFactory
  await deploy("BridgeFactory", {
    from: deployer,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
    args: [bridgeToken.address],
  });
  const bridgeFactory = await BridgeFactory.deployed();
  console.log("BridgeFactory deployed to:", bridgeFactory.address);

  // Deploy Bridge
  await deploy("Bridge", {
    from: deployer,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
    args: [
      bridgeToken.address,
      "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // Chainlink PI/ETH price feed address
      1000000000000000000, // Min price
      2000000000000000000, // Max price
    ],
  });
  const bridge = await Bridge.deployed();
  console.log("Bridge deployed to:", bridge.address);

  // Verify contracts
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying contracts...");
    await verify(bridgeToken.address, []);
    await verify(bridgeFactory.address, [bridgeToken.address]);
    await verify(bridge.address, [
      bridgeToken.address,
      "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // Chainlink PI/ETH price feed address
      1000000000000000000, // Min price
      2000000000000000000, // Max price
    ]);
  }
};

module.exports.tags = ["BridgeToken", "BridgeFactory", "Bridge"];
