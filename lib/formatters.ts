export const formatCurrency = (
  value: number | null | undefined,
  fallback = "0,00"
): string => {
  if (value == null || isNaN(value)) return fallback;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
