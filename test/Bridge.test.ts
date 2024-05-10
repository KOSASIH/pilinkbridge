import { ethers } from "hardhat";
import { Bridge } from "../typechain/Bridge";

describe("Bridge", () => {
  let bridge: Bridge;

  beforeEach(async () => {
    const Bridge = await ethers.getContractFactory("Bridge");
    bridge = await Bridge.deploy();
    await bridge.deployed();
  });

  it("should have a name", async () => {
    const name = await bridge.name();
    expect(name).to.equal("Pi Network Bridge");
  });

  it("should have a symbol", async () => {
    const symbol = await bridge.symbol();
    expect(symbol).to.equal("PIB");
  });

  it("should have 18 decimals", async () => {
    const decimals = await bridge.decimals();
    expect(decimals).to.equal(18);
  });
});
