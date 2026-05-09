# Testing Strategy

This document explains the testing approach used in Credex AI Spend Audit.

---

# Testing Stack

Framework:
- Vitest

Reason:
- lightweight
- fast
- TypeScript-friendly
- works well with Vite/Next.js projects

---

# Core Areas Tested

The audit engine is the most critical business logic component.

Tests focus on:

- savings calculations
- annual projections
- health score logic
- spend aggregation
- percentage calculations

---

# Why Test the Audit Engine

The audit engine controls:
- optimization recommendations
- health scoring
- savings projections

Incorrect calculations would reduce trust in the platform.

---

# Current Tests

## High Spend Detection

Ensures large monthly spend generates:
- savings opportunities
- lower health score

---

## Healthy Low Spend

Ensures low-cost setups:
- produce no unnecessary recommendations
- receive strong health scores

---

## Annual Savings Calculation

Ensures yearly savings equal:

monthlySavings × 12

---

## Total Spend Aggregation

Ensures multiple tools correctly combine into total spend.

---

## Savings Percentage

Ensures savings percentage is correctly derived from:
- current spend
- monthly savings

---

# CI/CD Validation

GitHub Actions automatically runs:
- lint
- tests

On:
- push
- pull request

This prevents broken code from entering production.

---

# Manual Testing Checklist

Before deployment:

- form submission works
- dark mode works
- chart renders
- PDF export works
- share page works
- localStorage persists
- validation errors display
- loading state behaves correctly

---

# Future Testing Improvements

Potential upgrades:

- Playwright E2E tests
- React Testing Library
- API route testing
- PDF export snapshot tests
- accessibility testing
- visual regression testing
- performance testing