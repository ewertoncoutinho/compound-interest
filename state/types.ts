import { Breakdown, CalculationResult, DepositTiming, Frequency, MovementType } from "@/types/frequency";

export interface CalculatorState {
  currency: string;
  initialInvestment: number;
  regularDeposit: number;
  regularWithdrawal: number;
  depositFrequency: Frequency;
  compoundFrequency: Frequency;
  interestRate: number;
  interestRateFrequency: Frequency;
  movementType: MovementType;
  depositTiming: DepositTiming;
  years: number;
  months: number;
  results: CalculationResult | null;
  breakdown: Breakdown[];
}

type SetAction<T extends string, P> = { type: T; payload: P };

export type CalculatorAction =
  | SetAction<"SET_CURRENCY", string>
  | SetAction<"SET_INITIAL_INVESTMENT", number>
  | SetAction<"SET_REGULAR_DEPOSIT", number>
  | SetAction<"SET_REGULAR_WITHDRAWAL", number>
  | SetAction<"SET_DEPOSIT_FREQUENCY", Frequency>
  | SetAction<"SET_COMPOUND_FREQUENCY", Frequency>
  | SetAction<"SET_INTEREST_RATE", number>
  | SetAction<"SET_INTEREST_RATE_FREQUENCY", Frequency>
  | SetAction<"SET_MOVEMENT_TYPE", MovementType>
  | SetAction<"SET_DEPOSIT_TIMING", DepositTiming>
  | SetAction<"SET_YEARS", number>
  | SetAction<"SET_MONTHS", number>
  | SetAction<"SET_RESULTS", CalculationResult | null>
  | SetAction<"SET_BREAKDOWN", Breakdown[]>;
