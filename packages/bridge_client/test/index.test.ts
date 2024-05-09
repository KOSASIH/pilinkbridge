import { Web3Utils } from "../src/utils/web3";

describe("Web3Utils", () => {
  const provider = new Web3Utils(new ethers.providers.JsonRpcProvider("http://localhost:8545"));

  describe("getBlockNumber", () => {
    it("should return the current block number", async () => {
      const blockNumber = await provider.getBlockNumber();
      expect(blockNumber).toBeGreaterThan(0);
    });
  });

  describe("getBlock", () => {
    it("should return a block by its number", async () => {
      const blockNumber = await provider.getBlockNumber();
      const block = await provider.getBlock(blockNumber);
      expect(block).toBeDefined();
      expect(block.number).toEqual(blockNumber);
    });
  });

  describe("getTransaction", () => {
    it("should return a transaction by its hash", async () => {
      const transactionHash = "0x1234567890123456789012345678901234567890123456789012345678901234";
      const transaction = await provider.getTransaction(transactionHash);
      expect(transaction).toBeDefined();
      expect(transaction.hash).toEqual(transactionHash);
    });
  });

  describe("getTransactionReceipt", () => {
    it("should return a transaction receipt by its hash", async () => {
      const transactionHash = "0x1234567890123456789012345678901234567890123456789012345678901234";
      const receipt = await provider.getTransactionReceipt(transactionHash);
      expect(receipt).toBeDefined();
      expect(receipt.transactionHash).toEqual(transactionHash);
    });
  });
});
