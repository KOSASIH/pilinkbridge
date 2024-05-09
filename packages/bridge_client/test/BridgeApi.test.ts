import { ethers } from "ethers";
import { BridgeApi } from "../src/BridgeApi";

describe("BridgeApi", () => {
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const contractAddress = "0x1234567890123456789012345678901234567890";
  const bridgeApi = new BridgeApi(provider, contractAddress);

  describe("getBalance", () => {
    it("should return the balance of an address", async () => {
      const myAddress = "0x1234567890123456789012345678901234567890";
      const balance = await bridgeApi.getBalance(myAddress);
      expect(balance).toBeGreaterThan(0);
    });
  });

  describe("deposit", () => {
    it("should deposit Ether to the contract", async () => {
      const myAddress = "0x1234567890123456789012345678901234567890";
      const depositAmount = ethers.utils.parseEther("1.0");
      const depositTx = await bridgeApi.deposit(depositAmount);
      expect(depositTx).toBeDefined();
      expect(depositTx.hash).toBeDefined();
      const receipt = await provider.waitForTransaction(depositTx.hash);
      expect(receipt).toBeDefined();
      expect(receipt.status).toEqual(1);
    });
  });

  describe("withdraw", () => {
    it("should withdraw Ether from the contract", async () => {
      const myAddress = "0x1234567890123456789012345678901234567890";
      const withdrawAmount = ethers.utils.parseEther("0.5");
      const withdrawTx = await bridgeApi.withdraw(withdrawAmount);
      expect(withdrawTx).toBeDefined();
      expect(withdrawTx.hash).toBeDefined();
      const receipt = await provider.waitForTransaction(withdrawTx.hash);
      expect(receipt).toBeDefined();
      expect(receipt.status).toEqual(1);
    });
  });
});
