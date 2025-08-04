"use client";

import { useMemo, FormEvent, useState } from "react";
import { ChartColumn } from "lucide-react";
import { Input, Select, SelectTrigger, SelectContent, SelectItem, SelectValue, Button } from "ui";
import { DepositTiming, Frequency, MovementType } from "@/types/frequency";
import { calculateCompoundInterest } from "@/lib/compoundInterest";
import { useCalculator } from "@/hooks/useCalculator";
import Breakdown from "@/components/breakdown";

export const Calculator = () => {
  const [state, dispatch] = useCalculator();
  const [currency, setCurrency] = useState("R$");
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
      <div className="mx-auto rounded-xl px-4 mt-4 max-w-[360px]">
        <div className="border border-b-0 rounded-t-sm h-10 flex items-center justify-center gap-2 text-neutral-300">
          <ChartColumn size={20} />
          <h1 className='text-md'>Compound Interest</h1>
        </div>
        <form onSubmit={handleCalculate} className="flex flex-col gap-y-5 p-4 border rounded-b-md">
          <div className="md:col-span-2">
            <label
              htmlFor="initialInvestment"
              className="flex mb-1 text-sm font-medium text-neutral-400"
            >
              Currency:
            </label>
            <div className="flex">
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer rounded-r-none border-r-0 flex-1"
                onClick={() => setCurrency("R$")}
              >
                R$
              </Button>
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer rounded-none border-r-0 flex-1"
                onClick={() => setCurrency("$")}
              >
                $
              </Button>
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer rounded-none border-r-0 flex-1"
                onClick={() => setCurrency("€")}
              >
                €
              </Button>
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer rounded-none border-r-0 flex-1"
                onClick={() => setCurrency("£")}
              >
                £
              </Button>
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer rounded-none border-r-0 flex-1"
                onClick={() => setCurrency("₹")}
              >
                ₹
              </Button>
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer  rounded-l-none flex-1"
                onClick={() => setCurrency("¥")}
              >
                ¥
              </Button>
            </div>
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="initialInvestment"
              className="flex mb-1 text-sm font-medium text-neutral-400"
            >
              Initial investment:
            </label>
            <div className="flex">
              <Button className="rounded-r-none w-12 hover:red" variant="neutral">{currency}</Button>
              <Input
                id="initialInvestment"
                className="rounded-l-none"
                value={state.initialInvestment || ""}
                placeholder="0"
                onChange={(e) => dispatch({ type: "SET_INITIAL_INVESTMENT", payload: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-grow">
              <label
                htmlFor="interestRate"
                className="flex mb-1 text-sm font-medium text-neutral-400"
              >
                Interest rate:
              </label>
              <div className="relative">
                <Input
                  id="interestRate"
                  className="pr-6"
                  value={state.interestRate || ""}
                  placeholder="0"
                  onChange={(e) => dispatch({ type: "SET_INTEREST_RATE", payload: Number(e.target.value) })}
                />
                <span className="w-5 flex justify-center absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                  %
                </span>
              </div>

            </div>
            <Select
              value={state.interestRateFrequency}
              onValueChange={(e) => dispatch({ type: "SET_INTEREST_RATE_FREQUENCY", payload: e as Frequency })}
            >
              <SelectTrigger className="w-[280px]" id="interestRateFrequency">
                <SelectValue />
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
                <SelectValue />
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
                disabled
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
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
          <Button
            variant="default"
            type="submit"
            className="w-full cursor-pointer"
          >
            Calculate
          </Button>
        </form>
        {state.results && <Breakdown initialInvestment={state.initialInvestment} results={state.results} breakdown={state.breakdown} />}
      </div>
    </>
  );
}

export default Calculator;