import { VercelRequest, VercelResponse } from "@vercel/node";
import { getLockedWigo, getTotalSupply, maxSupply } from "../../utils/supply";

import formatNumber from "../../utils/formatNumber";

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  let totalSupply = await getTotalSupply();
  totalSupply = totalSupply.div(1e18);

  let lockedWigo = await getLockedWigo();
  lockedWigo = lockedWigo.div(1e18);

  const totalBurnedTokens = 0;

  const circulatingSupply = totalSupply.minus(lockedWigo);

  if (req.query?.q === "totalSupply") {
    res.json(totalSupply.toNumber());
  } else if (req.query?.q === "circulatingSupply") {
    res.json(circulatingSupply.toNumber());
  } else if (req.query?.verbose) {
    res.json({
      totalSupply: formatNumber(totalSupply.toNumber()),
      circulatingSupply: formatNumber(circulatingSupply.toNumber()),
      lockedWigo: formatNumber(lockedWigo.toNumber()),
      maxSupply: formatNumber(maxSupply),
    });
  } else {
    res.json({
      totalSupply: totalSupply.toNumber(),
      burnedSupply: totalBurnedTokens,
      circulatingSupply: circulatingSupply.toNumber(),
    });
  }
};
