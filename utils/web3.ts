import Web3 from "web3";

const FTM_NODE_RPC = ["https://rpc.ftm.tools"];

const FTM_ARCHIVE_NODE_RPC = ["https://rpc.ftm.tools"];

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
