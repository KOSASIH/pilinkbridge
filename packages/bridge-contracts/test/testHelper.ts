import { ethers } from "hardhat";

export async function deployContract(contractName: string): Promise<any> {
  const contractFactory = await ethers.getContractFactory(contractName);
  return await contractFactory.deploy();
}
