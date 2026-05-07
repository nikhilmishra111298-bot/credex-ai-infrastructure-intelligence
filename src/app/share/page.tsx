/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import type { AuditResult } from "../../lib/audit-engine";

export default function SharePage() {
  const [result, setResult] = useState<AuditResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("credex-latest-audit-result");

    if (saved) {
      setResult(JSON.parse(saved));
    }
  }, []);

  if (!result) {
    return (
      <main className="min-h-screen bg-white px-6 py-12">
        <p>No shared audit found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <section className="mx-auto max-w-3xl space-y-5 rounded-2xl border p-8 shadow-sm">
        <p className="text-sm font-semibold text-gray-500">
          Public AI Spend Audit
        </p>

        <h1 className="text-4xl font-bold">
          AI Stack Health Score: {result.healthScore}
        </h1>

        <div className="grid gap-4 md:grid-cols-2">
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

        {result.recommendations.map((item, index) => (
          <div key={index} className="rounded-xl border p-5">
            <h3 className="font-bold">{item.tool}</h3>
            <p className="mt-1 text-sm text-gray-500">
              Current spend: ${item.currentSpend}/mo
            </p>
            <p className="mt-2 font-medium">{item.action}</p>
            <p className="text-gray-600">{item.reason}</p>
          </div>
        ))}
      </section>
    </main>
  );
}