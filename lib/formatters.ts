const symbolToCurrencyCode: Record<string, string> = {
  "R$": "BRL",
  "$": "USD",
  "€": "EUR",
  "£": "GBP",
  "₹": "INR",
  "¥": "JPY",
};

export const formatCurrency = (
  value: number | null | undefined,
  symbol: string = "R$",
  fallback = "R$ 0,00"
): string => {
  if (value == null || isNaN(value)) return fallback;

  const currency = symbolToCurrencyCode[symbol] || "BRL";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
    currencyDisplay: 'narrowSymbol'
  }).format(value);
};
