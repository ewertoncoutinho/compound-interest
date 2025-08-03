import { CalculatorState, CalculatorAction } from "./types";

export const initialState: CalculatorState = {
  initialInvestment: 5000,
  regularDeposit: 0,
  regularWithdrawal: 0,
  depositFrequency: "mensal",
  compoundFrequency: "mensal",
  interestRate: 5,
  interestRateFrequency: "anual",
  movementType: "none",
  depositTiming: "end",
  years: 5,
  months: 0,
  results: null,
  breakdown: [],
};


export function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case "SET_INITIAL_INVESTMENT":
      return { ...state, initialInvestment: action.payload };
    case "SET_REGULAR_DEPOSIT":
      return { ...state, regularDeposit: action.payload };
    case "SET_REGULAR_WITHDRAWAL":
      return { ...state, regularWithdrawal: action.payload };
    case "SET_DEPOSIT_FREQUENCY":
      return { ...state, depositFrequency: action.payload };
    case "SET_COMPOUND_FREQUENCY":
      return { ...state, compoundFrequency: action.payload };
    case "SET_INTEREST_RATE":
      return { ...state, interestRate: action.payload };
    case "SET_INTEREST_RATE_FREQUENCY":
      return { ...state, interestRateFrequency: action.payload };
    case "SET_MOVEMENT_TYPE":
      return { ...state, movementType: action.payload };
    case "SET_DEPOSIT_TIMING":
      return { ...state, depositTiming: action.payload };
    case "SET_YEARS":
      return { ...state, years: action.payload };
    case "SET_MONTHS":
      return { ...state, months: action.payload };
    case "SET_RESULTS":
      return { ...state, results: action.payload };
    case "SET_BREAKDOWN":
      return { ...state, breakdown: action.payload };
    default:
      return state;
  }
}
