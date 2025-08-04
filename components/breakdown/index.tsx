import { formatCurrency } from "@/lib/formatters";
import { CalculationResult, YearlyBreakdown } from "@/types/frequency";

interface BreakdownProps {
    initialInvestment: number;
    results: CalculationResult;
    breakdown: YearlyBreakdown[];
}

export const Breakdown = ({ initialInvestment, results, breakdown }: BreakdownProps) => {
    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Resultados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-blue-100 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 font-semibold">Valor Final</p>
                    <p className="text-2xl font-bold text-blue-900">
                        {formatCurrency(results?.finalBalance)}
                    </p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800 font-semibold">
                        Total Investido
                    </p>
                    <p className="text-2xl font-bold text-yellow-900">
                        {formatCurrency(results?.totalPrincipal)}
                    </p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                    <p className="text-sm text-green-800 font-semibold">
                        Total em Juros
                    </p>
                    <p className="text-2xl font-bold text-green-900">
                        {formatCurrency(results?.totalInterest)}
                    </p>
                </div>
            </div>
            <div className="mt-10 overflow-x-auto">
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
            </div>
        </div>
    )
}

export default Breakdown;