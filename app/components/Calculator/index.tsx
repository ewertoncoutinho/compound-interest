"use client";

import { useState, FormEvent } from "react";

type Frequency = "anual" | "semestral" | "trimestral" | "mensal" | "semanal" | "diaria";
type Timing = "beginning" | "end";
type RateFrequency = "anual" | "mensal" | "semanal";
type MovementType = "none" | "deposits" | "withdrawals" | "both";

const frequencyMap: Record<Frequency, number> = {
  anual: 1,
  semestral: 2,
  trimestral: 4,
  mensal: 12,
  semanal: 52,
  diaria: 365,
};

interface CalculationResult {
  finalBalance: number;
  totalPrincipal: number;
  totalInterest: number;
}

interface YearlyBreakdown {
  year: number;
  startingBalance: number;
  deposits: number;
  interest: number;
  endBalance: number;
}

export default function Calculator() {
  const [initialInvestment, setInitialInvestment] = useState<number>(5000);
  const [regularDeposit, setRegularDeposit] = useState<number>(0);
  const [regularWithdrawal, setRegularWithdrawal] = useState<number>(0);
  const [depositFrequency, setDepositFrequency] = useState<Frequency>("mensal");
  const [depositTiming, setDepositTiming] = useState<Timing>("end");
  const [interestRate, setInterestRate] = useState<number>(5);
  const [compoundFrequency, setCompoundFrequency] = useState<Frequency>("mensal");
  const [interestRateFrequency, setInterestRateFrequency] = useState<RateFrequency>("anual");
  const [years, setYears] = useState<number>(5);
  const [months, setMonths] = useState<number>(0);
  const [movementType, setMovementType] = useState<MovementType>("none");

  const [results, setResults] = useState<CalculationResult | null>(null);
  const [breakdown, setBreakdown] = useState<YearlyBreakdown[]>([]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rate =
      interestRateFrequency === "mensal"
        ? (interestRate / 100) * 12
        : interestRateFrequency === "semanal"
          ? (interestRate / 100) * 52
          : interestRate / 100;

    const termInYears = years + months / 12;

    const principal = initialInvestment || 0;
    const depositAmount = regularDeposit || 0;
    const withdrawalAmount = regularWithdrawal || 0;

    const compoundingsPerYear = frequencyMap[compoundFrequency];
    const depositsPerYear = frequencyMap[depositFrequency];
    const totalPeriods = Math.round(termInYears * compoundingsPerYear);
    const movementsPerPeriod = depositsPerYear / compoundingsPerYear;

    let balance = principal;
    let totalInterest = 0;
    const breakdown: YearlyBreakdown[] = [];

    let yearData: Omit<YearlyBreakdown, "endBalance"> = {
      year: 1,
      startingBalance: principal,
      deposits: 0,
      interest: 0,
    };

    const applyMovements = () => {
      if (movementType === "deposits" || movementType === "both") {
        balance += depositAmount;
        yearData.deposits += depositAmount;
      }
      if (movementType === "withdrawals" || movementType === "both") {
        balance -= withdrawalAmount;
        yearData.deposits -= withdrawalAmount; // negativo
      }
    };

    for (let i = 1; i <= totalPeriods; i++) {
      if (depositTiming === "beginning") {
        for (let m = 0; m < movementsPerPeriod; m++) applyMovements();
      }

      const interest = balance * (rate / compoundingsPerYear);
      balance += interest;
      yearData.interest += interest;

      if (depositTiming === "end") {
        for (let m = 0; m < movementsPerPeriod; m++) applyMovements();
      }

      const isEndOfYear = i % compoundingsPerYear === 0 || i === totalPeriods;
      if (isEndOfYear) {
        breakdown.push({ ...yearData, endBalance: balance });

        yearData = {
          year: yearData.year + 1,
          startingBalance: balance,
          deposits: 0,
          interest: 0,
        };
      }
    }

    const totalDeposits = termInYears * depositsPerYear * depositAmount;
    const totalWithdrawals = termInYears * depositsPerYear * withdrawalAmount;
    const totalPrincipal = principal + totalDeposits - totalWithdrawals;
    totalInterest = balance - totalPrincipal;

    setResults({
      finalBalance: balance,
      totalPrincipal,
      totalInterest,
    });

    setBreakdown(breakdown);
  };

  return (
    <>
      <form onSubmit={handleCalculate}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <div className="md:col-span-2">
            <label
              htmlFor="initialInvestment"
              className="block text-sm font-medium text-gray-700"
            >
              Investimento Inicial (R$)
            </label>
            <input
              type="number"
              id="initialInvestment"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-end space-x-2">
            <div className="flex-grow">
              <label
                htmlFor="interestRate"
                className="block text-sm font-medium text-gray-700"
              >
                Taxa de Juros (%)
              </label>
              <input
                type="number"
                step="0.01"
                id="interestRate"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <select
                id="interestRateFrequency"
                value={interestRateFrequency}
                onChange={(e) => setInterestRateFrequency(e.target.value as RateFrequency)}
                className="h-[42px] mt-1 block w-full pl-3 pr-8 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="anual">Anual</option>
                <option value="mensal">Mensal</option>
                <option value="semanal">Semanal</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Período de Investimento
            </label>
            <div className="flex items-center space-x-3 mt-1">
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  id="years"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-20 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <span className="text-sm text-gray-600">Anos</span>
              </div>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  id="months"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-20 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <span className="text-sm text-gray-600">Meses</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="compoundFrequency"
              className="block text-sm font-medium text-gray-700"
            >
              Juros Compostos
            </label>
            <select
              id="compoundFrequency"
              value={compoundFrequency}
              onChange={(e) => setCompoundFrequency(e.target.value as Frequency)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="anual">Anualmente</option>
              <option value="semestral">Semestralmente</option>
              <option value="trimestral">Trimestralmente</option>
              <option value="mensal">Mensalmente</option>
              <option value="diaria">Diariamente</option>
            </select>
          </div>
        </div>


        <div>
          <label htmlFor="movementType" className="block text-sm font-medium text-gray-700">
            Tipo de Movimentação
          </label>
          <select
            id="movementType"
            value={movementType}
            onChange={(e) => {
              ;
              setMovementType(e.target.value as MovementType);
              if (e.target.value === "none") {
                setRegularDeposit(0);
                setRegularWithdrawal(0);
              }
            }}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="none">Nenhuma</option>
            <option value="deposits">Apenas Depósitos</option>
            <option value="withdrawals">Apenas Retiradas</option>
            <option value="both">Depósitos e Retiradas</option>
          </select>
        </div>


        {(movementType === "deposits" || movementType === "both") && (
          <div className="mt-4">
            <label htmlFor="regularDeposit" className="block text-sm font-medium text-gray-700">
              Depósito Regular (R$)
            </label>
            <input
              type="number"
              id="regularDeposit"
              value={regularDeposit}
              onChange={(e) => setRegularDeposit(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}

        {(movementType === "withdrawals" || movementType === "both") && (
          <div className="mt-4">
            <label htmlFor="regularWithdrawal" className="block text-sm font-medium text-gray-700">
              Retirada Regular (R$)
            </label>
            <input
              type="number"
              id="regularWithdrawal"
              value={regularWithdrawal}
              onChange={(e) => setRegularWithdrawal(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}

        {(movementType !== "none") && (
          <div>
            <div>
              <label
                htmlFor="depositFrequency"
                className="block text-sm font-medium text-gray-700"
              >
                Frequência do Depósito
              </label>
              <select
                id="depositFrequency"
                value={depositFrequency}
                onChange={(e) => setDepositFrequency(e.target.value as Frequency)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="anual">Anual</option>
                <option value="mensal">Mensal</option>
                <option value="semanal">Semanal</option>
                <option value="diaria">Diária</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="depositTiming"
                className="block text-sm font-medium text-gray-700"
              >
                Adicionar Depósito no
              </label>
              <select
                id="depositTiming"
                value={depositTiming}
                onChange={(e) => setDepositTiming(e.target.value as Timing)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="end">Final do Período</option>
                <option value="beginning">Início do Período</option>
              </select>
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            Calcular
          </button>
        </div>
      </form>
      {results && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Resultados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-sm text-blue-800 font-semibold">Valor Final</p>
              <p className="text-2xl font-bold text-blue-900">
                {formatCurrency(results.finalBalance)}
              </p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <p className="text-sm text-yellow-800 font-semibold">
                Total Investido
              </p>
              <p className="text-2xl font-bold text-yellow-900">
                {formatCurrency(results.totalPrincipal)}
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-sm text-green-800 font-semibold">
                Total em Juros
              </p>
              <p className="text-2xl font-bold text-green-900">
                {formatCurrency(results.totalInterest)}
              </p>
            </div>
          </div>
          <div className="mt-10 overflow-x-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Detalhamento
            </h3>
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ano
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Depósitos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Juros Ganhos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Juros Acumulado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Saldo Final
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-semibold">
                    -
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    -
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    -
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 font-bold">
                    {formatCurrency(initialInvestment)}
                  </td>
                </tr>
                {breakdown.map((item) => (
                  <tr key={item.year} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {formatCurrency(item.deposits)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-semibold">
                      {formatCurrency(item.interest)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-semibold">
                      {formatCurrency(item.endBalance - initialInvestment)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 font-bold">
                      {formatCurrency(item.endBalance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
