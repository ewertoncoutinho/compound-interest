import { MovementType, RateFrequency, Frequency, CalculationResult, YearlyBreakdown } from "@/types/frequency";

const frequencyMap: Record<Frequency, number> = {
  anual: 1,
  semestral: 2,
  trimestral: 4,
  mensal: 12,
  semanal: 52,
  diaria: 365,
};

const rateFrequencyMap: Record<RateFrequency, number> = {
  anual: 1,
  mensal: 12,
  semanal: 52,
};

export function calculateCompoundInterest(params: {
  initialInvestment: number;
  regularDeposit: number;
  regularWithdrawal: number;
  depositFrequency: Frequency;
  compoundFrequency: Frequency;
  interestRate: number;
  interestRateFrequency: RateFrequency;
  termInYears: number;
  movementType: MovementType;
  // depositTiming: DepositTiming;
}): { result: CalculationResult; breakdown: YearlyBreakdown[] } {
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
    // depositTiming,
  } = params;

  // Normalização da taxa para taxa anual
  const normalizedAnnualRate = (interestRate / 100) * rateFrequencyMap[interestRateFrequency];
  const compoundingsPerYear = frequencyMap[compoundFrequency];
  const periodicRate = normalizedAnnualRate / compoundingsPerYear;
  const totalPeriods = termInYears * compoundingsPerYear;

  const initialInvestmentAmount = initialInvestment || 0;
  const regularDepositAmount = regularDeposit || 0;
  const regularWithdrawalAmount = regularWithdrawal || 0;

  const futureValueInitial = initialInvestmentAmount * Math.pow(1 + periodicRate, totalPeriods);

  let futureValueAnnuity = 0;

  if (movementType === "deposits" || movementType === "both") {
    const depositsPerYear = frequencyMap[depositFrequency];
    const depositsPerPeriod = Math.floor(totalPeriods * (depositsPerYear / compoundingsPerYear));
    futureValueAnnuity += regularDepositAmount * ((Math.pow(1 + periodicRate, depositsPerPeriod) - 1) / periodicRate);
  }

  if (movementType === "withdrawals" || movementType === "both") {
    const withdrawalsPerYear = frequencyMap[depositFrequency];
    const withdrawalsPerPeriod = Math.floor(totalPeriods * (withdrawalsPerYear / compoundingsPerYear));
    futureValueAnnuity -= regularWithdrawalAmount * ((Math.pow(1 + periodicRate, withdrawalsPerPeriod) - 1) / periodicRate);
  }

  const finalBalance = futureValueInitial + futureValueAnnuity;

  // Detalhamento anual
  const breakdown: YearlyBreakdown[] = [];
  let currentBalance = initialInvestmentAmount;
  let totalDeposits = 0;

  for (let year = 1; year <= termInYears; year++) {
    const startBalance = currentBalance;
    const depositsThisYear = regularDepositAmount * frequencyMap[depositFrequency];
    const withdrawalsThisYear = regularWithdrawalAmount * frequencyMap[depositFrequency];
    const netMovementsThisYear = depositsThisYear - withdrawalsThisYear;

    totalDeposits += netMovementsThisYear;

    const endBalanceThisYear = (startBalance + netMovementsThisYear) * Math.pow(1 + normalizedAnnualRate, 1);
    const interestThisYear = endBalanceThisYear - (startBalance + netMovementsThisYear);
    currentBalance = endBalanceThisYear;

    breakdown.push({
      year,
      startingBalance: startBalance,
      deposits: netMovementsThisYear,
      interest: interestThisYear,
      endBalance: currentBalance,
    });
  }

  const totalPrincipal = initialInvestmentAmount + totalDeposits;

  return {
    result: {
      finalBalance,
      totalPrincipal,
      totalInterest: finalBalance - totalPrincipal,
    },
    breakdown,
  };
}
