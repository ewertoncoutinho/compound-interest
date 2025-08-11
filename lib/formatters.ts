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

export function formatMonthsToYearsMonths(value: number): string {
  const years = Math.floor(value / 12);
  const months = value % 12;
  let result = "";

  if (years > 0) {
    result += `${years} year${years > 1 ? "s" : ""}`;
  }

  if (months > 0) {
    if (result.length > 0) {
      result += " and ";
    }
    result += `${months} month${months > 1 ? "s" : ""}`;
  }

  return result || "0 month";
}