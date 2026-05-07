import jsPDF from "jspdf";
import { AuditResult } from "./audit-engine";

export function exportAuditReport(
  result: AuditResult,
  aiSummary: string
) {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("Credex AI Spend Audit", 20, 20);

  doc.setFontSize(14);
  doc.text(
    `Health Score: ${result.healthScore}`,
    20,
    40
  );

  doc.text(
    `Monthly Savings: $${result.totalMonthlySavings}`,
    20,
    50
  );

  doc.text(
    `Annual Savings: $${result.totalAnnualSavings}`,
    20,
    60
  );

  doc.setFontSize(16);
  doc.text("AI Summary", 20, 80);

  doc.setFontSize(12);

  const splitSummary = doc.splitTextToSize(
    aiSummary,
    170
  );

  doc.text(splitSummary, 20, 90);

  let y = 130;

  doc.setFontSize(16);
  doc.text("Recommendations", 20, y);

  y += 10;

  result.recommendations.forEach((item) => {
    doc.setFontSize(12);

    doc.text(
      `${item.tool} — Save $${item.savings}/mo`,
      20,
      y
    );

    y += 8;

    doc.text(item.reason, 25, y);

    y += 15;
  });

  doc.save("credex-audit-report.pdf");
}