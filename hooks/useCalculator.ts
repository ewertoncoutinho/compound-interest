import { useReducer } from "react";
import { calculatorReducer, initialState } from "@/state/reducer";
import { CalculatorState, CalculatorAction } from "@/state/types";

export function useCalculator(): [CalculatorState, React.Dispatch<CalculatorAction>] {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  return [state, dispatch];
}
