
import BigNumber from "bignumber.js";
import { getContract } from "./web3";
import erc20 from "./abis/erc20.json";

const WIGO = "0xE992bEAb6659BFF447893641A378FbbF031C5bD6";

const contract = getContract(erc20, WIGO);

export const getTotalSupply = async (): Promise<BigNumber> => {
  const supply = await contract.methods.totalSupply().call();

  return new BigNumber(supply);
};