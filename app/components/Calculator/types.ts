import { CalculationResult, YearlyBreakdown } from "@/lib/calculateCompoundInterest";

export type Frequency = "anual" | "semestral" | "trimestral" | "mensal" | "semanal" | "diaria";
export type DepositTiming = "start" | "end";
export type Timing = "beginning" | "end";
export type RateFrequency = "anual" | "mensal" | "semanal";
export type MovementType = "none" | "deposits" | "withdrawals" | "both";

export interface CalculatorState {
  initialInvestment: number;
  regularDeposit: number;
  regularWithdrawal: number;
  depositFrequency: Frequency;
  compoundFrequency: Frequency;
  interestRate: number;
  interestRateFrequency: RateFrequency;
  movementType: MovementType;
  depositTiming: DepositTiming;
  years: number;
  months: number;
  results: CalculationResult | null;
  breakdown: YearlyBreakdown[];
}

type SetAction<T extends string, P> = { type: T; payload: P };

export type CalculatorAction =
  | SetAction<"SET_INITIAL_INVESTMENT", number>
  | SetAction<"SET_REGULAR_DEPOSIT", number>
  | SetAction<"SET_REGULAR_WITHDRAWAL", number>
  | SetAction<"SET_DEPOSIT_FREQUENCY", Frequency>
  | SetAction<"SET_COMPOUND_FREQUENCY", Frequency>
  | SetAction<"SET_INTEREST_RATE", number>
  | SetAction<"SET_INTEREST_RATE_FREQUENCY", RateFrequency>
  | SetAction<"SET_MOVEMENT_TYPE", MovementType>
  | SetAction<"SET_DEPOSIT_TIMING", DepositTiming>
  | SetAction<"SET_YEARS", number>
  | SetAction<"SET_MONTHS", number>
  | SetAction<"SET_RESULTS", CalculationResult | null>
  | SetAction<"SET_BREAKDOWN", YearlyBreakdown[]>;
