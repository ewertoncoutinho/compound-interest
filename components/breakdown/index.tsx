import { formatCurrency } from "@/lib/formatters";
import { CalculatorState } from "@/state/types";
import {
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui";

interface BreakdownProps {
  data: CalculatorState;
}

export const Breakdown = ({ data }: BreakdownProps) => {
  const YEARS = data.breakdown.at(-1)?.year ?? null;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl">Calculation for {YEARS} years</h2>
        <Separator />
        <div>
          <p className="text-sm">Future investment value</p>
          <p className="text-2xl font-bold text-green-400">
            {formatCurrency(data.results?.finalBalance, data.currency)}
          </p>
        </div>
        <div>
          <p className="text-sm">Total interest earned</p>
          <p className="text-2xl font-bold text-orange-400">
            {formatCurrency(data.results?.totalInterest, data.currency)}
          </p>
        </div>
        <div>
          <p className="text-sm">Initial balance</p>
          <p className="text-2xl font-bold text-blue-400">
            {formatCurrency(data.results?.totalPrincipal, data.currency)}
          </p>
        </div>
      </div>
      <div className="my-8 border p-8 rounded-md">
        <h3 className="text-xl mb-4">Yearly breakdown</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Year</TableHead>
              <TableHead className="w-40">Interest</TableHead>
              <TableHead className="w-40">Accrued Interest</TableHead>
              <TableHead className="w-40 text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.breakdown.map((item) => (
              <TableRow key={item.year}>
                <TableCell>{item.year}</TableCell>
                <TableCell>{formatCurrency(item.interest, data.currency)}</TableCell>
                <TableCell>
                  {formatCurrency(item.endBalance - data.initialInvestment, data.currency)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(item.endBalance, data.currency)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Breakdown;
