/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import LeadCapture from "./LeadCapture";
import SavingsChart from "./SavingsChart";
import { exportAuditReport } from "../lib/export-report";
import {
  runAudit,
  type AuditResult,
  type ToolItem,
  type UseCase,
} from "../lib/audit-engine";

const STORAGE_KEY = "credex-audit-form";

export default function SpendForm() {
  const [tools, setTools] = useState<ToolItem[]>([
    { tool: "ChatGPT", plan: "Plus", monthlySpend: 100, seats: 3 },
  ]);

  const [teamSize, setTeamSize] = useState(3);
  const [useCase, setUseCase] = useState<UseCase>("coding");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);
      setTools(
        parsed.tools || [
          { tool: "ChatGPT", plan: "Plus", monthlySpend: 100, seats: 3 },
        ]
      );
      setTeamSize(parsed.teamSize || 3);
      setUseCase(parsed.useCase || "coding");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ tools, teamSize, useCase })
    );
  }, [tools, teamSize, useCase]);

  function updateTool(
    index: number,
    field: keyof ToolItem,
    value: string | number
  ) {
    const updatedTools = [...tools];
    updatedTools[index] = { ...updatedTools[index], [field]: value };
    setTools(updatedTools);
  }

  function addTool() {
    setTools([
      ...tools,
      { tool: "Cursor", plan: "Pro", monthlySpend: 20, seats: 1 },
    ]);
  }

  function removeTool(index: number) {
    setTools(tools.filter((_, i) => i !== index));
  }
  function resetAudit() {
  const defaultTools = [
    {
      tool: "ChatGPT",
      plan: "Plus",
      monthlySpend: 100,
      seats: 3,
    },
  ];

  setTools(defaultTools);

  setTeamSize(3);

  setUseCase("coding");

  setResult(null);

  setAiSummary("");

  setError("");

  localStorage.removeItem(STORAGE_KEY);

  localStorage.removeItem(
    "credex-latest-audit-result"
  );
}

  async function handleRunAudit() {
    setError("");

  const hasInvalidTool = tools.some(
    (item) => item.monthlySpend < 0 || item.seats < 1
  );

  if (teamSize < 1) {
    setError("Team size must be at least 1.");
    return;
  }

  if (hasInvalidTool) {
    setError("Monthly spend must be 0 or more, and seats must be at least 1.");
    return;
  }

    setLoading(true);

    const audit = runAudit(tools, teamSize, useCase);

    setResult(audit);
    localStorage.setItem("credex-latest-audit-result", JSON.stringify(audit));
    setAiSummary("Generating summary...");

    try {
      const response = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          teamSize: Number(teamSize),
          useCase,
          totalMonthlySavings: audit.totalMonthlySavings,
          recommendations: audit.recommendations,
        }),
      });

      const data = await response.json();
      setAiSummary(data.summary);
    } catch {
      setAiSummary(
        "Your AI stack shows optimization opportunities based on current spending patterns."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 rounded-2xl border bg-white p-6 text-black shadow-sm">
      <div>
        <label className="block text-sm font-medium">Team Size</label>
        <input
          type="number"
          value={teamSize}
          min={1}
          onChange={(e) => setTeamSize(Number(e.target.value))}
          className="mt-2 w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Primary Use Case</label>
        <select
          value={useCase}
          onChange={(e) => setUseCase(e.target.value as UseCase)}
          className="mt-2 w-full rounded-lg border p-3"
        >
          <option value="coding">Coding</option>
          <option value="writing">Writing</option>
          <option value="data">Data</option>
          <option value="research">Research</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>

      {tools.map((item, index) => (
        <div
          key={index}
          className="space-y-4 rounded-xl bg-gray-50 p-4 text-black"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Tool {index + 1}</h3>

            {tools.length > 1 && (
              <button
                type="button"
                onClick={() => removeTool(index)}
                className="text-sm text-red-600"
              >
                Remove
              </button>
            )}
          </div>

          <select
            value={item.tool}
            onChange={(e) => updateTool(index, "tool", e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option>ChatGPT</option>
            <option>Claude</option>
            <option>Cursor</option>
            <option>GitHub Copilot</option>
            <option>Gemini</option>
            <option>Windsurf</option>
          </select>

          <select
            value={item.plan}
            onChange={(e) => updateTool(index, "plan", e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option>Free</option>
            <option>Plus</option>
            <option>Pro</option>
            <option>Business</option>
            <option>Team</option>
            <option>Enterprise</option>
            <option>API direct</option>
          </select>

          <input
            type="number"
            value={item.monthlySpend}
            min={0}
            onChange={(e) =>
              updateTool(index, "monthlySpend", Number(e.target.value))
            }
            placeholder="Monthly spend"
            className="w-full rounded-lg border p-3"
          />

          <input
            type="number"
            value={item.seats}
            min={1}
            onChange={(e) => updateTool(index, "seats", Number(e.target.value))}
            placeholder="Seats"
            className="w-full rounded-lg border p-3"
          />
        </div>
      ))}

  <button
  type="button"
  onClick={addTool}
  className="w-full rounded-xl border px-5 py-3 font-semibold"
>
  + Add another AI tool
</button>

<button
  type="button"
  onClick={resetAudit}
  className="w-full rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-700"
>
  Reset Audit
</button>

{error && (
  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
    {error}
  </div>
)}
      <button
        type="button"
        onClick={handleRunAudit}
        disabled={loading}
        className="w-full rounded-xl bg-black px-5 py-3 font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Generating Audit..." : "Run Free Audit"}
      </button>

      {result && (
        <div className="space-y-6 rounded-2xl border bg-white p-6 text-black shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-black p-5 text-white">
              <p className="text-sm text-gray-300">AI Stack Health</p>
              <h2 className="mt-3 text-5xl font-bold">
                {result.healthScore}
              </h2>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-700">
                <div
                  className="h-full rounded-full bg-green-400"
                  style={{ width: `${result.healthScore}%` }}
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
  ...existing 3 cards...
</div>

<div className="grid gap-4 md:grid-cols-3">
  <div className="rounded-xl border bg-white p-5 text-black">
    <p className="text-sm text-gray-500">
      Total Tools
    </p>

    <h3 className="mt-2 text-3xl font-bold">
      {tools.length}
    </h3>

    <p className="mt-2 text-sm text-gray-500">
      AI platforms currently in use
    </p>
  </div>

  <div className="rounded-xl border bg-white p-5 text-black">
    <p className="text-sm text-gray-500">
      Total Seats
    </p>

    <h3 className="mt-2 text-3xl font-bold">
      {tools.reduce((sum, item) => sum + item.seats, 0)}
    </h3>

    <p className="mt-2 text-sm text-gray-500">
      Combined active AI seats
    </p>
  </div>

  <div className="rounded-xl border bg-white p-5 text-black">
    <p className="text-sm text-gray-500">
      Overspend Risk
    </p>

    <h3 className="mt-2 text-3xl font-bold">
      {result.healthScore < 60
        ? "High"
        : result.healthScore < 80
        ? "Medium"
        : "Low"}
    </h3>

    <p className="mt-2 text-sm text-gray-500">
      Estimated optimization risk level
    </p>
  </div>
</div>
 <div className="rounded-xl border bg-white p-5 text-black">
    <p className="text-sm text-gray-500">
      Current Monthly Spend
    </p>

    <h3 className="mt-2 text-3xl font-bold">
      ${result.totalCurrentSpend}
    </h3>

    <p className="mt-2 text-sm text-gray-500">
      Total AI spend before optimization
    </p>
  </div>
<div className="rounded-xl bg-white p-5 text-black">
              <p className="text-sm text-gray-500">Monthly Savings</p>
              <h2 className="mt-3 text-4xl font-bold text-green-600">
                ${result.totalMonthlySavings}
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Estimated optimization opportunity
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 text-black">
              <p className="text-sm text-gray-500">Annual Savings</p>
              <h2 className="mt-3 text-4xl font-bold">
                ${result.totalAnnualSavings}
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Potential yearly reduction
              </p>
            </div>
          </div>

          {aiSummary && (
            <div className="rounded-xl bg-white p-5 text-black">
              <h3 className="text-lg font-bold">AI Generated Summary</h3>
              <p className="mt-3 whitespace-pre-line text-gray-700">
                {aiSummary}
              </p>
            </div>
          )}

          <SavingsChart
            data={result.recommendations.map((item) => ({
              tool: item.tool,
              savings: item.savings,
            }))}
          />
          {result.recommendations.map((item, index) => (
  <div key={index} className="rounded-xl bg-white p-5 text-black shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg font-bold">
          {item.tool}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Current spend: ${item.currentSpend}/mo
        </p>
      </div>

      <p className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
        Save ${item.savings}/mo
      </p>
    </div>

    <div className="mt-4 flex flex-wrap gap-2">
      <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
        {item.action}
      </span>

      {item.savings > 300 && (
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          High Savings
        </span>
      )}

      {item.savings > 0 && item.savings <= 300 && (
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
          Moderate Savings
        </span>
      )}

      {item.savings === 0 && (
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Optimized
        </span>
      )}
    </div>

    <p className="mt-4 leading-7 text-gray-600">
      {item.reason}
    </p>
  </div>
))}
          {result.totalMonthlySavings > 500 ? (
            <div className="rounded-xl border bg-yellow-50 p-5 text-black">
              <h3 className="text-lg font-bold text-yellow-900">
                Big savings opportunity found
              </h3>
              <p className="mt-2 text-sm text-yellow-800">
                Your audit shows more than $500/month in possible savings.
                Credex may help you reduce costs using discounted AI
                infrastructure credits.
              </p>
              <button
                type="button"
                className="mt-4 w-full rounded-xl bg-black px-5 py-3 font-semibold text-white"
              >
                Book Credex Consultation
              </button>
            </div>
          ) : (
            <div className="rounded-xl border bg-green-50 p-5 text-black">
              <h3 className="text-lg font-bold text-green-900">
                Your AI spend looks healthy
              </h3>
              <p className="mt-2 text-sm text-green-800">
                We did not find a major overspend. Save your report and we’ll
                notify you when new optimizations apply.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => exportAuditReport(result, aiSummary)}
            className="w-full rounded-xl border bg-white px-5 py-3 font-semibold text-black"
          >
            Download PDF Report
          </button>

          <button
            type="button"
            onClick={() => {
              localStorage.setItem(
                "credex-latest-audit-result",
                JSON.stringify(result)
              );
              navigator.clipboard.writeText(`${window.location.origin}/share`);
              alert("Share link copied!");
            }}
            className="w-full rounded-xl border bg-white px-5 py-3 font-semibold text-black"
          >
            Copy Share Link
          </button>

          <LeadCapture />
        </div>
      )}
    </div>
  );
}