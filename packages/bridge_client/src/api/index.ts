import { ethers } from "ethers";
import { BridgeApi } from "./BridgeApi";
import { ChainlinkBridge } from "../typechain-types";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const contractAddress = "0x1234567890123456789012345678901234567890";

const contract = new ethers.Contract(contractAddress, ChainlinkBridge.abi, provider);

export const bridgeApi = new BridgeApi(provider, contractAddress);
