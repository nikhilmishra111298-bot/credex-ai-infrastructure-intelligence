import type { AuditResult } from "../lib/audit-engine";

type Props = {
  result: AuditResult;
};

export default function AIPersonalityPanel({ result }: Props) {
  return (
    <div className="card-hover dark-card rounded-2xl border bg-white p-5 text-black shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        AI Personality Engine
      </p>

      <h3 className="mt-3 text-2xl font-bold">
        {result.aiPersonality.type}
      </h3>

      <p className="dark-muted mt-3 leading-7 text-gray-600">
        {result.aiPersonality.description}
      </p>

      <div className="mt-5 rounded-xl border bg-black p-4 text-white">
        <p className="text-sm text-gray-300">
          Behavioral AI infrastructure profile
        </p>

        <p className="mt-2 leading-7">
          Credex analyzes AI adoption patterns, infrastructure scaling behavior,
          spend growth, and operational dependency to classify your company’s
          AI operating style.
        </p>
      </div>
    </div>
  );
}