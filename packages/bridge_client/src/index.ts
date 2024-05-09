import { ethers } from "ethers";
import { BridgeApi } from "./BridgeApi";
import { ChainlinkBridge } from "../typechain-types";
import { getWeb3Provider } from "./utils/web3";

const provider = getWeb3Provider();
const contractAddress = "0x1234567890123456789012345678901234567890";

const contract = new ethers.Contract(contractAddress, ChainlinkBridge.abi, provider);

export const bridgeApi = new BridgeApi(provider, contractAddress);
