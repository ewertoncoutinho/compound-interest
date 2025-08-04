"use client";

import { useMemo, FormEvent } from "react";
import { calculateCompoundInterest } from "@/lib/compoundInterest";
import { DepositTiming, Frequency, MovementType } from "@/types/frequency";
import { useCalculator } from "@/hooks/useCalculator";
import Breakdown from "@/components/breakdown";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function Calculator() {
  const [state, dispatch] = useCalculator();
  const termInYears = useMemo(() => state.years + state.months / 12, [state.years, state.months]);

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      initialInvestment,
      regularDeposit,
      regularWithdrawal,
      depositFrequency,
      depositTiming,
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
      depositTiming,
    });

    dispatch({ type: "SET_RESULTS", payload: result });
    dispatch({ type: "SET_BREAKDOWN", payload: breakdown });
  };

  return (
    <>
      <form onSubmit={handleCalculate} className="gap-y-4 max-w-[360px]">
        <div className="md:col-span-2">
          <label
            htmlFor="initialInvestment"
            className="flex mb-1 text-sm font-medium text-neutral-400"
          >
            Initial investment:
          </label>
          <Input
            id="initialInvestment"
            value={state.initialInvestment || ""}
            placeholder="0"
            onChange={(e) => dispatch({ type: "SET_INITIAL_INVESTMENT", payload: Number(e.target.value) })}
          />
        </div>

        <div className="flex items-end gap-2">
          <div className="flex-grow">
            <label
              htmlFor="interestRate"
              className="flex mb-1 text-sm font-medium text-neutral-400"
            >
              Interest rate:
            </label>
            <Input
              id="interestRate"
              value={state.interestRate || ""}
              placeholder="0"
              onChange={(e) => dispatch({ type: "SET_INTEREST_RATE", payload: Number(e.target.value) })}
            />
          </div>
          <Select
            value={state.interestRateFrequency}
            onValueChange={(e) => dispatch({ type: "SET_INTEREST_RATE_FREQUENCY", payload: e as Frequency })}
          >
            <SelectTrigger className="w-[280px]" id="interestRateFrequency">
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent
            >
              <SelectItem value="diaria">Daily</SelectItem>
              <SelectItem value="semanal">Weekly</SelectItem>
              <SelectItem value="mensal">Monthly</SelectItem>
              <SelectItem value="trimestral">Quarterly</SelectItem>
              <SelectItem value="anual">Annual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label
            id="compoundFrequency"
            className="flex mb-2 text-sm font-medium text-neutral-400"
          >
            Compound frequency:
          </label>
          <Select
            aria-labelledby="compoundFrequency"
            value={state.compoundFrequency}
            onValueChange={(e) => dispatch({ type: "SET_COMPOUND_FREQUENCY", payload: e as Frequency })}

          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="diaria">Daily (365/yr)</SelectItem>
              <SelectItem value="semanal">Weekly (52/yr)</SelectItem>
              <SelectItem value="mensal">Monthly (12/yr)</SelectItem>
              <SelectItem value="trimestral">Quarterly (4/yr)</SelectItem>
              <SelectItem value="anual">Yearly (1/yr)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <div>
            <label className="flex mb-2 text-sm font-medium text-neutral-400">
              Years:
            </label>
            <Input
              id="years"
              value={state.years || ""}
              placeholder="0"
              onChange={(e) => dispatch({ type: "SET_YEARS", payload: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="flex mb-2 text-sm font-medium text-neutral-400">
              Months:
            </label>
            <Input
              id="months"
              value={state.months || ""}
              placeholder="0"
              onChange={(e) => dispatch({ type: "SET_MONTHS", payload: Number(e.target.value) })}
            />
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="state.movementType" className="flex mb-2 text-sm font-medium text-neutral-400">
              Tipo de Movimentação
            </label>
            <Select
              value={state.movementType}
              onValueChange={(e) => dispatch({ type: "SET_MOVEMENT_TYPE", payload: e as MovementType })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nenhuma</SelectItem>
                <SelectItem value="deposits">Apenas Depósitos</SelectItem>
                <SelectItem value="withdrawals">Apenas Retiradas</SelectItem>
                <SelectItem value="both">Depósitos e Retiradas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(state.movementType === "deposits" || state.movementType === "both") && (
            <div className="mt-4">
              <label htmlFor="regularDeposit" className="block text-sm font-medium text-neutral-400">
                Depósito Regular (R$)
              </label>
              <input
                type="number"
                id="regularDeposit"
                value={state.regularDeposit}
                onChange={(e) => dispatch({ type: "SET_REGULAR_DEPOSIT", payload: Number(e.target.value) })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          {(state.movementType === "withdrawals" || state.movementType === "both") && (
            <div className="mt-4">
              <label htmlFor="regularWithdrawal" className="block text-sm font-medium text-neutral-400">
                Retirada Regular (R$)
              </label>
              <input
                type="number"
                id="regularWithdrawal"
                value={state.regularWithdrawal}
                onChange={(e) => dispatch({ type: "SET_REGULAR_WITHDRAWAL", payload: Number(e.target.value) })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          {(state.movementType !== "none") && (
            <div>
              <div>
                <label
                  htmlFor="depositFrequency"
                  className="block text-sm font-medium text-neutral-400"
                >
                  Frequência do Depósito
                </label>
                <select
                  id="depositFrequency"
                  value={state.depositFrequency}
                  onChange={(e) => dispatch({ type: "SET_DEPOSIT_FREQUENCY", payload: e.target.value as Frequency })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="block text-sm font-medium text-neutral-400"
                >
                  Adicionar Depósito no
                </label>
                <select
                  id="depositTiming"
                  value={state.depositTiming}
                  onChange={(e) => dispatch({ type: "SET_DEPOSIT_TIMING", payload: e.target.value as DepositTiming })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="end">Final do Período</option>
                  <option value="beginning">Início do Período</option>
                </select>
              </div>
            </div>
          )}
        </div>


        {(state.movementType === "deposits" || state.movementType === "both") && (
          <div className="mt-4">
            <label htmlFor="regularDeposit" className="block text-sm font-medium text-neutral-400">
              Depósito Regular (R$)
            </label>
            <input
              type="number"
              id="regularDeposit"
              value={state.regularDeposit}
              onChange={(e) => dispatch({ type: "SET_REGULAR_DEPOSIT", payload: Number(e.target.value) })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}

        {(state.movementType === "withdrawals" || state.movementType === "both") && (
          <div className="mt-4">
            <label htmlFor="regularWithdrawal" className="block text-sm font-medium text-neutral-400">
              Retirada Regular (R$)
            </label>
            <input
              type="number"
              id="regularWithdrawal"
              value={state.regularWithdrawal}
              onChange={(e) => dispatch({ type: "SET_REGULAR_WITHDRAWAL", payload: Number(e.target.value) })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}

        {(state.movementType !== "none") && (
          <div>
            <div>
              <label
                htmlFor="depositFrequency"
                className="block text-sm font-medium text-neutral-400"
              >
                Frequência do Depósito
              </label>
              <select
                id="depositFrequency"
                value={state.depositFrequency}
                onChange={(e) => dispatch({ type: "SET_DEPOSIT_FREQUENCY", payload: e.target.value as Frequency })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                className="block text-sm font-medium text-neutral-400"
              >
                Adicionar Depósito no
              </label>
              <select
                id="depositTiming"
                value={state.depositTiming}
                onChange={(e) => dispatch({ type: "SET_DEPOSIT_TIMING", payload: e.target.value as DepositTiming })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
            Calculate
          </button>
        </div>
      </form>
      {state.results && <Breakdown initialInvestment={state.initialInvestment} results={state.results} breakdown={state.breakdown} />}
    </>
  );
}
