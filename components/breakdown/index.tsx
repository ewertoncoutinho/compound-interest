import { formatCurrency } from "@/lib/formatters";
import { CalculationResult, YearlyBreakdown } from "@/types/frequency";
import { Separator } from "ui";

interface BreakdownProps {
    initialInvestment: number;
    results: CalculationResult;
    breakdown: YearlyBreakdown[];
    years: number;
}

export const Breakdown = ({ initialInvestment, results, breakdown, years }: BreakdownProps) => {
    console.log("🚀 ~ Breakdown ~ breakdown:", breakdown)
    console.log("🚀 ~ Breakdown ~ initialInvestment:", initialInvestment)
    return (
        <div className="flex flex-col gap-1 my-10">
            <div className="flex flex-col gap-4">
                <h2 className="text-xl">
                    Interest calculation for {years} years
                </h2>
                <Separator />
                <div>
                    <p className="text-sm">Future investment value</p>
                    <p className="text-2xl text-green-400">
                        {formatCurrency(results?.finalBalance)}
                    </p>
                </div>
                <div>
                    <p className="text-sm">Total interest earned</p>
                    <p className="text-2xl text-orange-400">
                        {formatCurrency(results?.totalPrincipal)}
                    </p>
                </div>
                <div>
                    <p className="text-sm">Initial balance</p>
                    <p className="text-2xl text-blue-400">
                        {formatCurrency(results?.totalInterest)}
                    </p>
                </div>
            </div>
            {/* <div className="mt-10 overflow-x-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Detalhamento
                </h3>
                <table className="min-w-full border border-gray-200">
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
            </div> */}
        </div>
    )
}

export default Breakdown;