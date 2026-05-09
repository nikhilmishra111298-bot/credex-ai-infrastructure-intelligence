import type { AuditResult } from "../lib/audit-engine";

type Props = {
  result: AuditResult;
};

export default function ToolDNAPanel({ result }: Props) {
  return (
    <div className="card-hover dark-card rounded-2xl border bg-white p-5 text-black shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        AI Tool DNA Mapping
      </p>

      <h3 className="mt-3 text-2xl font-bold">
        Your AI stack personality
      </h3>

      <p className="dark-muted mt-2 text-sm text-gray-600">
        Credex classifies each AI tool based on cost behavior, overlap risk, and stack importance.
      </p>

      <div className="mt-5 space-y-3">
        {result.toolDNA.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border bg-gray-50 p-4 text-black"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h4 className="font-bold">{item.tool}</h4>

              <span className="w-fit rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                {item.dnaType}
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              {item.insight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}