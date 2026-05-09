/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import LeadCapture from "./LeadCapture";
import SavingsChart from "./SavingsChart";
import { exportAuditReport } from "../lib/export-report";
import toast from "react-hot-toast";
import TimeMachinePanel from "./TimeMachinePanel";
import ToolDNAPanel from "./ToolDNAPanel";
import RiskHeatmapPanel from "./RiskHeatmapPanel";
import CollapseSimulationPanel from "./CollapseSimulationPanel";
import AICFOPanel from "./AICFOPanel";
import AIPersonalityPanel from "./AIPersonalityPanel";
import {
  runAudit,
  type AuditResult,
  type ToolItem,
  type UseCase,
} from "../lib/audit-engine";

const STORAGE_KEY = "credex-audit-form";

export default function SpendForm() {
  const [tools, setTools] = useState<ToolItem[]>([
    { tool: "ChatGPT", plan: "Plus", monthlySpend: 100, seats: 0 },
  ]);

  const [teamSize, setTeamSize] = useState(3);
  const [useCase, setUseCase] = useState<UseCase>("coding");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [auditId, setAuditId] = useState("");

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
      { tool: "ChatGPT", plan: "Plus", monthlySpend: 100, seats: 3 },
    ];

    setTools(defaultTools);
    setTeamSize(3);
    setUseCase("coding");
    setResult(null);
    setAiSummary("");
    setError("");

    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("credex-latest-audit-result");
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
  const saveResponse = await fetch("/api/audits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamSize,
      useCase,
      tools,
      result: audit,
    }),
  });

  const saveData = await saveResponse.json();

  if (saveData.success && saveData.audit?.id) {
    setAuditId(saveData.audit.id);
  }
} catch {
  console.log("Audit save failed, but audit still works locally.");
}
    try {
     const response = await fetch("/api/summary", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  cache: "no-store",
  body: JSON.stringify({
    teamSize: Number(teamSize),
    useCase,
    totalMonthlySavings: audit.totalMonthlySavings,
    recommendations: audit.recommendations,

    futureGrowthPercentage:
      audit.futureGrowthPercentage,

    futureRiskLevel:
      audit.futureRiskLevel,
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
    <div className="space-y-5 rounded-3xl border bg-white p-4 text-black shadow-sm sm:p-6">
      <div>
        <label className="block text-sm font-semibold tracking-wide text-gray-700">
          Team Size
          </label>
        
        <input
          type="number"
          value={teamSize}
          min={1}
          onChange={(e) => setTeamSize(Number(e.target.value))}
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white p-3 outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/5"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold tracking-wide text-gray-700">
          Primary Use Case
          </label>
        
        <select
          value={useCase}
          onChange={(e) => setUseCase(e.target.value as UseCase)}
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white p-3 outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/5"
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
          className="card-hover rounded-2xl border border-transparent bg-gray-50 p-4 text-black shadow-sm transition-all sm:p-5">
          <div className="flex items-center gap-2">
  <div className="h-3 w-3 rounded-full bg-black" />

  <h3 className="font-bold">
    Tool {index + 1}
  </h3>
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
            className="w-full rounded-xl border border-gray-200 bg-white p-3 outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/5"
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
            className="w-full rounded-xl border border-gray-200 bg-white p-3 outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/5"
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
            className="w-full rounded-xl border border-gray-200 bg-white p-3 outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/5"
          />

          <input
            type="number"
            value={item.seats}
            min={1}
            onChange={(e) => updateTool(index, "seats", Number(e.target.value))}
            placeholder="Seats"
            className="w-full rounded-xl border border-gray-200 bg-white p-3 outline-none transition-all focus:border-black focus:ring-2 focus:ring-black/5"
          />
        </div>
      ))}

      <button
        type="button"
        aria-label="Add another AI tool"
        onClick={addTool}
        className="card-hover w-full rounded-xl border bg-white px-5 py-3 font-semibold"
      >
        + Add another AI tool
      </button>

      <button
        type="button"
        aria-label="Reset audit form"
        onClick={resetAudit}
        className="card-hover w-full rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-700"
        >
          Reset Audit
      </button>

      {error && (
        <div className="animate-pulse rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <button
        type="button"
        aria-label="Run AI spend audit"
        onClick={handleRunAudit}
        disabled={loading}
        aria-busy={loading}
        className="glow-button card-hover w-full rounded-xl bg-black px-5 py-3 font-semibold text-white shadow-lg disabled:opacity-60"
      >
        {loading ? "Generating Audit..." : "Run Free Audit"}
      </button>


      {loading && (
  <div className="space-y-4 rounded-2xl border bg-white p-5 shadow-sm">
    <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
      <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
      <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
    </div>

    <div className="h-64 animate-pulse rounded-xl bg-gray-200" />

    <div className="space-y-3">
      <div className="h-24 animate-pulse rounded-xl bg-gray-200" />
      <div className="h-24 animate-pulse rounded-xl bg-gray-200" />
    </div>
  </div>
)}

      {result && (
      <div  className="fade-up animate-delay-1 space-y-5 rounded-3xl border border-white/10 bg-white/90 p-4 text-black shadow-sm backdrop-blur sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card-hover rounded-xl bg-black p-5 text-white shadow-lg">
              <p className="text-sm text-gray-300">
                
                AI Stack Health

                </p>
              <h2 className="bg-linear-to-r from-green-400 to-emerald-300 bg-clip-text text-5xl font-bold text-transparent">
  {result.healthScore}
</h2>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-700">
                <div
                  className="h-full rounded-full bg-green-400"
                  style={{ width: `${result.healthScore}%` }}
                />
              </div>
            </div>

          <div  className="card-hover dark-card rounded-xl border border-transparent bg-white p-5 text-black shadow-sm">
              <p className="text-sm text-gray-500">
                
                Monthly Savings
                
                </p>
              <h2 className="bg-linear-to-r from-green-500 to-emerald-400 bg-clip-text text-4xl font-bold text-transparent">
  ${result.totalMonthlySavings}
</h2>
              <p className="dark-muted mt-2 text-sm text-gray-500">
  Estimated optimization opportunity
</p>
            </div>

            <div className="card-hover dark-card rounded-xl border border-transparent bg-white p-5 text-black shadow-sm">
              <p className="text-sm text-gray-500">
                
                Annual Savings
                
                </p>
              <h2 className="bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent">
  ${result.totalAnnualSavings}
</h2>
              <p className="dark-muted mt-2 text-sm text-gray-500">
                Potential yearly reduction
              </p>
            </div>
          </div>

          <div className="card-hover dark-card rounded-xl border border-transparent bg-white p-5 text-black shadow-sm">
            <div className="rounded-xl border bg-white p-5 text-black">
              <p className="text-sm text-gray-500">
                
                Total Tools
                
                </p>
              <h3 className="mt-2 text-3xl font-bold">{tools.length}</h3>
              <p className="dark-muted mt-2 text-sm text-gray-500">
                AI platforms currently in use
              </p>
            </div>

            <div className="card-hover dark-card rounded-xl border border-transparent bg-white p-5 text-black shadow-sm">
              <p className="text-sm text-gray-500">
                
                Total Seats
                
                </p>
              <h3 className="mt-2 text-3xl font-bold">
                {tools.reduce((sum, item) => sum + item.seats, 0)}
              </h3>
             <p className="dark-muted mt-2 text-sm text-gray-500">
                Combined active AI seats
              </p>
            </div>

            <div className="card-hover dark-card rounded-xl border border-transparent bg-white p-5 text-black shadow-sm">
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
             <p className="dark-muted mt-2 text-sm text-gray-500">
                Estimated optimization risk level
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card-hover dark-card rounded-xl border border-transparent bg-white p-5 text-black shadow-sm">
              <p className="text-sm text-gray-500">
                
                Current Monthly Spend
                
                </p>
              <h3 className="mt-2 text-3xl font-bold">
                ${result.totalCurrentSpend}
              </h3>
             <p className="dark-muted mt-2 text-sm text-gray-500">
                Total AI spend before optimization
              </p>
            </div>

            <div className="card-hover dark-card rounded-xl border border-transparent bg-white p-5 text-black shadow-sm">
              <p className="text-sm text-gray-500">
                
                
                Savings Rate
                
                
                </p>
              <h3 className="mt-2 text-3xl font-bold">
                {result.savingsPercentage}%
              </h3>
              <p className="dark-muted mt-2 text-sm text-gray-500">
                Percentage of spend that may be reduced
              </p>
            </div>
          </div>


          <TimeMachinePanel result={result} />
          <ToolDNAPanel result={result} />
          <RiskHeatmapPanel result={result} />
          <CollapseSimulationPanel result={result} />
          <AICFOPanel result={result} />
          <AIPersonalityPanel result={result} />
          

          {aiSummary && (
            <div
            className="card-hover dark-card rounded-xl border bg-white p-5 text-black">
              <h3 className="text-lg font-bold">
                
                
                AI Generated Summary
                
                
                </h3>
              <p className="dark-muted mt-3 whitespace-pre-line text-gray-700">
                {aiSummary}
              </p>
            </div>
          )}

                <div className="card-hover dark-card rounded-2xl border bg-white p-4 shadow-sm">
            <SavingsChart
              data={result.recommendations.map((item) => ({
                tool: item.tool,
                savings: item.savings,
              }))}
            />
          </div>

          {result.recommendations.map((item, index) => (
  <div
    key={index}
    style={{
      animationDelay: `${index * 120}ms`,
    }}
              className="card-hover dark-card rounded-xl border bg-white p-5 text-black shadow-sm"
            >
              <div className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold">{item.tool}</h3>

      <p className="dark-muted mt-1 text-sm text-gray-500">
        Current spend: ${item.currentSpend}/mo
        </p>
        </div>

                <p className="w-fit rounded-full bg-linear-to-r from-green-100 to-emerald-100 px-3 py-1 text-sm font-semibold text-green-700 shadow-sm">
  Save ${item.savings}/mo
</p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
  <span className="bg-linear-to-r from-black to-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm">
  {item.action}
</span>

  {item.savings >= 500 && (
    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
      Critical Overspend
    </span>
  )}

  {item.savings >= 200 && item.savings < 500 && (
    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
      Moderate Overspend
    </span>
  )}

  {item.savings > 0 && item.savings < 200 && (
    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
      Small Optimization
    </span>
  )}

  {item.savings === 0 && (
    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
      Efficient Setup
    </span>
  )}
</div>
                <p className="dark-muted mt-4 leading-7 text-gray-600">
                {item.reason}
              </p>
            </div>
          ))}

          {result.totalMonthlySavings > 500 ? (
            <div className="card-hover rounded-xl border border-yellow-200 bg-yellow-50 p-5 text-black">
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
            <div 
            className="dark-card dark-card rounded-xl border border-yellow-200 bg-yellow-50 p-5 text-black">
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
            aria-label="Download PDF audit report"
            onClick={() => exportAuditReport(result, aiSummary)}
            className="card-hover dark-card w-full rounded-xl border bg-white px-5 py-3 font-semibold text-black"
          >
            Download PDF Report
          </button>

          <button
            type="button"
            aria-label="Copy shareable audit link"
            onClick={() => {
  const id = auditId || "latest";

  navigator.clipboard.writeText(
    `${window.location.origin}/share/${id}`
  );

  toast.success("Share link copied!");
}}
          className="card-hover dark-card w-full rounded-xl border bg-white px-5 py-3 font-semibold text-black"
          >
            Copy Share Link
          </button>

          <div className="fade-up">
  <LeadCapture />
</div>
        </div>
      )}
    </div>
  );
}