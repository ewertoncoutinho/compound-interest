"use client";

import { useMemo, FormEvent } from "react";
import { ChartColumn } from "lucide-react";
import {
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Button,
} from "ui";
import { DepositTiming, Frequency, MovementType } from "@/types/frequency";
import { calculateCompoundInterest } from "@/lib/compoundInterest";
import { useCalculator } from "@/hooks/useCalculator";
import Breakdown from "@/components/breakdown";

export const Calculator = () => {
  const [state, dispatch] = useCalculator();
  const currencies = ["R$", "$", "€", "£", "₹", "¥"];
  const termInYears = useMemo(
    () => state.years + state.months / 12,
    [state.years, state.months]
  );

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
    <div className="container mx-auto pt-6 px-4 flex flex-col lg:pt-20 lg:flex-row gap-8 min-h-screen">
      <div className="w-full lg:max-w-[360px] lg:sticky lg:top-20 self-start">
        <div className="rounded-t-sm h-10 flex items-center justify-center gap-2 text-neutral-300 lg:border lg:border-b-0">
          <ChartColumn size={20} />
          <h1 className="text-md">Compound Interest</h1>
        </div>
        <form
          onSubmit={handleCalculate}
          className="flex flex-col gap-y-5 rounded-b-md lg:border lg:p-4"
        >
          <div className="md:col-span-2">
            <label
              htmlFor="initialInvestment"
              className="flex mb-1 text-sm font-medium text-neutral-400"
            >
              Currency
            </label>
            <div className="flex border dark:border-input rounded-md overflow-hidden">
              {currencies.map((symbol) => (
                <Button
                  key={symbol}
                  variant="currency"
                  type="button"
                  className="flex-1 cursor-pointer border-0 rounded-none bg-background not-first:border-l not-first:border-muted"
                  onClick={() =>
                    dispatch({
                      type: "SET_CURRENCY",
                      payload: symbol,
                    })
                  }
                >
                  {symbol}
                </Button>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="initialInvestment"
              className="flex mb-1 text-sm font-medium text-neutral-400"
            >
              Initial investment
            </label>
            <div className="flex">
              <Button
                className="rounded-r-none border-r-0 w-12 hover:red"
                type="button"
                variant="neutral"
              >
                {state.currency}
              </Button>
              <Input
                id="initialInvestment"
                className="rounded-l-none"
                value={state.initialInvestment || ""}
                placeholder="0"
                onChange={(e) =>
                  dispatch({
                    type: "SET_INITIAL_INVESTMENT",
                    payload: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-grow">
              <label
                htmlFor="interestRate"
                className="flex mb-1 text-sm font-medium text-neutral-400"
              >
                Interest rate
              </label>
              <div className="relative">
                <Input
                  id="interestRate"
                  className="pr-6"
                  value={state.interestRate || ""}
                  placeholder="0"
                  onChange={(e) =>
                    dispatch({
                      type: "SET_INTEREST_RATE",
                      payload: Number(e.target.value),
                    })
                  }
                />
                <span className="w-5 flex justify-center absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                  %
                </span>
              </div>
            </div>
            <Select
              value={state.interestRateFrequency}
              onValueChange={(e) =>
                dispatch({
                  type: "SET_INTEREST_RATE_FREQUENCY",
                  payload: e as Frequency,
                })
              }
            >
              <SelectTrigger className="w-[280px]" id="interestRateFrequency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label
              id="compoundFrequency"
              className="flex mb-2 text-sm font-medium text-neutral-400"
            >
              Compound frequency
            </label>
            <Select
              aria-labelledby="compoundFrequency"
              value={state.compoundFrequency}
              onValueChange={(e) =>
                dispatch({
                  type: "SET_COMPOUND_FREQUENCY",
                  payload: e as Frequency,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily (365/yr)</SelectItem>
                <SelectItem value="weekly">Weekly (52/yr)</SelectItem>
                <SelectItem value="monthly">Monthly (12/yr)</SelectItem>
                <SelectItem value="quarterly">Quarterly (4/yr)</SelectItem>
                <SelectItem value="annual">Yearly (1/yr)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <div>
              <label className="flex mb-2 text-sm font-medium text-neutral-400">
                Years
              </label>
              <Input
                id="years"
                value={state.years || ""}
                placeholder="0"
                onChange={(e) =>
                  dispatch({
                    type: "SET_YEARS",
                    payload: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="flex mb-2 text-sm font-medium text-neutral-400">
                Months
              </label>
              <Input
                id="months"
                value={state.months || ""}
                placeholder="0"
                onChange={(e) =>
                  dispatch({
                    type: "SET_MONTHS",
                    payload: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div>
            <div>
              <label
                htmlFor="state.movementType"
                className="flex mb-2 text-sm font-medium text-neutral-400"
              >
                Additional contributions
              </label>
              <Select
                value={state.movementType}
                onValueChange={(e) =>
                  dispatch({
                    type: "SET_MOVEMENT_TYPE",
                    payload: e as MovementType,
                  })
                }
                disabled
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="deposits">Apenas Depósitos</SelectItem>
                  <SelectItem value="withdrawals">Apenas Retiradas</SelectItem>
                  <SelectItem value="both">Depósitos e Retiradas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(state.movementType === "deposits" ||
              state.movementType === "both") && (
              <div className="mt-4">
                <label
                  htmlFor="regularDeposit"
                  className="block text-sm font-medium text-neutral-400"
                >
                  Depósito Regular (R$)
                </label>
                <input
                  type="number"
                  id="regularDeposit"
                  value={state.regularDeposit}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_REGULAR_DEPOSIT",
                      payload: Number(e.target.value),
                    })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}

            {(state.movementType === "withdrawals" ||
              state.movementType === "both") && (
              <div className="mt-4">
                <label
                  htmlFor="regularWithdrawal"
                  className="block text-sm font-medium text-neutral-400"
                >
                  Retirada Regular (R$)
                </label>
                <input
                  type="number"
                  id="regularWithdrawal"
                  value={state.regularWithdrawal}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_REGULAR_WITHDRAWAL",
                      payload: Number(e.target.value),
                    })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}

            {state.movementType !== "none" && (
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
                    onChange={(e) =>
                      dispatch({
                        type: "SET_DEPOSIT_FREQUENCY",
                        payload: e.target.value as Frequency,
                      })
                    }
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
                    onChange={(e) =>
                      dispatch({
                        type: "SET_DEPOSIT_TIMING",
                        payload: e.target.value as DepositTiming,
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="end">Final do Período</option>
                    <option value="beginning">Início do Período</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {(state.movementType === "deposits" ||
            state.movementType === "both") && (
            <div className="mt-4">
              <label
                htmlFor="regularDeposit"
                className="block text-sm font-medium text-neutral-400"
              >
                Depósito Regular (R$)
              </label>
              <input
                type="number"
                id="regularDeposit"
                value={state.regularDeposit}
                onChange={(e) =>
                  dispatch({
                    type: "SET_REGULAR_DEPOSIT",
                    payload: Number(e.target.value),
                  })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          {(state.movementType === "withdrawals" ||
            state.movementType === "both") && (
            <div className="mt-4">
              <label
                htmlFor="regularWithdrawal"
                className="block text-sm font-medium text-neutral-400"
              >
                Retirada Regular (R$)
              </label>
              <input
                type="number"
                id="regularWithdrawal"
                value={state.regularWithdrawal}
                onChange={(e) =>
                  dispatch({
                    type: "SET_REGULAR_WITHDRAWAL",
                    payload: Number(e.target.value),
                  })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          {state.movementType !== "none" && (
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
                  onChange={(e) =>
                    dispatch({
                      type: "SET_DEPOSIT_FREQUENCY",
                      payload: e.target.value as Frequency,
                    })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="annual">Anual</option>
                  <option value="monthly">Mensal</option>
                  <option value="weekly">Semanal</option>
                  <option value="daily">Diária</option>
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
                  onChange={(e) =>
                    dispatch({
                      type: "SET_DEPOSIT_TIMING",
                      payload: e.target.value as DepositTiming,
                    })
                  }
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
      </div>
      <div className="flex-1">
        <Breakdown data={state} />
      </div>
    </div>
  );
};

export default Calculator;
