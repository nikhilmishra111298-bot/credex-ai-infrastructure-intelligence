import type { AuditResult } from "../lib/audit-engine";

type Props = {
  result: AuditResult;
};

export default function RiskHeatmapPanel({ result }: Props) {
  return (
    <div className="card-hover dark-card rounded-2xl border bg-white p-5 text-black shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        AI Risk Heatmap
      </p>

      <h3 className="mt-3 text-2xl font-bold">
        Future infrastructure risk signals
      </h3>

      <p className="dark-muted mt-2 text-sm text-gray-600">
        This heatmap identifies where your AI stack may become expensive,
        duplicated, or inefficient.
      </p>

      <div className="mt-5 space-y-4">
        {result.riskHeatmap.map((item) => (
          <div key={item.label} className="rounded-xl border bg-gray-50 p-4 text-black">
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold">{item.label}</p>

             <span
  className={`rounded-full px-3 py-1 text-xs font-semibold ${
    item.level === "High"
      ? "bg-red-100 text-red-700"
      : item.level === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700"
  }`}
>
  {item.level}
</span>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-200">
              <div
  className={`h-full rounded-full ${
    item.level === "High"
      ? "bg-red-500"
      : item.level === "Medium"
      ? "bg-yellow-500"
      : "bg-green-500"
  }`}
  style={{ width: `${item.score}%` }}
/>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Risk score: {item.score}/100
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}