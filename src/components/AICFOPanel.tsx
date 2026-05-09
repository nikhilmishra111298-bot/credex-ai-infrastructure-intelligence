import type { AuditResult } from "../lib/audit-engine";

type Props = {
  result: AuditResult;
};

export default function AICFOPanel({ result }: Props) {
  return (
    <div className="card-hover dark-card rounded-2xl border bg-white p-5 text-black shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        Autonomous AI CFO
      </p>

      <h3 className="mt-3 text-2xl font-bold">
        AI infrastructure financial advisor
      </h3>

      <p className="dark-muted mt-2 text-sm text-gray-600">
        Credex analyzes your AI stack like a CFO and gives finance-focused
        actions to reduce future AI burn.
      </p>

     <div className="mt-5 space-y-3">
  {(result.aiCFORecommendations || []).map((item, index) => (
    <div
      key={index}
      className="rounded-xl border bg-gray-50 p-4 text-black"
    >
      <p className="text-sm font-semibold text-gray-500">
        CFO Recommendation {index + 1}
      </p>

      <p className="mt-2 leading-7 text-gray-700">
        {item}
      </p>
    </div>
  ))}
</div>
    </div>
  );
}