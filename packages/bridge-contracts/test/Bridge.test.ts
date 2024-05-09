import { ethers } from "hardhat";
import { Bridge } from "../typechain-types";
import { expect } from "chai";
import { deployContract } from "../testHelper";

describe("Bridge", function () {
  let bridge: Bridge;

  beforeEach(async function () {
    bridge = await deployContract("Bridge");
  });

  describe("deposit", function () {
    it("should allow depositing ETH", async function () {
      const depositAmount = ethers.utils.parseEther("1");
      await bridge.deposit({ value: depositAmount });
      expect(await bridge.balanceOf(await ethers.getSigner().getAddress())).to.equal(depositAmount);
    });

    // Add more tests here
  });

  // Add more test cases here
});
