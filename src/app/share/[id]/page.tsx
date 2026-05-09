import { supabase } from "../../../lib/supabase";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type Recommendation = {
  tool: string;
  currentSpend: number;
  action: string;
  reason: string;
  savings: number;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  return {
    title: "Credex AI Spend Audit",
    description: "Shared AI spend optimization report powered by Credex.",
    openGraph: {
      title: "Credex AI Spend Audit",
      description: "See this AI infrastructure savings report.",
      url: `/share/${id}`,
      siteName: "Credex",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Credex AI Spend Audit",
      description: "AI tooling optimization and savings report.",
    },
  };
}

export default async function SharePage({ params }: Props) {
  const { id } = await params;

  const { data: audit } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (!audit) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-12 text-black">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-6">
          <h1 className="text-3xl font-bold">Audit not found</h1>
          <p className="mt-3 text-gray-600">
            This share link does not match a saved audit.
          </p>
        </div>
      </main>
    );
  }

  const result = audit.result;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 text-black">
      <div className="mx-auto max-w-3xl space-y-5 rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-gray-500">
          Public AI Spend Audit
        </p>

        <h1 className="text-4xl font-bold">
          AI Stack Health Score: {result.healthScore}
        </h1>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-gray-100 p-5">
            <p className="text-sm text-gray-500">Monthly Savings</p>
            <h2 className="text-3xl font-bold">
              ${result.totalMonthlySavings}
            </h2>
          </div>

          <div className="rounded-xl bg-gray-100 p-5">
            <p className="text-sm text-gray-500">Annual Savings</p>
            <h2 className="text-3xl font-bold">
              ${result.totalAnnualSavings}
            </h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-gray-100 p-5">
            <p className="text-sm text-gray-500">Future Monthly Spend</p>
            <h2 className="text-3xl font-bold">
              ${result.futureMonthlySpend}
            </h2>
          </div>

          <div className="rounded-xl bg-gray-100 p-5">
            <p className="text-sm text-gray-500">Future Risk Level</p>
            <h2 className="text-3xl font-bold">{result.futureRiskLevel}</h2>
          </div>
        </div>

        {result.collapseRisk && (
          <div className="rounded-xl border bg-white p-5">
            <h3 className="text-xl font-bold">
              AI Infrastructure Collapse Simulation
            </h3>

            <p className="mt-2 text-gray-600">
              Productivity loss risk: {result.collapseRisk.productivityLoss}%
            </p>

            <p className="mt-1 text-gray-600">
              Estimated downtime cost: $
              {result.collapseRisk.estimatedDowntimeCost}
            </p>

            <p className="mt-1 text-gray-600">
              Vendor dependency: {result.collapseRisk.vendorDependency}
            </p>
          </div>
        )}

        {result.aiCFORecommendations && (
          <div className="rounded-xl border bg-white p-5">
            <h3 className="text-xl font-bold">Autonomous AI CFO</h3>

            <div className="mt-3 space-y-2">
              {result.aiCFORecommendations.map(
                (item: string, index: number) => (
                  <p key={index} className="text-gray-600">
                    {index + 1}. {item}
                  </p>
                )
              )}
            </div>
          </div>
        )}

        {result.recommendations.map((item: Recommendation, index: number) => (
          <div key={index} className="rounded-xl border p-5">
            <div className="flex justify-between gap-4">
              <h3 className="font-bold">{item.tool}</h3>
              <p className="font-semibold text-green-600">
                Save ${item.savings}/mo
              </p>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Current spend: ${item.currentSpend}/mo
            </p>

            <p className="mt-3 font-medium">{item.action}</p>
            <p className="mt-1 text-gray-600">{item.reason}</p>
          </div>
        ))}
      </div>
    </main>
  );
}