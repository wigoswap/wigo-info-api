import { VercelRequest, VercelResponse } from "@vercel/node";
import { getSwaps } from "../../../utils";
import { return400 } from "../../../utils/response";
import BigNumber from "bignumber.js";
import { getAddress } from "@ethersproject/address";

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

    const swaps = await getSwaps(tokenA, tokenB);
    let dataRes = {};
    dataRes = swaps.map(
      (swap: {
        amount0In: string;
        amount0Out: string;
        amount1In: string;
        amount1Out: string;
        id: string;
        timestamp: string;
      }) => {
        const aIn = swap.amount0In !== "0";
        const aOut = swap.amount0Out !== "0";
        const bIn = swap.amount1In !== "0";
        const bOut = swap.amount1Out !== "0";

        // a is the base so if the pair sends a and not b then it's a 'buy'
        const isBuy = aOut && bIn && !aIn && !bOut;
        const isSell = !aOut && !bIn && aIn && bOut;
        const isBorrowBoth = aOut && bOut && aIn && bIn;

        const type = isBuy ? "buy" : isSell ? "sell" : isBorrowBoth ? "borrow-both" : "???";
        const baseAmount = aOut ? swap.amount0Out : swap.amount0In;
        const quoteAmount = bOut ? swap.amount1Out : swap.amount1In;
        return {
          trade_id: swap.id,
          type: type,
          trade_timestamp: swap.timestamp,
          base_volume: baseAmount,
          quote_volume: quoteAmount,
          price:
            baseAmount !== "0"
              ? new BigNumber(quoteAmount).dividedBy(new BigNumber(baseAmount)).toString()
              : undefined,
        };
      }
    );

    res.json(dataRes);
  } catch (error) {
    res.json(error);
  }
}
