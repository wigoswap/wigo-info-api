import { VercelRequest, VercelResponse } from "@vercel/node";
import { getAddress } from "@ethersproject/address";
import { getTopPairs } from "../../../utils";

interface ReturnShape {
  [tokenAddress: string]: {
    id: string;
    name: string;
    symbol: string;
    maker_fee: string;
    taker_fee: string;
  };
}

export default async function (req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const topPairs = await getTopPairs();

    const assets = topPairs.reduce<ReturnShape>((asset, pair): ReturnShape => {
      for (const token of [pair.token0, pair.token1]) {
        const tId = getAddress(token.id);

        asset[tId] = {
          id: tId,
          name: token.name,
          symbol: token.symbol,
          maker_fee: "0",
          taker_fee: "0.0019",
        };
      }

      return asset;
    }, {});

    res.json(assets);
  } catch (error) {
    res.json(error);
  }
}
