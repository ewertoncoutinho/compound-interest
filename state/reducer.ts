import { CalculatorState, CalculatorAction } from "@/state/types";

export const initialState: CalculatorState = {
  currency: 'R$',
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
  results: {
    "finalBalance": 6416.79,
    "totalPrincipal": 5000,
    "totalInterest": 1416.79
  },
  breakdown: [
    {
      "year": 0,
      "startingBalance": 0,
      "deposits": 0,
      "interest": 0,
      "endBalance": 5000
    },
    {
      "year": 1,
      "startingBalance": 5000,
      "deposits": 0,
      "interest": 255.81,
      "endBalance": 5255.81
    },
    {
      "year": 2,
      "startingBalance": 5255.81,
      "deposits": 0,
      "interest": 268.90,
      "endBalance": 5524.71
    },
    {
      "year": 3,
      "startingBalance": 5524.71,
      "deposits": 0,
      "interest": 282.65,
      "endBalance": 5807.36
    },
    {
      "year": 4,
      "startingBalance": 5807.36,
      "deposits": 0,
      "interest": 297.12,
      "endBalance": 6104.48
    },
    {
      "year": 5,
      "startingBalance": 6104.48,
      "deposits": 0,
      "interest": 312.32,
      "endBalance": 6416.79
    }
  ],
};

export function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case "SET_CURRENCY":
      return { ...state, currency: action.payload };
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
