import Web3 from "web3";
import BigNumber from "bignumber.js";

const FTM_NODE_RPC = ["https://rpc.ankr.com/fantom"];

const FTM_ARCHIVE_NODE_RPC = ["https://rpc.ankr.com/fantom"];

export const getWeb3 = (archive = false): Web3 => {
  const provider: string = archive
    ? FTM_ARCHIVE_NODE_RPC[Math.floor(Math.random() * FTM_ARCHIVE_NODE_RPC.length)]
    : FTM_NODE_RPC[Math.floor(Math.random() * FTM_NODE_RPC.length)];

  return new Web3(new Web3.providers.HttpProvider(provider, { timeout: 30000 }));
};

export const getContract = (abi: any, address: string, archive = false) => {
  const web3: Web3 = getWeb3(archive);

  return new web3.eth.Contract(abi, address);
};

export const getBalance = async (
  abi: any,
  tokenAddress: string,
  walletAddress: string,
  archive = false
): Promise<BigNumber> => {
  const web3: Web3 = getWeb3(archive);
  const contract = new web3.eth.Contract(abi, tokenAddress);
  const balance = await contract.methods.balanceOf(walletAddress).call();
  return new BigNumber(balance);
};
