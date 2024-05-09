import { ethers } from "hardhat";
import { BridgeFactory } from "../typechain-types";
import { expect } from "chai";
import { deployContract } from "../testHelper";

describe("BridgeFactory", function () {
  let bridgeFactory: BridgeFactory;

  beforeEach(async function () {
    bridgeFactory = await deployContract("BridgeFactory");
  });

  describe("createBridge", function () {
    it("should create a new Bridge contract", async function () {
      const bridge = await bridgeFactory.createBridge();
      expect(bridge.address).to.not.equal(ethers.constants.AddressZero);
    });

    // Add more tests here
  });

  // Add more test cases here
});
