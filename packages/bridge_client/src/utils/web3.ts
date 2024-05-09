import { ethers } from "ethers";

export async function getWeb3Provider(): Promise<ethers.providers.Web3Provider> {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  return provider;
}
