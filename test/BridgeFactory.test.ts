import { ethers } from "hardhat";
import { BridgeFactory } from "../typechain/BridgeFactory";

describe("BridgeFactory", () => {
  let bridgeFactory: BridgeFactory;

  beforeEach(async () => {
    const BridgeFactory = await ethers.getContractFactory("BridgeFactory");
    bridgeFactory = await BridgeFactory.deploy();
    await bridgeFactory.deployed();
  });

  it("should allow creating a new bridge", async () => {
    const bridge = await bridgeFactory.createBridge();
    expect(bridge.address).to.not.equal(ethers.constants.AddressZero);
  });
});
