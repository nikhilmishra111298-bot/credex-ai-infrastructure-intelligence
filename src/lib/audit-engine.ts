export type UseCase = "coding" | "writing" | "data" | "research" | "mixed";

export type ToolItem = {
  tool: string;
  plan: string;
  monthlySpend: number;
  seats: number;
};

export type ToolRecommendation = {
  tool: string;
  currentSpend: number;
  savings: number;
  action: string;
  reason: string;
};

export type AuditResult = {
  totalCurrentSpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  savingsPercentage: number;
  healthScore: number;
  recommendations: ToolRecommendation[];
};

export function runAudit(
  tools: ToolItem[],
  teamSize: number,
  useCase: UseCase
): AuditResult {
  const recommendations = tools.map((item) => {
    let savings = 0;
    let action = "Keep current plan";
    let reason = "Your current plan looks reasonable.";

    const spendPerSeat = item.monthlySpend / Math.max(item.seats, 1);

    if (item.monthlySpend > 500) {
      savings = Math.round(item.monthlySpend * 0.4);
      action = "Consider discounted AI credits";
      reason =
        "Your monthly spend is high enough that discounted AI credits may create meaningful savings.";
    } else if (teamSize <= 2 && item.plan === "Team") {
      savings = Math.round(item.monthlySpend * 0.3);
      action = "Downgrade from Team plan";
      reason =
        "For 1–2 people, Team plans are often unnecessary unless you need admin controls.";
    } else if (spendPerSeat > 50) {
      savings = Math.round(item.monthlySpend * 0.25);
      action = "Review plan fit";
      reason =
        "Your spend per seat is high compared with common AI tool pricing.";
    }

    if (
      useCase === "coding" &&
      item.tool === "ChatGPT" &&
      item.monthlySpend > 100
    ) {
      savings = Math.max(savings, Math.round(item.monthlySpend * 0.2));
      action = "Review coding-specific tools";
      reason =
        "For coding-heavy teams, developer-focused tools may offer better value.";
    }

    return {
      tool: item.tool,
      currentSpend: item.monthlySpend,
      savings,
      action,
      reason,
    };
  });

  const totalCurrentSpend = tools.reduce(
    (sum, item) => sum + item.monthlySpend,
    0
  );

  const totalMonthlySavings = recommendations.reduce(
    (sum, item) => sum + item.savings,
    0
  );

  const savingsPercentage =
    totalCurrentSpend > 0
      ? Math.round((totalMonthlySavings / totalCurrentSpend) * 100)
      : 0;

  let healthScore = 92;

  if (totalMonthlySavings > 1000) {
    healthScore = 35;
  } else if (totalMonthlySavings > 500) {
    healthScore = 55;
  } else if (totalMonthlySavings > 100) {
    healthScore = 75;
  }

  return {
    totalCurrentSpend,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    savingsPercentage,
    healthScore,
    recommendations,
  };
}