export type Frequency = "anual" | "trimestral" | "mensal" | "semanal" | "diaria";
export type DepositTiming = "end" | "beginning";
export type RateFrequency = "anual" | "mensal" | "semanal";
export type MovementType = "none" | "deposits" | "withdrawals" | "both";

export interface CalculationResult {
  finalBalance: number;
  totalPrincipal: number;
  totalInterest: number;
}

export interface YearlyBreakdown {
  year: number;
  startingBalance: number;
  deposits: number;
  interest: number;
  endBalance: number;
}
