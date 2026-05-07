import { describe, expect, it } from "vitest";
import { runAudit } from "../lib/audit-engine";

describe("runAudit", () => {
  it("detects high monthly spend savings", () => {
    const result = runAudit(
      [{ tool: "ChatGPT", plan: "Enterprise", monthlySpend: 1200, seats: 10 }],
      10,
      "mixed"
    );

    expect(result.totalMonthlySavings).toBeGreaterThan(0);
    expect(result.healthScore).toBeLessThan(80);
  });

  it("shows healthy score for low spend", () => {
    const result = runAudit(
      [{ tool: "Cursor", plan: "Pro", monthlySpend: 20, seats: 1 }],
      1,
      "coding"
    );

    expect(result.totalMonthlySavings).toBe(0);
    expect(result.healthScore).toBe(92);
  });

  it("calculates annual savings correctly", () => {
    const result = runAudit(
      [{ tool: "Claude", plan: "Team", monthlySpend: 600, seats: 5 }],
      5,
      "research"
    );

    expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12);
  });

  it("calculates total current spend", () => {
    const result = runAudit(
      [
        { tool: "ChatGPT", plan: "Plus", monthlySpend: 100, seats: 2 },
        { tool: "Cursor", plan: "Pro", monthlySpend: 40, seats: 2 },
      ],
      2,
      "coding"
    );

    expect(result.totalCurrentSpend).toBe(140);
  });

  it("calculates savings percentage", () => {
    const result = runAudit(
      [{ tool: "ChatGPT", plan: "Enterprise", monthlySpend: 1000, seats: 10 }],
      10,
      "mixed"
    );

    expect(result.savingsPercentage).toBeGreaterThan(0);
  });
});