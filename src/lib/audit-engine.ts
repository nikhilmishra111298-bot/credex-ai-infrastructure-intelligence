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

export type ToolDNA = {
  tool: string;
  dnaType: "Core" | "Overlap" | "Overspend" | "Efficient";
  insight: string;
};
export type RiskHeatmapItem = {
  label: string;
  score: number;
  level: "Low" | "Medium" | "High";
};


export type AuditResult = {
  totalCurrentSpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  savingsPercentage: number;
  healthScore: number;

  futureMonthlySpend: number;
  futureAnnualSpend: number;
  futureGrowthPercentage: number;
  futureRiskLevel: "Low" | "Medium" | "High";

  recommendations: ToolRecommendation[];

  toolDNA: ToolDNA[];

  riskHeatmap: RiskHeatmapItem[];

  collapseRisk: {
    productivityLoss: number;
    estimatedDowntimeCost: number;
    vendorDependency: "Low" | "Medium" | "High";
  };

  aiCFORecommendations: string[];

  aiPersonality: {
    type: string;
    description: string;
  };
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

    if (useCase === "writing" && item.tool === "Cursor") {
      savings = Math.max(savings, Math.round(item.monthlySpend * 0.3));
      action = "Switch to writing-focused AI tool";
      reason =
        "Cursor is mainly coding-focused, so it may not be the best value for writing work.";
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

  const futureMonthlySpend = Math.round(
    totalCurrentSpend * (teamSize <= 5 ? 1.35 : teamSize <= 25 ? 1.75 : 2.2)
  );

  const futureAnnualSpend = futureMonthlySpend * 12;

  const futureGrowthPercentage =
    totalCurrentSpend > 0
      ? Math.round(
          ((futureMonthlySpend - totalCurrentSpend) / totalCurrentSpend) * 100
        )
      : 0;

  let futureRiskLevel: "Low" | "Medium" | "High" = "Low";

  if (futureGrowthPercentage > 100) {
    futureRiskLevel = "High";
  } else if (futureGrowthPercentage > 50) {
    futureRiskLevel = "Medium";
  }

  const toolDNA: ToolDNA[] = tools.map((item) => {
    if (item.monthlySpend > 500) {
      return {
        tool: item.tool,
        dnaType: "Overspend",
        insight:
          "This tool has high spend and should be reviewed for discounted credits or plan optimization.",
      };
    }

    if (tools.length > 2 && item.monthlySpend > 50) {
      return {
        tool: item.tool,
        dnaType: "Overlap",
        insight:
          "This tool may overlap with other AI tools in your stack.",
      };
    }

    if (item.monthlySpend <= 30) {
      return {
        tool: item.tool,
        dnaType: "Efficient",
        insight:
          "This tool appears cost-efficient for the current team setup.",
      };
    }

    return {
      tool: item.tool,
      dnaType: "Core",
      insight: "This appears to be a core AI tool in your workflow.",
    };
  });
  const totalSeats = tools.reduce(
  (sum, item) => sum + item.seats,
  0
);

const riskHeatmap: RiskHeatmapItem[] = [
  {
    label: "Spend Growth Risk",
    score: Math.min(futureGrowthPercentage, 100),
    level:
      futureGrowthPercentage > 70
        ? "High"
        : futureGrowthPercentage > 35
        ? "Medium"
        : "Low",
  },
  {
    label: "Tool Overlap Risk",
    score: Math.min(tools.length * 18, 100),
    level:
      tools.length >= 5
        ? "High"
        : tools.length >= 3
        ? "Medium"
        : "Low",
  },
  {
    label: "Seat Waste Risk",
    score: Math.min(totalSeats * 8, 100),
    level:
      totalSeats > teamSize * 2
        ? "High"
        : totalSeats > teamSize
        ? "Medium"
        : "Low",
  },
];
const productivityLoss =
  futureRiskLevel === "High"
    ? 48
    : futureRiskLevel === "Medium"
    ? 27
    : 12;

const estimatedDowntimeCost = Math.round(
  totalCurrentSpend * (productivityLoss / 10)
);

const vendorDependency =
  tools.length <= 1
    ? "High"
    : tools.length <= 3
    ? "Medium"
    : "Low";
    const aiCFORecommendations: string[] = [];

if (futureRiskLevel === "High") {
  aiCFORecommendations.push(
    "Reduce dependency on high-cost AI subscriptions before projected spend acceleration."
  );
}

if (tools.length >= 4) {
  aiCFORecommendations.push(
    "Your AI stack may contain overlapping tools that increase operational complexity."
  );
}

if (totalMonthlySavings > 500) {
  aiCFORecommendations.push(
    "Immediate AI infrastructure optimization could significantly reduce annual burn."
  );
}

if (teamSize <= 3 && totalCurrentSpend > 300) {
  aiCFORecommendations.push(
    "Your current AI stack may be oversized for a small team."
  );
}

if (aiCFORecommendations.length === 0) {
  aiCFORecommendations.push(
    "Your AI infrastructure currently appears healthy and efficiently allocated."
  );
}
let aiPersonality = {
  type: "Balanced AI Team",
  description:
    "Your organization shows a relatively stable and balanced AI infrastructure pattern.",
};

if (futureRiskLevel === "High" && tools.length >= 4) {
  aiPersonality = {
    type: "AI Hyper-Scaling Team",
    description:
      "Your organization is rapidly increasing AI dependency and infrastructure complexity.",
  };
} else if (tools.length <= 2 && totalCurrentSpend < 200) {
  aiPersonality = {
    type: "Lean AI Startup",
    description:
      "Your team operates with a focused and cost-efficient AI stack.",
  };
} else if (totalMonthlySavings > 500) {
  aiPersonality = {
    type: "AI Overspend Organization",
    description:
      "Your infrastructure may contain duplicated tooling and optimization inefficiencies.",
  };
}


  return {
    totalCurrentSpend,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    savingsPercentage,
    healthScore,
    futureMonthlySpend,
    futureAnnualSpend,
    futureGrowthPercentage,
    futureRiskLevel,
    recommendations,
    toolDNA,
    riskHeatmap,
    collapseRisk: {
    productivityLoss,
    estimatedDowntimeCost,
    vendorDependency,
    },
    aiCFORecommendations,
    aiPersonality,

  };
}