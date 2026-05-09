# Architecture

## Overview

The application is a frontend-heavy SaaS-style AI spend auditing platform built with Next.js App Router and TypeScript.

The system analyzes AI tooling spend, generates optimization recommendations, and provides exportable reports.

---

# High-Level Flow

User Input
↓
SpendForm Component
↓
Audit Engine
↓
Recommendations + Metrics
↓
AI Summary API
↓
Dashboard UI
↓
Export / Share / Lead Capture

---

# Frontend Structure

## App Router

Located in:

src/app

Routes:

- `/`
  Main audit dashboard

- `/share`
  Public share page for audit results

- `/api/summary`
  API route that generates personalized audit summaries

---

# Components

Located in:

src/components

## SpendForm.tsx

Main application controller.

Responsibilities:
- manages form state
- handles validation
- runs audits
- displays analytics
- controls exports/share

---

## SavingsChart.tsx

Displays savings visualization using Recharts.

---

## LeadCapture.tsx

Captures potential customer information after audit completion.

---

## DarkModeToggle.tsx

Controls dark mode using localStorage + Tailwind dark class.

---

# Business Logic

Located in:

src/lib/audit-engine.ts

Responsibilities:
- calculate savings
- determine health score
- generate recommendations
- calculate savings percentage
- determine optimization risk

The audit engine is deterministic and rule-based.

AI is NOT used for financial calculations.

---

# Export System

Located in:

src/lib/export-report.ts

Uses jsPDF to generate downloadable reports.

---

# Persistence

Current MVP persistence uses:
- localStorage
- share-page local persistence

Future production architecture:
- Supabase/Postgres
- authenticated users
- permanent shareable reports

---

# Testing

Located in:

tests/

Uses:
- Vitest

Tests:
- savings calculations
- annual calculations
- health score logic
- spend totals
- savings percentage

---

# CI/CD

GitHub Actions workflow:

.github/workflows/ci.yml

Runs:
- lint
- tests

On:
- push
- pull request

---

# Deployment

Platform:
- Vercel

Reasons:
- native Next.js support
- fast deployment
- serverless API routes
- easy GitHub integration

---

# Future Improvements

- Supabase backend
- Authentication
- Real AI recommendations
- Stripe billing
- Team accounts
- Historical audits
- OpenAI-powered optimization suggestions
- Email notifications
- Organization dashboards