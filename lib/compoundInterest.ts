import { MovementType, Frequency, CalculationResult, YearlyBreakdown, DepositTiming } from "@/types/frequency";

const frequencyMap: Record<Frequency, number> = {
  anual: 1,
  trimestral: 4,
  mensal: 12,
  semanal: 52,
  diaria: 365,
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

  const normalizedAnnualRate = (interestRate / 100) * frequencyMap[interestRateFrequency];
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

  const breakdown: YearlyBreakdown[] = [];
  const totalDeposits = 0;
  let currentBalance = initialInvestmentAmount;

  for (let year = 1; year <= termInYears; year++) {
    const startBalance = currentBalance;
    let interestThisYear = 0;
    let depositsThisYear = 0;
    let withdrawalsThisYear = 0;

    for (let period = 0; period < compoundingsPerYear; period++) {
      const isDepositPeriod = (period % Math.floor(compoundingsPerYear / frequencyMap[depositFrequency]) === 0);

      if (movementType === "deposits" || movementType === "both") {
        if (isDepositPeriod) {
          currentBalance += regularDepositAmount;
          depositsThisYear += regularDepositAmount;
        }
      }

      if (movementType === "withdrawals" || movementType === "both") {
        if (isDepositPeriod) {
          currentBalance -= regularWithdrawalAmount;
          withdrawalsThisYear += regularWithdrawalAmount;
        }
      }

      const interestThisPeriod = currentBalance * periodicRate;
      currentBalance += interestThisPeriod;
      interestThisYear += interestThisPeriod;
    }

    breakdown.push({
      year,
      startingBalance: startBalance,
      deposits: depositsThisYear - withdrawalsThisYear,
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
