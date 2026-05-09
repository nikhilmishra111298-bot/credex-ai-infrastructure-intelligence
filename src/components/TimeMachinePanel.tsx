import type { AuditResult } from "../lib/audit-engine";
import FutureSpendChart from "./FutureSpendChart";

type Props = {
  result: AuditResult;
};

export default function TimeMachinePanel({ result }: Props) {
  return (
    <div className="card-hover dark-card rounded-2xl border bg-white p-5 text-black shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        AI Spend Time Machine
      </p>

      <h3 className="mt-3 text-2xl font-bold">Future AI cost projection</h3>

      <p className="dark-muted mt-2 text-sm text-gray-600">
        If your AI stack keeps growing at the current pattern, your projected
        monthly AI spend may increase by:
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-gray-100 p-4 text-black">
          <p className="text-sm text-gray-500">Future Monthly Spend</p>
          <h4 className="mt-2 text-2xl font-bold">
            ${result.futureMonthlySpend}
          </h4>
        </div>

        <div className="rounded-xl bg-gray-100 p-4 text-black">
          <p className="text-sm text-gray-500">Growth Forecast</p>
          <h4 className="mt-2 text-2xl font-bold">
            {result.futureGrowthPercentage}%
          </h4>
        </div>

        <div className="rounded-xl bg-gray-100 p-4 text-black">
          <p className="text-sm text-gray-500">Future Risk</p>
          <h4 className="mt-2 text-2xl font-bold">
            {result.futureRiskLevel}
          </h4>
        </div>
      </div>

      <FutureSpendChart
        currentSpend={result.totalCurrentSpend}
        futureSpend={result.futureMonthlySpend}
      />

      <div className="mt-5 rounded-xl border bg-black p-4 text-white">
        <p className="text-sm text-gray-300">
          12-month projected AI infrastructure burn
        </p>

        <h4 className="mt-2 text-3xl font-bold">
          ${result.futureAnnualSpend}
        </h4>
      </div>
    </div>
  );
}