import BigNumber from "bignumber.js";
import { getContract, getBalance } from "./web3";
import erc20 from "./abis/erc20.json";

const WIGO = "0xE992bEAb6659BFF447893641A378FbbF031C5bD6";
const CORE_TEAM_LOCK = "0xB7ff43C3D9E68F6a625868c730C05BC49f00e428";

const CoreTeamLockedTokens = getBalance(erc20, WIGO, CORE_TEAM_LOCK);

const contract = getContract(erc20, WIGO);

export const getTotalSupply = async (): Promise<BigNumber> => {
  const supply = await contract.methods.totalSupply().call();

  return new BigNumber(supply);
};

export const getLockedWigo = async (): Promise<BigNumber> => {
  const lockedAmount = await CoreTeamLockedTokens;
  return new BigNumber(lockedAmount);
};

export const maxSupply = 2000000000;
