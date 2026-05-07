import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const totalSavings = body.totalMonthlySavings || 0;
    const useCase = body.useCase || "mixed";
    const teamSize = body.teamSize || 1;

    let teamType = "";
    let workflowInsight = "";
    let savingsInsight = "";

    // Team size personalization
    if (teamSize <= 2) {
      teamType =
        "Your team is very lean, so flexibility and avoiding unnecessary enterprise plans is important.";
    } else if (teamSize <= 10) {
      teamType =
        "Your growing team should balance collaboration features with cost efficiency.";
    } else if (teamSize <= 50) {
      teamType =
        "Mid-sized teams often overspend due to duplicated subscriptions and unmanaged seat growth.";
    } else {
      teamType =
        "Large organizations benefit significantly from centralized AI infrastructure purchasing and spend governance.";
    }

    // Use case personalization
    if (useCase === "coding") {
      workflowInsight =
        "Your workflow appears engineering-heavy, so developer-focused AI tooling efficiency matters most.";
    } else if (useCase === "writing") {
      workflowInsight =
        "Content-focused workflows usually benefit more from lightweight plans than expensive enterprise coding tools.";
    } else if (useCase === "data") {
      workflowInsight =
        "Data-heavy teams should monitor API and token usage closely because costs scale rapidly.";
    } else if (useCase === "research") {
      workflowInsight =
        "Research workflows often accumulate overlapping AI subscriptions across multiple vendors.";
    } else {
      workflowInsight =
        "Mixed workflows usually create the highest chance of duplicated AI tooling and unused subscriptions.";
    }

    // Savings personalization
    if (totalSavings > 1000) {
      savingsInsight =
        "Your audit shows substantial optimization potential. Credex could meaningfully reduce your AI infrastructure costs.";
    } else if (totalSavings > 500) {
      savingsInsight =
        "Your team likely has moderate AI overspend that can be reduced through plan optimization and discounted credits.";
    } else if (totalSavings > 100) {
      savingsInsight =
        "There are a few optimization opportunities worth reviewing in your current AI stack.";
    } else {
      savingsInsight =
        "Your current AI spending appears relatively efficient with limited unnecessary cost.";
    }

    const summary = `
${teamType}

${workflowInsight}

${savingsInsight}
`;

    return NextResponse.json({
      summary,
    });
  } catch {
    return NextResponse.json({
      summary:
        "We analyzed your AI stack and identified possible optimization opportunities.",
    });
  }
}