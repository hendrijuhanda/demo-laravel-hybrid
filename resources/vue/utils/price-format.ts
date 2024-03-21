export default (value: number): string => {
  const formatIDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    currencyDisplay: "code",
    minimumFractionDigits: 0,
  });

  return formatIDR.format(value).replace("IDR", "").trim();
};
