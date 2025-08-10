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
    "finalBalance": 75191.10,
    "totalPrincipal": 1000,
    "totalInterest": 74191.10
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
      "startingBalance": 1000,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 433.33333333333337,
      "endBalance": 1433.3333333333335
    },
    {
      "month": 2,
      "startingBalance": 1433.3333333333335,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 621.1111111111112,
      "endBalance": 2054.444444444445
    },
    {
      "month": 3,
      "startingBalance": 2054.444444444445,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 890.2592592592595,
      "endBalance": 2944.7037037037044
    },
    {
      "month": 4,
      "startingBalance": 2944.7037037037044,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 1276.0382716049387,
      "endBalance": 4220.741975308643
    },
    {
      "month": 5,
      "startingBalance": 4220.741975308643,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 1828.9881893004122,
      "endBalance": 6049.7301646090555
    },
    {
      "month": 6,
      "startingBalance": 6049.7301646090555,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 2621.5497379972576,
      "endBalance": 8671.279902606313
    },
    {
      "month": 7,
      "startingBalance": 8671.279902606313,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 3757.554624462736,
      "endBalance": 12428.834527069048
    },
    {
      "month": 8,
      "startingBalance": 12428.834527069048,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 5385.828295063255,
      "endBalance": 17814.662822132304
    },
    {
      "month": 9,
      "startingBalance": 17814.662822132304,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 7719.687222923999,
      "endBalance": 25534.350045056304
    },
    {
      "month": 10,
      "startingBalance": 25534.350045056304,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 11064.8850195244,
      "endBalance": 36599.2350645807
    },
    {
      "month": 11,
      "startingBalance": 36599.2350645807,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 15859.668527984972,
      "endBalance": 52458.90359256567
    },
    {
      "month": 12,
      "startingBalance": 52458.90359256567,
      "deposits": 0,
      "withdrawals": 0,
      "interest": 22732.19155677846,
      "endBalance": 75191.09514934412
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
