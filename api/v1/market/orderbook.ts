import { getAddress } from "@ethersproject/address";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { getOrderBook } from "../../../utils";
import { return400 } from "../../../utils/response";

export default async function (req: VercelRequest, res: VercelResponse): Promise<void> {
  if (
    !req.query.marketPair ||
    typeof req.query.marketPair !== "string" ||
    !req.query.marketPair.match(/^0x[0-9a-fA-F]{40}_0x[0-9a-fA-F]{40}$/)
  ) {
    return400(res, "Invalid market_pair identifier: must be of format tokenAddress_tokenAddress");
    return;
  }

  try {
    const [tA, tB] = req.query.marketPair.split("_");
    const tokenA = getAddress(tA);
    const tokenB = getAddress(tB);
    const orderbook = await getOrderBook(tokenA, tokenB, 10000);
    const dataRes = {
      timestamp: new Date().getTime(),
      ...orderbook,
    };
    res.json(dataRes);
  } catch (error) {
    res.json(error);
  }
}
