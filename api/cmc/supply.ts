import { VercelRequest, VercelResponse } from "@vercel/node";
import { getTotalSupply } from "../../utils/supply";

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  let totalSupply = await getTotalSupply();
  totalSupply = totalSupply.div(1e18);

  res.send(totalSupply.toNumber());
};
