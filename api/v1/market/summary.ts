import { VercelRequest, VercelResponse } from "@vercel/node";
import { getAddress } from "@ethersproject/address";
import { getTopPairs } from "../../../utils";

interface ReturnShape {
  [tokenIds: string]: {
    base_id: string;
    base_name: string;
    base_symbol: string;
    quote_id: string;
    quote_name: string;
    quote_symbol: string;
    last_price: string;
    base_volume: string;
    quote_volume: string;
  };
}

export default async function (req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const topTickers = await getTopPairs();

    const tickers = topTickers.reduce<ReturnShape>((summary, ticker): ReturnShape => {
      const t0Id = getAddress(ticker.token0.id);
      const t1Id = getAddress(ticker.token1.id);

      summary[`${t0Id}_${t1Id}`] = {
        base_id: t0Id,
        base_name: ticker.token0.name,
        base_symbol: ticker.token0.symbol,
        quote_id: t1Id,
        quote_name: ticker.token1.name,
        quote_symbol: ticker.token1.symbol,
        last_price: ticker.price ? ticker.price : "0",
        base_volume: ticker.volumeToken0,
        quote_volume: ticker.volumeToken1,
      };

      return summary;
    }, {});

    res.json(tickers);
  } catch (error) {
    res.json(error);
  }
}
