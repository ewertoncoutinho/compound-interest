import {
  MovementType,
  Frequency,
  CalculationResult,
  DepositTiming,
  Breakdown,
} from "@/types/frequency";

const frequencyMap: Record<Frequency, number> = {
  annual: 1,
  quarterly: 4,
  monthly: 12,
  weekly: 52,
  daily: 360,
};

export function calculateCompoundInterest(params: {
  initialInvestment: number;
  regularDeposit: number;
  regularWithdrawal: number;
  depositFrequency: Frequency;
  compoundFrequency: Frequency;
  interestRate: number;
  interestRateFrequency: Frequency;
  termInYears: number;
  movementType: MovementType;
  depositTiming: DepositTiming;
}): { result: CalculationResult; breakdown: Breakdown[] } {
  const {
    initialInvestment,
    regularDeposit,
    regularWithdrawal,
    depositFrequency,
    compoundFrequency,
    interestRate,
    interestRateFrequency,
    termInYears,
    movementType,
  } = params;

  const monthsInYear = 360;
  const totalMonths = Math.floor(termInYears * monthsInYear);

  const compoundFreqMonthsRaw = monthsInYear / frequencyMap[compoundFrequency];
  const compoundFreqMonths = compoundFreqMonthsRaw < 1 ? 1 : Math.round(compoundFreqMonthsRaw);

  const depositFreqMonthsRaw = monthsInYear / frequencyMap[depositFrequency];
  const depositFreqMonths = depositFreqMonthsRaw < 1 ? 1 : Math.round(depositFreqMonthsRaw);


  const annualRate = (interestRate / 100) * frequencyMap[interestRateFrequency];
  const periodicRate = annualRate / frequencyMap[compoundFrequency];

  let currentBalance = initialInvestment || 0;
  let totalDeposits = 0;
  let totalWithdrawals = 0;
  const breakdown: Breakdown[] = [
    {
      "month": 0,
      "withdrawals": 0,
      "startingBalance": 0,
      "deposits": 0,
      "interest": 0,
      "endBalance": initialInvestment
    },
  ];

  for (let month = 1; month <= totalMonths; month++) {
    const startingBalance = currentBalance;
    let depositsThisMonth = 0;
    let withdrawalsThisMonth = 0;
    let interestThisMonth = 0;

    if ((month - 1) % depositFreqMonths === 0) {
      if (movementType === "deposits" || movementType === "both") {
        currentBalance += regularDeposit;
        depositsThisMonth = regularDeposit;
        totalDeposits += regularDeposit;
      }
      if (movementType === "withdrawals" || movementType === "both") {
        currentBalance -= regularWithdrawal;
        withdrawalsThisMonth = regularWithdrawal;
        totalWithdrawals += regularWithdrawal;
      }
    }

    if ((month - 1) % compoundFreqMonths === 0) {
      interestThisMonth = currentBalance * periodicRate;
      currentBalance += interestThisMonth;
    }

    if (month % 30 === 0) {
      breakdown.push({
        month: month / 30,
        startingBalance,
        deposits: depositsThisMonth,
        withdrawals: withdrawalsThisMonth,
        interest: interestThisMonth,
        endBalance: currentBalance,
      });
    }
  }
  
  console.log("🚀 ~ calculateCompoundInterest ~ breakdown:", breakdown)
  const totalPrincipal = initialInvestment + totalDeposits - totalWithdrawals;

  return {
    result: {
      finalBalance: currentBalance,
      totalPrincipal,
      totalInterest: currentBalance - totalPrincipal,
    },
    breakdown,
  };
}
