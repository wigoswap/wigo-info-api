import { VercelRequest, VercelResponse } from "@vercel/node";
import { getTotalSupply } from "../../utils/supply";

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  let circulatingSupply = await getTotalSupply();
  circulatingSupply = circulatingSupply.div(1e18);

  res.send(circulatingSupply.toNumber())
};