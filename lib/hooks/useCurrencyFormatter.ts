export function useCurrencyFormatter(locale = "pt-BR", currency = "BRL") {
  return (value: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(value);
}
