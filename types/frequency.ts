export type Frequency = "annual" | "quarterly" | "monthly" | "weekly" | "daily";
export type DepositTiming = "end" | "beginning";
export type MovementType = "none" | "deposits" | "withdrawals" | "both";

export type CalculationResult = {
  finalBalance: number;
  totalPrincipal: number;
  totalInterest: number;
}

export type Breakdown = {
  month: number;
  startingBalance: number;
  deposits: number;
  withdrawals: number;
  interest: number;
  endBalance: number;
};