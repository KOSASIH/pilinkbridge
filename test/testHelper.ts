import { ethers } from "hardhat";

export const mineBlock = async (confirmations: number = 1) => {
  for (let i = 0; i < confirmations; i++) {
    await ethers.provider.send("evm_mine", []);
  }
};

export const increaseTime = async (duration: number) => {
  await ethers.provider.send("evm_increaseTime", [duration]);
  await mineBlock();
};

export const setNextBlockTimestamp = async (timestamp: number) => {
await ethers.provider.send("evm_setNextBlockTimestamp", [timestamp]);
  await mineBlock();
};
