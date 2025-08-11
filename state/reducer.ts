import { CalculatorState, CalculatorAction } from "@/state/types";

export const initialState: CalculatorState = {
  currency: 'R$',
  initialInvestment: 1000,
  regularDeposit: 0,
  regularWithdrawal: 0,
  depositFrequency: "monthly",
  compoundFrequency: "monthly",
  interestRate: 10,
  interestRateFrequency: "monthly",
  movementType: "none",
  depositTiming: "end",
  years: 1,
  months: 0,
  results: {
    "finalBalance": 3138.43,
    "totalInterest": 2138.43,
    "totalPrincipal": 1000,
  },
  breakdown: [
    {
      "month": 0,
      "withdrawals": 0,
      "startingBalance": 0,
      "deposits": 0,
      "interest": 0,
      "endBalance": 1000
    },
    {
      "month": 1,
      "startingBalance": 1100,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 0,
      "endBalance": 1100
    },
    {
      "month": 2,
      "startingBalance": 1210,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 0,
      "endBalance": 1210
    },
    {
      "month": 3,
      "startingBalance": 1331,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 0,
      "endBalance": 1331
    },
    {
      "month": 4,
      "startingBalance": 1464.1,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 0,
      "endBalance": 1464.1
    },
    {
      "month": 5,
      "startingBalance": 1610.51,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 0,
      "endBalance": 1610.51
    },
    {
      "month": 6,
      "startingBalance": 1771.5610000000001,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 0,
      "endBalance": 1771.5610000000001
    },
    {
      "month": 7,
      "startingBalance": 1948.7171000000003,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 0,
      "endBalance": 1948.7171000000003
    },
    {
      "month": 8,
      "startingBalance": 2143.58881,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 0,
      "endBalance": 2143.58881
    },
    {
      "month": 9,
      "startingBalance": 2357.9476910000003,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 0,
      "endBalance": 2357.9476910000003
    },
    {
      "month": 10,
      "startingBalance": 2593.7424601000002,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 0,
      "endBalance": 2593.7424601000002
    },
    {
      "month": 11,
      "startingBalance": 2853.1167061100005,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 0,
      "endBalance": 2853.1167061100005
    },
    {
      "month": 12,
      "startingBalance": 3138.4283767210004,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 0,
      "endBalance": 3138.4283767210004
    }
  ]
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
