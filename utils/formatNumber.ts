const formatNumber = (num: number) =>
  num.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });

export default formatNumber;
