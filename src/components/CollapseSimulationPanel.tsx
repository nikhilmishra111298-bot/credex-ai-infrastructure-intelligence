import type { AuditResult } from "../lib/audit-engine";

type Props = {
  result: AuditResult;
};

export default function CollapseSimulationPanel({ result }: Props) {
  return (
    <div className="card-hover dark-card rounded-2xl border bg-white p-5 text-black shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        AI Infrastructure Collapse Simulation
      </p>

      <h3 className="mt-3 text-2xl font-bold">
        What happens if your AI stack fails?
      </h3>

      <p className="dark-muted mt-2 text-sm text-gray-600">
        This simulation estimates productivity and cost exposure if your current
        AI tooling becomes unavailable, overpriced, or vendor-locked.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-gray-50 p-4 text-black">
          <p className="text-sm text-gray-500">Productivity Loss</p>
          <h4 className="mt-2 text-3xl font-bold">
            {result.collapseRisk.productivityLoss}%
          </h4>
        </div>

        <div className="rounded-xl border bg-gray-50 p-4 text-black">
          <p className="text-sm text-gray-500">Downtime Cost</p>
          <h4 className="mt-2 text-3xl font-bold">
            ${result.collapseRisk.estimatedDowntimeCost}
          </h4>
        </div>

        <div className="rounded-xl border bg-gray-50 p-4 text-black">
          <p className="text-sm text-gray-500">Vendor Dependency</p>
          <h4 className="mt-2 text-3xl font-bold">
            {result.collapseRisk.vendorDependency}
          </h4>
        </div>
      </div>

      <div className="mt-5 rounded-xl border bg-black p-4 text-white">
        <p className="text-sm text-gray-300">
          Simulation insight
        </p>

        <p className="mt-2 leading-7">
          A highly concentrated AI stack can create operational risk. Credex can
          help teams plan fallback tooling, reduce vendor lock-in, and avoid
          sudden AI infrastructure cost shocks.
        </p>
      </div>
    </div>
  );
}