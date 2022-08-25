import BigNumber from "bignumber.js";
import { getContract, getBalance } from "./web3";
import erc20 from "./abis/erc20.json";

const WIGO = "0xE992bEAb6659BFF447893641A378FbbF031C5bD6";
const SEED1 = "0xa3b6ca020da0861017ff4906C435Da268efB50Db";
const SEED2 = "0x515be0F005e657222D059C764726895598F0a911";

const Seed1LockedTokens = getBalance(erc20, WIGO, SEED1);
const Seed2LockedTokens = getBalance(erc20, WIGO, SEED2);

const contract = getContract(erc20, WIGO);

export const getTotalSupply = async (): Promise<BigNumber> => {
  const supply = await contract.methods.totalSupply().call();

  return new BigNumber(supply);
};

export const getLockedWigo = async (): Promise<BigNumber> => {
  const lockedAmount = (await Seed1LockedTokens).plus(await Seed2LockedTokens);
  return new BigNumber(lockedAmount);
};

export const maxSupply = 2000000000;
