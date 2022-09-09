import BigNumber from "bignumber.js";

function getAmountOut(amountIn: BigNumber, reservesIn: BigNumber, reservesOut: BigNumber) {
  const amountOut = amountIn.eq(0)
    ? new BigNumber(0)
    : reservesOut.minus(
        reservesOut
          .multipliedBy(reservesIn)
          .dividedBy(reservesIn.plus(amountIn.multipliedBy(0.9981)))
      );
  return {
    amountOut,
    reservesInAfter: reservesIn.plus(amountIn),
    reservesOutAfter: reservesOut.minus(amountOut),
  };
}

function getAmountIn(amountOut: BigNumber, reservesIn: BigNumber, reservesOut: BigNumber) {
  const amountIn = amountOut.eq(0)
    ? new BigNumber(0)
    : amountOut.isGreaterThanOrEqualTo(reservesOut)
    ? new BigNumber(Infinity)
    : reservesIn
        .multipliedBy(reservesOut)
        .dividedBy(reservesOut.minus(amountOut)) // reserves in after
        .minus(reservesIn) // minus reserves in
        .dividedBy(0.9981); // fee

  return {
    amountIn,
    reservesInAfter: reservesIn.plus(amountIn),
    reservesOutAfter: reservesOut.minus(amountOut),
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function computeBidsAsks(
  baseReserves: BigNumber,
  quoteReserves: BigNumber,
  numSegments = 200
) {
  if (baseReserves.eq(0) || quoteReserves.eq(0)) {
    return {
      bids: [],
      asks: [],
    };
  }

  // we don't do exactly 100 segments because we do not care about the trade that takes exact out of entire reserves
  const increment = baseReserves.dividedBy(numSegments + 1);
  let baseAmounts = Array.from({ length: numSegments }, (x, i) => increment.multipliedBy(i));
  if (baseAmounts.length > 500) {
    baseAmounts = baseAmounts.slice(0, 500);
  }

  const bids = baseAmounts.map((buyBaseAmount) => {
    const {
      reservesInAfter: baseReservesBefore,
      reservesOutAfter: quoteReservesBefore,
    } = getAmountOut(buyBaseAmount, baseReserves, quoteReserves);
    const { amountOut } = getAmountOut(increment, baseReservesBefore, quoteReservesBefore);
    return [amountOut.dividedBy(increment).toString(), increment.toString()];
  });

  const asks = baseAmounts.map((sellBaseAmount) => {
    const {
      reservesInAfter: baseReservesBefore,
      reservesOutAfter: quoteReservesBefore,
    } = getAmountIn(sellBaseAmount, quoteReserves, baseReserves);
    const { amountIn } = getAmountIn(increment, baseReservesBefore, quoteReservesBefore);
    return [amountIn.dividedBy(increment).toString(), increment.toString()];
  });

  return {
    bids,
    asks,
  };
}
