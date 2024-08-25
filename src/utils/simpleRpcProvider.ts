import { ethers } from "ethers";

const RPC_URL = "https://arb1.arbitrum.io/rpc";

const simpleRpcProvider = new ethers.providers.StaticJsonRpcProvider(RPC_URL, 42161);

export default simpleRpcProvider;
