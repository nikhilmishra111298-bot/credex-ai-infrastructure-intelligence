# Pricing Data Assumptions

This MVP uses estimated public pricing assumptions for common AI tools.

The purpose is to simulate optimization opportunities rather than provide financial guarantees.

---

# Assumed Tool Pricing

| Tool | Estimated Pricing |
|---|---|
| ChatGPT Plus | $20/user |
| ChatGPT Team | $30/user |
| Claude Pro | $20/user |
| Claude Team | $30/user |
| Cursor Pro | $20/user |
| GitHub Copilot | $10/user |
| Gemini Advanced | $20/user |
| Windsurf Pro | $15/user |

---

# Savings Logic

The audit engine estimates savings using deterministic rules:

- very high spend → discounted infrastructure credits
- small teams on enterprise plans → downgrade opportunity
- high spend-per-seat → optimization recommendation
- use-case mismatch → workflow optimization recommendation

---

# Key Assumptions

1. Enterprise teams frequently over-purchase seats.
2. Smaller teams often use unnecessarily expensive plans.
3. Mixed AI workflows create duplicated subscriptions.
4. AI infrastructure brokers like Credex may reduce costs through discounted credits.
5. The app prioritizes explainability over perfect financial precision.

---

# Why Rule-Based Instead of AI-Based Calculations

Financial recommendations should remain:
- predictable
- testable
- explainable
- deterministic

AI summaries are used only for narrative explanations, not financial calculations.

---

# Future Improvements

Potential future integrations:

- real API pricing feeds
- usage-based billing imports
- invoice ingestion
- OpenAI usage API
- Anthropic billing integrations
- organization-level analytics