import { ethers } from "ethers";
import { ChainlinkBridge } from "../typechain-types";

export class BridgeApi {
  private provider: ethers.providers.Provider;
  private contractAddress: string;
  private contract: ChainlinkBridge;

  constructor(provider: ethers.providers.Provider, contractAddress: string) {
    this.provider = provider;
    this.contractAddress = contractAddress;
    this.contract = new ethers.Contract(this.contractAddress, ChainlinkBridge.abi, this.provider);
  }

  public async getBalance(address: string): Promise<string> {
    return await this.contract.balanceOf(address);
  }

  public async deposit(amount: string): Promise<ethers.ContractTransaction> {
    return await this.contract.deposit({ value: amount });
  }

  public async withdraw(amount: string): Promise<ethers.ContractTransaction> {
    return await this.contract.withdraw(amount);
  }
  }
