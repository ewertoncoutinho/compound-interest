"use client";

import { useMemo, FormEvent } from "react";
import { calculateCompoundInterest } from "@/lib/calculateCompoundInterest";
import { useCurrencyFormatter } from "@/hooks/useCurrencyFormatter";
import { DepositTiming, Frequency, MovementType, RateFrequency } from "@/types/frequency";
import { useCalculator } from "@/hooks/useCalculator";

export default function Calculator() {
  const [state, dispatch] = useCalculator();
  const termInYears = useMemo(() => state.years + state.months / 12, [state.years, state.months]);
  const formatCurrency = useCurrencyFormatter();

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      initialInvestment,
      regularDeposit,
      regularWithdrawal,
      depositFrequency,
      // depositTiming,
      interestRate,
      interestRateFrequency,
      compoundFrequency,
      movementType,
    } = state;

    const { result, breakdown } = calculateCompoundInterest({
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
    });

    dispatch({ type: "SET_RESULTS", payload: result });
    dispatch({ type: "SET_BREAKDOWN", payload: breakdown });
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
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={state.initialInvestment}
              onChange={(e) => dispatch({ type: "SET_INITIAL_INVESTMENT", payload: Number(e.target.value) })}
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
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={state.interestRate}
                onChange={(e) => dispatch({ type: "SET_INTEREST_RATE", payload: Number(e.target.value) })}
              />
            </div>
            <div>
              <select
                id="interestRateFrequency"
                value={state.interestRateFrequency}
                onChange={(e) => dispatch({ type: "SET_INTEREST_RATE_FREQUENCY", payload: e.target.value as RateFrequency })}
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
                  value={state.years}
                  onChange={(e) => dispatch({ type: "SET_YEARS", payload: Number(e.target.value) })}
                  className="w-20 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <span className="text-sm text-gray-600">Anos</span>
              </div>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  id="months"
                  value={state.months}
                  onChange={(e) => dispatch({ type: "SET_MONTHS", payload: Number(e.target.value) })}
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
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={state.compoundFrequency}
              onChange={(e) => dispatch({ type: "SET_COMPOUND_FREQUENCY", payload: e.target.value as Frequency })}
            >
              <option value="anual">Anualmente</option>
              <option value="semestral">Semestralmente</option>
              <option value="trimestral">Trimestralmente</option>
              <option value="mensal">Mensalmente</option>
              <option value="semanal">Semanalmente</option>
              <option value="diaria">Diariamente</option>
            </select>
          </div>
        </div>


        <div>
          <label htmlFor="state.movementType" className="block text-sm font-medium text-gray-700">
            Tipo de Movimentação
          </label>
          <select
            id="state.movementType"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={state.movementType}
            onChange={(e) => dispatch({ type: "SET_MOVEMENT_TYPE", payload: e.target.value as MovementType })}
          >
            <option value="none">Nenhuma</option>
            <option value="deposits">Apenas Depósitos</option>
            <option value="withdrawals">Apenas Retiradas</option>
            <option value="both">Depósitos e Retiradas</option>
          </select>
        </div>


        {(state.movementType === "deposits" || state.movementType === "both") && (
          <div className="mt-4">
            <label htmlFor="regularDeposit" className="block text-sm font-medium text-gray-700">
              Depósito Regular (R$)
            </label>
            <input
              type="number"
              id="regularDeposit"
              value={state.regularDeposit}
              onChange={(e) => dispatch({ type: "SET_REGULAR_DEPOSIT", payload: Number(e.target.value) })}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}

        {(state.movementType === "withdrawals" || state.movementType === "both") && (
          <div className="mt-4">
            <label htmlFor="regularWithdrawal" className="block text-sm font-medium text-gray-700">
              Retirada Regular (R$)
            </label>
            <input
              type="number"
              id="regularWithdrawal"
              value={state.regularWithdrawal}
              onChange={(e) => dispatch({ type: "SET_REGULAR_WITHDRAWAL", payload: Number(e.target.value) })}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}

        {(state.movementType !== "none") && (
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
                value={state.depositFrequency}
                onChange={(e) => dispatch({ type: "SET_DEPOSIT_FREQUENCY", payload: e.target.value as Frequency })}
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
                value={state.depositTiming}
                onChange={(e) => dispatch({ type: "SET_DEPOSIT_TIMING", payload: e.target.value as DepositTiming })}
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
      {state.results && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Resultados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-sm text-blue-800 font-semibold">Valor Final</p>
              <p className="text-2xl font-bold text-blue-900">
                {formatCurrency(state.results.finalBalance)}
              </p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <p className="text-sm text-yellow-800 font-semibold">
                Total Investido
              </p>
              <p className="text-2xl font-bold text-yellow-900">
                {formatCurrency(state.results.totalPrincipal)}
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-sm text-green-800 font-semibold">
                Total em Juros
              </p>
              <p className="text-2xl font-bold text-green-900">
                {formatCurrency(state.results.totalInterest)}
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
                    {formatCurrency(state.initialInvestment)}
                  </td>
                </tr>
                {state.breakdown.map((item) => (
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
                      {formatCurrency(item.endBalance - state.initialInvestment)}
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
